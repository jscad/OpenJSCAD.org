export const isCommonJsModule = (string) => string.includes('module.exports') || string.includes('require(')
