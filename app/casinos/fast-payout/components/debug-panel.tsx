"use client"

import { useState } from "react"
import { Code, Database, Settings, TestTube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { testCompleteAIFlow } from "../../../../scripts/test-ai-flow"
import type { Casino } from "../../../../data/casinos"
import type { PageContent } from "../../../../types/types"

interface DebugPanelProps {
  pageData: PageContent
  casinos: Casino[]
  isVisible?: boolean
}

export function DebugPanel({ pageData, casinos, isVisible = false }: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(isVisible)
  const [testResults, setTestResults] = useState<any>(null)
  const [isRunningTest, setIsRunningTest] = useState(false)

  const runCompleteTest = async () => {
    setIsRunningTest(true)
    try {
      const results = await testCompleteAIFlow()
      setTestResults(results)
    } catch (error) {
      setTestResults({
        success: false,
        error: error instanceof Error ? error.message : "Test failed",
      })
    } finally {
      setIsRunningTest(false)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="sm"
          variant="outline"
          className="bg-background border-border text-muted-foreground hover:bg-muted"
        >
          <Settings className="h-4 w-4 mr-2" />
          Debug
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-h-[80vh] overflow-y-auto">
      <Card className="bg-card border-border shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              Debug Panel
            </CardTitle>
            <Button onClick={() => setIsOpen(false)} size="sm" variant="ghost">
              ×
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* System Status */}
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <span className="text-sm font-medium">System Status</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Ready
                </Badge>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted/30 rounded p-2">
                  <div className="text-muted-foreground">Page Data</div>
                  <div className="font-medium text-card-foreground">✅ Loaded</div>
                </div>
                <div className="bg-muted/30 rounded p-2">
                  <div className="text-muted-foreground">Casinos</div>
                  <div className="font-medium text-card-foreground">✅ {casinos.length}</div>
                </div>
                <div className="bg-muted/30 rounded p-2">
                  <div className="text-muted-foreground">Author</div>
                  <div className="font-medium text-card-foreground">✅ {pageData.author.name}</div>
                </div>
                <div className="bg-muted/30 rounded p-2">
                  <div className="text-muted-foreground">Geography</div>
                  <div className="font-medium text-card-foreground">✅ {pageData.geo.country}</div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Test Runner */}
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                <div className="flex items-center gap-2">
                  <TestTube className="h-4 w-4" />
                  <span className="text-sm font-medium">AI Flow Test</span>
                </div>
                <Badge
                  variant="outline"
                  className={
                    testResults?.success
                      ? "bg-green-50 text-green-700 border-green-200"
                      : testResults?.success === false
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                  }
                >
                  {testResults?.success ? "Passed" : testResults?.success === false ? "Failed" : "Not Run"}
                </Badge>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-3">
              <Button
                onClick={runCompleteTest}
                disabled={isRunningTest}
                size="sm"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isRunningTest ? "Running Tests..." : "Run Complete Test"}
              </Button>

              {testResults && (
                <div className="space-y-2">
                  {testResults.success ? (
                    <div className="text-xs space-y-1">
                      <div className="text-green-600 font-medium">✅ All Tests Passed</div>
                      {testResults.testResults && (
                        <div className="space-y-1">
                          {Object.entries(testResults.testResults).map(([key, passed]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, " $1")}:
                              </span>
                              <span className={passed ? "text-green-600" : "text-red-600"}>{passed ? "✅" : "❌"}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs">
                      <div className="text-red-600 font-medium">❌ Test Failed</div>
                      <div className="text-muted-foreground mt-1">{testResults.error}</div>
                    </div>
                  )}
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Data Inspector */}
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-2 h-auto">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <span className="text-sm font-medium">Data Inspector</span>
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="bg-muted/30 rounded p-3 text-xs font-mono">
                <div className="space-y-1">
                  <div>
                    <span className="text-muted-foreground">Page:</span> {pageData.slug}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Language:</span> {pageData.language.code}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Currency:</span> {pageData.geo.currency}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Casinos:</span> {casinos.length} loaded
                  </div>
                  <div>
                    <span className="text-muted-foreground">Top Casino:</span> {casinos[0]?.brand}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  )
}
