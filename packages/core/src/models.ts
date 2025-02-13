import settings from "./settings.ts";
import { Character, IAgentRuntime, Model } from "./types.ts";
import {
    EmbeddingModelSettings,
    ImageModelSettings,
    ModelClass,
    ModelProviderName,
    Models,
    ModelSettings,
} from "./types.ts";
import { getSettingFromCharacterConfig } from "./utils.ts";

// Helper function to get setting with fallbacks
function getSetting(
    runtime: IAgentRuntime | null,
    characterConfig: Character | null,
    key: string,
    defaultValue?: string
): string | undefined {
    return (
        (runtime && runtime?.getSetting(key)) ||
        (characterConfig &&
            getSettingFromCharacterConfig(key, characterConfig)) ||
        settings[key] ||
        defaultValue
    );
}

function getProviderModels(
    runtime: IAgentRuntime | null,
    characterConfig: Character | null,
    provider: ModelProviderName
): Model {
    if (!runtime && !characterConfig) {
        throw new Error("Either runtime or characterConfig must be provided");
    }
    const providerConfigs: Models = {
        [ModelProviderName.OPENAI]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "OPENAI_API_URL",
                "https://api.openai.com/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_OPENAI_MODEL",
                        "gpt-4o-mini"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_OPENAI_MODEL",
                        "gpt-4o"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_OPENAI_MODEL",
                        "gpt-4o"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
                [ModelClass.EMBEDDING]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "EMBEDDING_OPENAI_MODEL",
                        "text-embedding-3-small"
                    ),
                    dimensions: 1536,
                },
                [ModelClass.IMAGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "IMAGE_OPENAI_MODEL",
                        "dall-e-3"
                    ),
                },
            },
        },

        [ModelProviderName.ETERNALAI]: {
            endpoint: getSetting(runtime, characterConfig, "ETERNALAI_URL"),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "ETERNALAI_MODEL",
                        "neuralmagic/Meta-Llama-3.1-405B-Instruct-quantized.w4a16"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "ETERNALAI_MODEL",
                        "neuralmagic/Meta-Llama-3.1-405B-Instruct-quantized.w4a16"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "ETERNALAI_MODEL",
                        "neuralmagic/Meta-Llama-3.1-405B-Instruct-quantized.w4a16"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
            },
        },
        [ModelProviderName.ANTHROPIC]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "ANTHROPIC_API_URL",
                "https://api.anthropic.com/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_ANTHROPIC_MODEL",
                        "claude-3-haiku-20240307"
                    ),
                    stop: [],
                    maxInputTokens: 200000,
                    maxOutputTokens: 4096,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_ANTHROPIC_MODEL",
                        "claude-3-5-sonnet-20241022"
                    ),
                    stop: [],
                    maxInputTokens: 200000,
                    maxOutputTokens: 4096,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_ANTHROPIC_MODEL",
                        "claude-3-5-sonnet-20241022"
                    ),
                    stop: [],
                    maxInputTokens: 200000,
                    maxOutputTokens: 4096,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
            },
        },
        [ModelProviderName.CLAUDE_VERTEX]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "CLAUDE_VERTEX_API_URL",
                "https://api.anthropic.com/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_CLAUDE_VERTEX_MODEL",
                        "claude-3-5-sonnet-20241022"
                    ),
                    stop: [],
                    maxInputTokens: 200000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_CLAUDE_VERTEX_MODEL",
                        "claude-3-5-sonnet-20241022"
                    ),
                    stop: [],
                    maxInputTokens: 200000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_CLAUDE_VERTEX_MODEL",
                        "claude-3-opus-20240229"
                    ),
                    stop: [],
                    maxInputTokens: 200000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
            },
        },
        [ModelProviderName.GROK]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "GROK_API_URL",
                "https://api.x.ai/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_GROK_MODEL",
                        "grok-2-1212"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_GROK_MODEL",
                        "grok-2-1212"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_GROK_MODEL",
                        "grok-2-1212"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.EMBEDDING]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "EMBEDDING_GROK_MODEL",
                        "grok-2-1212"
                    ),
                },
            },
        },
        [ModelProviderName.GROQ]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "GROQ_API_URL",
                "https://api.groq.com/openai/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_GROQ_MODEL",
                        "llama-3.1-8b-instant"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8000,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_GROQ_MODEL",
                        "llama-3.3-70b-versatile"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8000,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_GROQ_MODEL",
                        "llama-3.2-90b-vision-preview"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8000,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.EMBEDDING]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "EMBEDDING_GROQ_MODEL",
                        "llama-3.1-8b-instant"
                    ),
                },
            },
        },
        [ModelProviderName.LLAMACLOUD]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "LLAMACLOUD_API_URL",
                "https://api.llamacloud.com/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_LLAMACLOUD_MODEL",
                        "meta-llama/Llama-3.2-3B-Instruct-Turbo"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    repetition_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_LLAMACLOUD_MODEL",
                        "meta-llama-3.1-8b-instruct"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    repetition_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_LLAMACLOUD_MODEL",
                        "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    repetition_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.EMBEDDING]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "EMBEDDING_LLAMACLOUD_MODEL",
                        "togethercomputer/m2-bert-80M-32k-retrieval"
                    ),
                },
                [ModelClass.IMAGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "IMAGE_LLAMACLOUD_MODEL",
                        "black-forest-labs/FLUX.1-schnell"
                    ),
                    steps: 4,
                },
            },
        },
        [ModelProviderName.TOGETHER]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "TOGETHER_API_URL",
                "https://api.together.ai/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_TOGETHER_MODEL",
                        "meta-llama/Llama-3.2-3B-Instruct-Turbo"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    repetition_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_TOGETHER_MODEL",
                        "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo-128K"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    repetition_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_TOGETHER_MODEL",
                        "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    repetition_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.EMBEDDING]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "EMBEDDING_TOGETHER_MODEL",
                        "togethercomputer/m2-bert-80M-32k-retrieval"
                    ),
                },
                [ModelClass.IMAGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "IMAGE_TOGETHER_MODEL",
                        "black-forest-labs/FLUX.1-schnell"
                    ),
                    steps: 4,
                },
            },
        },
        [ModelProviderName.LLAMALOCAL]: {
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_LLAMALOCAL_MODEL",
                        "NousResearch/Hermes-3-Llama-3.1-8B-GGUF/resolve/main/Hermes-3-Llama-3.1-8B.Q8_0.gguf?download=true"
                    ),
                    stop: ["<|eot_id|>", "<|eom_id|>"],
                    maxInputTokens: 32768,
                    maxOutputTokens: 8192,
                    repetition_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_LLAMALOCAL_MODEL",
                        "NousResearch/Hermes-3-Llama-3.1-8B-GGUF/resolve/main/Hermes-3-Llama-3.1-8B.Q8_0.gguf?download=true"
                    ),
                    stop: ["<|eot_id|>", "<|eom_id|>"],
                    maxInputTokens: 32768,
                    maxOutputTokens: 8192,
                    repetition_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_LLAMALOCAL_MODEL",
                        "NousResearch/Hermes-3-Llama-3.1-8B-GGUF/resolve/main/Hermes-3-Llama-3.1-8B.Q8_0.gguf?download=true"
                    ),
                    stop: ["<|eot_id|>", "<|eom_id|>"],
                    maxInputTokens: 32768,
                    maxOutputTokens: 8192,
                    repetition_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.EMBEDDING]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "EMBEDDING_LLAMALOCAL_MODEL",
                        "togethercomputer/m2-bert-80M-32k-retrieval"
                    ),
                },
            },
        },
        [ModelProviderName.GOOGLE]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "GOOGLE_API_URL",
                "https://generativelanguage.googleapis.com"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "SMALL_GOOGLE_MODEL"
                        ) ||
                        getSetting(runtime, characterConfig, "GOOGLE_MODEL") ||
                        "gemini-2.0-flash-exp",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.MEDIUM]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "MEDIUM_GOOGLE_MODEL"
                        ) ||
                        getSetting(runtime, characterConfig, "GOOGLE_MODEL") ||
                        "gemini-2.0-flash-exp",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.LARGE]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "LARGE_GOOGLE_MODEL"
                        ) ||
                        getSetting(runtime, characterConfig, "GOOGLE_MODEL") ||
                        "gemini-2.0-flash-exp",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.EMBEDDING]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "EMBEDDING_GOOGLE_MODEL"
                        ) ||
                        getSetting(runtime, characterConfig, "GOOGLE_MODEL") ||
                        "text-embedding-004",
                },
            },
        },
        [ModelProviderName.MISTRAL]: {
            model: {
                [ModelClass.SMALL]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "SMALL_MISTRAL_MODEL"
                        ) ||
                        getSetting(runtime, characterConfig, "MISTRAL_MODEL") ||
                        "mistral-small-latest",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.MEDIUM]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "MEDIUM_MISTRAL_MODEL"
                        ) ||
                        getSetting(runtime, characterConfig, "MISTRAL_MODEL") ||
                        "mistral-large-latest",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.LARGE]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "LARGE_MISTRAL_MODEL"
                        ) ||
                        getSetting(runtime, characterConfig, "MISTRAL_MODEL") ||
                        "mistral-large-latest",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
            },
        },
        [ModelProviderName.REDPILL]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "REDPILL_API_URL",
                "https://api.red-pill.ai/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "SMALL_REDPILL_MODEL"
                        ) ||
                        getSetting(runtime, characterConfig, "REDPILL_MODEL") ||
                        "gpt-4o-mini",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
                [ModelClass.MEDIUM]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "MEDIUM_REDPILL_MODEL"
                        ) ||
                        getSetting(runtime, characterConfig, "REDPILL_MODEL") ||
                        "gpt-4o",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
                [ModelClass.LARGE]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "LARGE_REDPILL_MODEL"
                        ) ||
                        getSetting(runtime, characterConfig, "REDPILL_MODEL") ||
                        "gpt-4o",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
                [ModelClass.EMBEDDING]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "EMBEDDING_REDPILL_MODEL",
                        "text-embedding-3-small"
                    ),
                },
            },
        },
        [ModelProviderName.OPENROUTER]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "OPENROUTER_API_URL",
                "https://openrouter.ai/api/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "SMALL_OPENROUTER_MODEL"
                        ) ||
                        getSetting(
                            runtime,
                            characterConfig,
                            "OPENROUTER_MODEL"
                        ) ||
                        "nousresearch/hermes-3-llama-3.1-405b",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.MEDIUM]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "MEDIUM_OPENROUTER_MODEL"
                        ) ||
                        getSetting(
                            runtime,
                            characterConfig,
                            "OPENROUTER_MODEL"
                        ) ||
                        "nousresearch/hermes-3-llama-3.1-405b",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.LARGE]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "LARGE_OPENROUTER_MODEL"
                        ) ||
                        getSetting(
                            runtime,
                            characterConfig,
                            "OPENROUTER_MODEL"
                        ) ||
                        "nousresearch/hermes-3-llama-3.1-405b",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.EMBEDDING]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "EMBEDDING_OPENROUTER_MODEL",
                        "text-embedding-3-small"
                    ),
                },
            },
        },

        [ModelProviderName.OLLAMA]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "OLLAMA_SERVER_URL",
                "http://localhost:11434"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "SMALL_OLLAMA_MODEL"
                        ) ||
                        getSetting(runtime, characterConfig, "OLLAMA_MODEL") ||
                        "llama3.2",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.MEDIUM]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "MEDIUM_OLLAMA_MODEL"
                        ) ||
                        getSetting(runtime, characterConfig, "OLLAMA_MODEL") ||
                        "hermes3",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.LARGE]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "LARGE_OLLAMA_MODEL"
                        ) ||
                        getSetting(runtime, characterConfig, "OLLAMA_MODEL") ||
                        "hermes3:70b",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.EMBEDDING]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "OLLAMA_EMBEDDING_MODEL",
                        "mxbai-embed-large"
                    ),
                    dimensions: 1024,
                },
            },
        },
        [ModelProviderName.HEURIST]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "HEURIST_API_URL",
                "https://llm-gateway.heurist.xyz"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_HEURIST_MODEL",
                        "meta-llama/llama-3-70b-instruct"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    repetition_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_HEURIST_MODEL",
                        "meta-llama/llama-3-70b-instruct"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    repetition_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_HEURIST_MODEL",
                        "meta-llama/llama-3.3-70b-instruct"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    repetition_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.IMAGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "HEURIST_IMAGE_MODEL",
                        "FLUX.1-dev"
                    ),
                    steps: 20,
                },
                [ModelClass.EMBEDDING]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "HEURIST_EMBEDDING_MODEL",
                        "BAAI/bge-large-en-v1.5"
                    ),
                    dimensions: 1024,
                },
            },
        },
        [ModelProviderName.GALADRIEL]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "GALADRIEL_API_URL",
                "https://api.galadriel.com/v1/verified"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_GALADRIEL_MODEL",
                        "gpt-4o-mini"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_GALADRIEL_MODEL",
                        "gpt-4o"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_GALADRIEL_MODEL",
                        "gpt-4o"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
            },
        },

        [ModelProviderName.FAL]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "FAL_API_URL",
                "https://api.fal.ai/v1"
            ),
            model: {
                [ModelClass.IMAGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "FAL_IMAGE_MODEL",
                        "fal-ai/flux-lora"
                    ),
                    steps: 28,
                },
            },
        },
        [ModelProviderName.GAIANET]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "GAIANET_SERVER_URL",
                "https://gaianet.ai/api/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name:
                        getSetting(runtime, characterConfig, "GAIANET_MODEL") ||
                        getSetting(
                            runtime,
                            characterConfig,
                            "SMALL_GAIANET_MODEL"
                        ) ||
                        "llama3b",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    repetition_penalty: 0.4,
                    temperature: 0.7,
                },
                [ModelClass.MEDIUM]: {
                    name:
                        getSetting(runtime, characterConfig, "GAIANET_MODEL") ||
                        getSetting(
                            runtime,
                            characterConfig,
                            "MEDIUM_GAIANET_MODEL"
                        ) ||
                        "llama",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.5,
                },
                [ModelClass.LARGE]: {
                    name:
                        getSetting(runtime, characterConfig, "GAIANET_MODEL") ||
                        getSetting(
                            runtime,
                            characterConfig,
                            "LARGE_GAIANET_MODEL"
                        ) ||
                        "qwen72b",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.5,
                },
                [ModelClass.EMBEDDING]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "GAIANET_EMBEDDING_MODEL",
                        "nomic-embed"
                    ),
                    dimensions: 768,
                },
            },
        },
        [ModelProviderName.ALI_BAILIAN]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "ALI_BAILIAN_API_URL",
                "https://dashscope.aliyuncs.com/compatible-mode/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_ALI_BAILIAN_MODEL",
                        "qwen-turbo"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.6,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_ALI_BAILIAN_MODEL",
                        "qwen-plus"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.6,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_ALI_BAILIAN_MODEL",
                        "qwen-max"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.6,
                },
                [ModelClass.IMAGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "IMAGE_ALI_BAILIAN_MODEL",
                        "wanx-v1"
                    ),
                },
            },
        },
        [ModelProviderName.VOLENGINE]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "VOLENGINE_API_URL",
                "https://open.volcengineapi.com/api/v3/"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "SMALL_VOLENGINE_MODEL"
                        ) ||
                        getSetting(
                            runtime,
                            characterConfig,
                            "VOLENGINE_MODEL"
                        ) ||
                        "doubao-lite-128k",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.6,
                },
                [ModelClass.MEDIUM]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "MEDIUM_VOLENGINE_MODEL"
                        ) ||
                        getSetting(
                            runtime,
                            characterConfig,
                            "VOLENGINE_MODEL"
                        ) ||
                        "doubao-pro-128k",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.6,
                },
                [ModelClass.LARGE]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "LARGE_VOLENGINE_MODEL"
                        ) ||
                        getSetting(
                            runtime,
                            characterConfig,
                            "VOLENGINE_MODEL"
                        ) ||
                        "doubao-pro-256k",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.4,
                    presence_penalty: 0.4,
                    temperature: 0.6,
                },
                [ModelClass.EMBEDDING]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "VOLENGINE_EMBEDDING_MODEL",
                        "doubao-embedding"
                    ),
                },
            },
        },

        [ModelProviderName.NANOGPT]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "NANOGPT_API_URL",
                "https://nano-gpt.com/api/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_NANOGPT_MODEL",
                        "gpt-4o-mini"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_NANOGPT_MODEL",
                        "gpt-4o"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_NANOGPT_MODEL",
                        "gpt-4o"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.6,
                },
            },
        },
        [ModelProviderName.HYPERBOLIC]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "HYPERBOLIC_API_URL",
                "https://api.hyperbolic.xyz/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "SMALL_HYPERBOLIC_MODEL"
                        ) ||
                        getSetting(
                            runtime,
                            characterConfig,
                            "HYPERBOLIC_MODEL"
                        ) ||
                        "meta-llama/Llama-3.2-3B-Instruct",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
                [ModelClass.MEDIUM]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "MEDIUM_HYPERBOLIC_MODEL"
                        ) ||
                        getSetting(
                            runtime,
                            characterConfig,
                            "HYPERBOLIC_MODEL"
                        ) ||
                        "meta-llama/Meta-Llama-3.1-70B-Instruct",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
                [ModelClass.LARGE]: {
                    name:
                        getSetting(
                            runtime,
                            characterConfig,
                            "LARGE_HYPERBOLIC_MODEL"
                        ) ||
                        getSetting(
                            runtime,
                            characterConfig,
                            "HYPERBOLIC_MODEL"
                        ) ||
                        "meta-llama/Meta-Llama-3.1-405-Instruct",
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
                [ModelClass.IMAGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "IMAGE_HYPERBOLIC_MODEL",
                        "FLUX.1-dev"
                    ),
                },
            },
        },
        [ModelProviderName.VENICE]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "VENICE_API_URL",
                "https://api.venice.ai/api/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_VENICE_MODEL",
                        "llama-3.3-70b"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_VENICE_MODEL",
                        "llama-3.3-70b"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_VENICE_MODEL",
                        "llama-3.1-405b"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
                [ModelClass.IMAGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "IMAGE_VENICE_MODEL",
                        "fluently-xl"
                    ),
                },
            },
        },
        [ModelProviderName.NINETEEN_AI]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "NINETEEN_AI_API_URL",
                "https://api.nineteen.ai/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_NINETEEN_AI_MODEL",
                        "unsloth/Llama-3.2-3B-Instruct"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_NINETEEN_AI_MODEL",
                        "unsloth/Meta-Llama-3.1-8B-Instruct"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_NINETEEN_AI_MODEL",
                        "hugging-quants/Meta-Llama-3.1-70B-Instruct-AWQ-INT4"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
                [ModelClass.IMAGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "IMAGE_NINETEEN_AI_MODEL",
                        "dataautogpt3/ProteusV0.4-Lightning"
                    ),
                },
            },
        },
        [ModelProviderName.AKASH_CHAT_API]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "AKASH_CHAT_API_URL",
                "https://chatapi.akash.network/api/v1"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_AKASH_CHAT_API_MODEL",
                        "Meta-Llama-3-2-3B-Instruct"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_AKASH_CHAT_API_MODEL",
                        "Meta-Llama-3-3-70B-Instruct"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_AKASH_CHAT_API_MODEL",
                        "Meta-Llama-3-1-405B-Instruct-FP8"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
            },
        },
        [ModelProviderName.LIVEPEER]: {
            model: {
                [ModelClass.IMAGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LIVEPEER_IMAGE_MODEL",
                        "ByteDance/SDXL-Lightning"
                    ),
                },
            },
        },
        [ModelProviderName.INFERA]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "INFERA_API_URL",
                "https://api.infera.org"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_INFERA_MODEL",
                        "llama3.2:3b"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_INFERA_MODEL",
                        "mistral-nemo:latest"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_INFERA_MODEL",
                        "mistral-small:latest"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    temperature: 0.6,
                },
            },
        },
        [ModelProviderName.DEEPSEEK]: {
            endpoint: getSetting(
                runtime,
                characterConfig,
                "DEEPSEEK_API_URL",
                "https://api.deepseek.com"
            ),
            model: {
                [ModelClass.SMALL]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "SMALL_DEEPSEEK_MODEL",
                        "deepseek-chat"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.7,
                },
                [ModelClass.MEDIUM]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "MEDIUM_DEEPSEEK_MODEL",
                        "deepseek-chat"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.7,
                },
                [ModelClass.LARGE]: {
                    name: getSetting(
                        runtime,
                        characterConfig,
                        "LARGE_DEEPSEEK_MODEL",
                        "deepseek-chat"
                    ),
                    stop: [],
                    maxInputTokens: 128000,
                    maxOutputTokens: 8192,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                    temperature: 0.7,
                },
            },
        },
    };

    return providerConfigs[provider] || providerConfigs[provider.toUpperCase()];
}

export function getModel(
    runtime: IAgentRuntime,
    provider: ModelProviderName
): Model {
    const providerModels = getProviderModels(runtime, null, provider);
    return providerModels;
}

export function getModelSettings(
    runtime: IAgentRuntime,
    provider: ModelProviderName,
    type: ModelClass
): ModelSettings | undefined {
    const providerModels = getProviderModels(runtime, null, provider);
    const model = providerModels?.model[type] as ModelSettings | undefined;
    return model;
}

export function getImageModelSettings(
    runtime: IAgentRuntime,
    provider: ModelProviderName
): ImageModelSettings | undefined {
    const providerModels = getProviderModels(runtime, null, provider);
    return providerModels?.model[ModelClass.IMAGE] as
        | ImageModelSettings
        | undefined;
}

export function getEmbeddingModelSettings(
    runtime: IAgentRuntime,
    provider: ModelProviderName
): EmbeddingModelSettings | undefined {
    const providerModels = getProviderModels(runtime, null, provider);
    return providerModels?.model[ModelClass.EMBEDDING] as
        | EmbeddingModelSettings
        | undefined;
}

export function getEndpoint(
    runtime: IAgentRuntime,
    provider: ModelProviderName
) {
    const providerModels = getProviderModels(runtime, null, provider);
    return providerModels?.endpoint;
}

export function getModelSettingsFromCharacterConfig(
    characterConfig: Character,
    provider: ModelProviderName,
    type: ModelClass
): ModelSettings | undefined {
    const providerModels = getProviderModels(null, characterConfig, provider);
    return providerModels?.model[type] as ModelSettings | undefined;
}

export function getImageModelSettingsFromCharacterConfig(
    characterConfig: Character,
    provider: ModelProviderName
): ImageModelSettings | undefined {
    const providerModels = getProviderModels(null, characterConfig, provider);
    return providerModels?.model[ModelClass.IMAGE] as
        | ImageModelSettings
        | undefined;
}

export function getEmbeddingModelSettingsFromCharacterConfig(
    characterConfig: Character,
    provider: ModelProviderName
): EmbeddingModelSettings | undefined {
    const providerModels = getProviderModels(null, characterConfig, provider);
    return providerModels?.model[ModelClass.EMBEDDING] as
        | EmbeddingModelSettings
        | undefined;
}

export function getEndpointFromCharacterConfig(
    characterConfig: Character,
    provider: ModelProviderName
) {
    const providerModels = getProviderModels(null, characterConfig, provider);
    return providerModels?.endpoint;
}
