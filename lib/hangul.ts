const HANGUL_JAMO_REGEX = /[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]+/g;

export const stripJamoFromString = (input: string) => input.replace(HANGUL_JAMO_REGEX, '');
