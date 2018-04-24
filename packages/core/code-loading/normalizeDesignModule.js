const normalizeDesignModule = (designRootModule) => {
  let normalizedDesignModule = designRootModule
  if (typeof (scriptRootModule) === 'function') {
    normalizedDesignModule = {main: designRootModule}
  }
  normalizedDesignModule = Object.assign(
    {getParameterDefinitions: () => []},
    normalizedDesignModule
  )
  return normalizedDesignModule
}

module.exports = normalizeDesignModule
