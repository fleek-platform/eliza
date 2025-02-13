import { Character } from "./types.ts";

export { elizaLogger } from "./logger.ts";
export { embed } from "./embedding.ts";
export { AgentRuntime } from "./runtime.ts";

import settings from "./settings.ts";

export const getSettingFromCharacterConfig = (
    key: string,
    characterConfig: Character
) => {
    // check if the key is in the character.settings.secrets object
    if (characterConfig.settings?.secrets?.[key]) {
        return characterConfig.settings.secrets[key];
    }
    // if not, check if it's in the settings object
    if (characterConfig.settings?.[key]) {
        return characterConfig.settings[key];
    }

    // if not, check if it's in the settings object
    if (settings[key]) {
        return settings[key];
    }

    return null;
};
