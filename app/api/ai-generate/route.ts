import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { CriteriaSnapshotSchema } from "../../../types/criteria-content-schemas-full"
import { generateMasterPrompt, type MasterPromptContext } from "../../../lib/ai-generation/master-prompt"
import { getAuthorById } from "../../../data/authors"
import { getLanguageByCode } from "../../../data/languages"
import { getGeoByCountryCode } from "../../../data/geos"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pageContent, casinos, criteria } = body

    console.log("[v0] AI generation API called with:", {
      page: pageContent?.slug,
      casinosCount: casinos?.length,
      criteria,
    })

    // Validate required fields
    if (!pageContent || !casinos || !criteria) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: pageContent, casinos, or criteria" },
        { status: 400 },
      )
    }

    // Validate OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error("[v0] OPENAI_API_KEY environment variable is not set")
      return NextResponse.json({ success: false, error: "OpenAI API key not configured" }, { status: 500 })
    }

    // Get author, language, and geo data
    const author = getAuthorById(pageContent.author.id) || pageContent.author
    const language = getLanguageByCode(pageContent.language.code) || pageContent.language
    const geo = getGeoByCountryCode(pageContent.geo.countryCode) || pageContent.geo

    // Build context for AI generation
    const context: MasterPromptContext = {
      pageContent,
      casinos,
      author,
      language,
      geo,
      criteria,
    }

    console.log("[v0] Generated context for AI:", {
      author: author.name,
      language: language.name,
      geo: geo.country,
      casinosCount: casinos.length,
    })

    const startTime = Date.now()
    const prompt = generateMasterPrompt(context)

    console.log("[v0] Generated master prompt length:", prompt.length)
    console.log("[v0] Making AI request with structured output using generateObject...")

    const result = await generateObject({
      model: openai("gpt-4o-2024-08-06"),
      system:
        "You are an expert iGaming analyst. Generate comprehensive casino criteria content based on the provided context. Follow the schema exactly and ensure all required fields are populated with accurate, engaging content.",
      prompt: prompt,
      schema: CriteriaSnapshotSchema,
      temperature: 0.7,
    }).catch((error) => {
      console.error("[v0] generateObject failed:", error)
      console.error("[v0] Error details:", {
        name: error?.name,
        message: error?.message,
        cause: error?.cause,
        stack: error?.stack?.split("\n").slice(0, 5).join("\n"),
      })

      // Try to extract any partial response or validation details
      if (error?.message?.includes("response did not match schema")) {
        console.error(
          "[v0] Schema validation failed - this means AI generated content but it doesn't match our Zod schema",
        )
        console.error("[v0] Consider simplifying the schema or making fields optional")
      }

      throw error
    })

    const duration = Date.now() - startTime
    const generatedData = result.object

    console.log("[v0] AI generation completed successfully in", duration, "ms")
    console.log("[v0] Generated items count:", generatedData?.items?.length)
    console.log("[v0] Result object keys:", Object.keys(generatedData || {}))

    if (generatedData) {
      console.log("[v0] Generated data structure:", {
        hasHeader: !!generatedData.header,
        hasAuthoring: !!generatedData.authoring,
        hasEeat: !!generatedData.eeat,
        itemsCount: generatedData.items?.length,
        updatedAt: generatedData.updatedAt,
        changeLogCount: generatedData.changeLog?.length,
      })

      // Log first item structure for debugging
      if (generatedData.items?.[0]) {
        console.log("[v0] First item structure:", {
          criterion: generatedData.items[0].criterion,
          hasWinner: !!generatedData.items[0].winner,
          hasProofCopy: !!generatedData.items[0].proofCopy,
          keys: Object.keys(generatedData.items[0]),
        })
      }
    }

    // Validate the generated content
    try {
      CriteriaSnapshotSchema.parse(generatedData)
      console.log("[v0] Generated content validation passed")
    } catch (validationError) {
      console.error("[v0] Generated content validation failed:", validationError)
      return NextResponse.json(
        {
          success: false,
          error: "Generated content failed validation",
          details: validationError instanceof Error ? [validationError.message] : ["Validation failed"],
        },
        { status: 500 },
      )
    }

    console.log("[v0] AI generation completed successfully")

    return NextResponse.json({
      success: true,
      data: generatedData,
      tokensUsed: result.usage?.totalTokens,
      duration,
    })
  } catch (error) {
    console.error("[v0] AI generation API error:", error)
    console.error("[v0] Error type:", error?.constructor?.name)
    console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    )
  }
}
