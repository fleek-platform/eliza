import { PrimusCoreTLS } from "@primuslabs/zktls-core-sdk";
import {
    IVerifiableInferenceAdapter,
    VerifiableInferenceOptions,
    VerifiableInferenceResult,
    VerifiableInferenceProvider,
    ModelProviderName,
    elizaLogger,
    getEndpointFromCharacterConfig,
    Character,
    getModelSettingsFromCharacterConfig,
} from "@elizaos/core";
import { generateProof, verifyProof } from "../util/primusUtil.ts";
import { ModelClass } from "@elizaos/core";

interface PrimusOptions {
    appId: string;
    appSecret: string;
    attMode: string;
    modelProvider?: ModelProviderName;
    token?: string;
}

export class PrimusAdapter implements IVerifiableInferenceAdapter {
    public options: PrimusOptions;
    public characterConfig: Character;
    constructor(options: PrimusOptions, characterConfig: Character) {
        this.options = options;
        this.characterConfig = characterConfig;
    }

    async generateText(
        context: string,
        modelClass: string,
        options?: VerifiableInferenceOptions
    ): Promise<VerifiableInferenceResult> {
        const provider = this.options.modelProvider || ModelProviderName.OPENAI;
        const baseEndpoint =
            options?.endpoint ||
            getEndpointFromCharacterConfig(this.characterConfig, provider);
        const model = getModelSettingsFromCharacterConfig(
            this.characterConfig,
            provider,
            modelClass as ModelClass
        );
        const apiKey = this.options.token;

        if (!apiKey) {
            throw new Error(
                `API key (token) is required for provider: ${provider}`
            );
        }

        // Get provider-specific endpoint, auth header and response json path
        let endpoint;
        let authHeader;
        let responseParsePath;

        switch (provider) {
            case ModelProviderName.OPENAI:
                endpoint = `${baseEndpoint}/chat/completions`;
                authHeader = `Bearer ${apiKey}`;
                responseParsePath = "$.choices[0].message.content";
                break;
            default:
                throw new Error(`Unsupported model provider: ${provider}`);
        }

        const headers = {
            "Content-Type": "application/json",
            Authorization: authHeader,
        };

        try {
            let body = {
                model: model.name,
                messages: [{ role: "user", content: context }],
                temperature:
                    options?.providerOptions?.temperature ||
                    getModelSettingsFromCharacterConfig(
                        this.characterConfig,
                        provider,
                        modelClass as ModelClass
                    ).temperature,
            };
            const attestation = await generateProof(
                endpoint,
                "POST",
                headers,
                JSON.stringify(body),
                responseParsePath
            );
            elizaLogger.log(`model attestation:`, attestation);

            const responseData = JSON.parse(attestation.data);
            let text = JSON.parse(responseData.content);
            return {
                text,
                proof: attestation,
                provider: VerifiableInferenceProvider.PRIMUS,
                timestamp: Date.now(),
            };
        } catch (error) {
            console.error("Error in Primus generateText:", error);
            throw error;
        }
    }

    async verifyProof(result: VerifiableInferenceResult): Promise<boolean> {
        const isValid = verifyProof(result.proof);
        elizaLogger.log("Proof is valid:", isValid);
        return isValid;
    }
}

export default PrimusAdapter;
