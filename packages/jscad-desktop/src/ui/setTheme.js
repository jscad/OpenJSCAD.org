function setTheme (name, themes) {
  console.log('setting theme', name)
  const themedViewerOptions = themes[name] // Object.assign({}, viewerOptions, themes[themeName])
  // console.log('params in app', themedViewerOptions.background)
  // const background = themedViewerOptions.grid.color//.map(x => x * 255)
  // const bgColorRgba = `rgba(${[...background.map(x => x * 255)].join(', ')})`
  // console.log(bgColorRgba)
  const bgColorRgba = name === 'light' ? 'black' : 'white'
  document.getElementById('controls').style.color = bgColorRgba
  document.getElementById('params').style.color = bgColorRgba

  return themedViewerOptions
}

module.exports = {setTheme}
