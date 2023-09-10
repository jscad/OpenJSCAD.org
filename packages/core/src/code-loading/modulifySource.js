/**
 * Transform an old type 'implicit imports' jscad script into one with explicit imports
 * @param  {} source
 * @param  {} apiMainPath
 */
export const modulifySource = (source, apiMainPath) => {
  const getParamsString = source.includes('getParameterDefinitions')
    ? 'export getParameterDefinitions'
    : ''
  const updatedSource = `
    import * from '${apiMainPath}'

    ${source}

    export main
    ${getParamsString}
  `
  return updatedSource
}
