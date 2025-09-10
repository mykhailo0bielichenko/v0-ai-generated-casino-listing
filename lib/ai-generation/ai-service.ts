import type { MasterPromptContext } from './master-prompt';

export interface AIGenerationOptions {
    model?: string;
    temperature?: number;
    maxRetries?: number;
}

export interface AIGenerationResult {
    success: boolean;
    data?: any;
    error?: string;
    tokensUsed?: number;
    duration?: number;
}

export class AIGenerationService {
    private defaultOptions: AIGenerationOptions = {
        model: 'gpt-5',
        maxRetries: 1,
    };

    async generateCriteriaContent(
        context: MasterPromptContext,
        options: AIGenerationOptions = {}
    ): Promise<AIGenerationResult> {
        const startTime = Date.now();

        try {
            console.log('[v0] Starting AI generation via API with context:', {
                page: context.pageContent.slug,
                author: context.author.name,
                casinos: context.casinos.length,
                geo: context.geo.country,
            });

            const response = await fetch('/api/ai-generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pageContent: context.pageContent,
                    casinos: context.casinos,
                    criteria: context.criteria,
                }),
            });

            const duration = Date.now() - startTime;

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.error || `HTTP error! status: ${response.status}`
                );
            }

            const result = await response.json();

            console.log(
                '[v0] AI generation completed successfully in',
                duration,
                'ms'
            );
            console.log(
                '[v0] Generated items count:',
                result.data?.items?.length
            );

            return {
                success: result.success,
                data: result.data,
                tokensUsed: result.tokensUsed,
                duration: result.duration || duration,
            };
        } catch (error) {
            const duration = Date.now() - startTime;
            console.error('[v0] AI generation failed:', error);
            console.error('[v0] Error type:', error?.constructor?.name);
            console.error(
                '[v0] Error message:',
                error instanceof Error ? error.message : String(error)
            );

            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error occurred',
                duration,
            };
        }
    }

    async validateGeneratedContent(
        data: any
    ): Promise<{ valid: boolean; errors?: string[] }> {
        // This method is kept for compatibility but validation happens server-side
        return { valid: true };
    }
}

// Singleton instance
export const aiGenerationService = new AIGenerationService();
