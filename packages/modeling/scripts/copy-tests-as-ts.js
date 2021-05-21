const glob = require('glob')
const {promises: fs} = require('fs')

glob('src/**/*.test.js', async (err, files) => {
  if (err) {
    throw err
  }

  await Promise.all(files.map(async js => {
    const ts = js.replace(/^(.*)\.test\.js$/, '$1.test.ts')
    try {
      await fs.stat(ts)
    } catch (e) {
      const script = await fs.readFile(js, 'utf-8')
      const s = script.replace(/^const (.*) = require\((.*)\)/gm, 'import $1 from $2')
      fs.writeFile(ts, s, 'utf-8')
    }
  }))
})
