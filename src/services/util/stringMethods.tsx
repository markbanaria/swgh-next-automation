export function extractMatch(text: string, keywords: string[]): string | null {
    return keywords.find((keyword) => text.includes(keyword)) || null;
}