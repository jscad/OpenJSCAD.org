const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')
const makeLogger = require('../../utils/logger')

/*
  console.log('has dat', window.DatArchive)
  const datUrl = 'dat://f29ffcb874e4a266a16d837136c320aad4e3b8f0e8c594c21f8b30fc2e5341c3#local-compare'
  // 'dat://7077e324d1fe35e30ad829a03d79a78ce588ca0334a073774dfce15e3d55998b'
  // 'dat://530a1c88246534dc6e1a97deda03f6ce3c463b189e7c2d5a4cdaf8f6c6a18e6f'// 'dat://f29ffcb874e4a266a16d837136c320aad4e3b8f0e8c594c21f8b30fc2e5341c3'
  const archive = new DatArchive(datUrl, {})
  archive.readdir('/', { recursive: true, stat: true }).then(filesAndFolders => {
    console.log('filesAndFolders', filesAndFolders)
    filesAndFolders.map(f => {
      if (f.stat.isFile() && f.name.includes('js') && !f.name.includes('json')) {
        archive.readFile(f.name).then(y => console.log(`fileContent for ${f.name} "${y}"`))
      }
      // f.stat.isFile() ? archive.readFile(f.name)? : f
    })
  }) */

const makeDatSideEffect = async (params) => {
  const commandResponses = callBackToStream()
  const defaults = { logging: false }
  const { logging } = Object.assign({}, defaults, params)
  const log = makeLogger({ enabled: logging })

  if (!window.DatArchive) {
    log.error('Dat archives not supported in this environment!')
  }

  const sink = (out$) => {
    out$.forEach(command => {
      const { type, id, data, urls, options } = command
      urls.map(async url => {
        const archive = new DatArchive(url, {})
        const filesAndFolders = await archive.readdir('/', { recursive: true, stat: true })
        console.log('filesAndFolders', filesAndFolders)
        const fileContents = await Promise.all(filesAndFolders.map(async f => {
          if (f.stat.isFile() && f.name.includes('js') && !f.name.includes('json')) {
            const content = await archive.readFile(f.name)
            return { content, name: f.name, fullPath: f.name, isFile: true }
            console.log(`fileContent for ${f.name} "${content}"`)
          }
          return undefined
          // f.stat.isFile() ? archive.readFile(f.name)? : f
        })
        )// .filter(x => x !== undefined)
        // isFile: false, isDirectory: true, name: "folderBasic", fullPath: "/folderBasic"
        // console.log('fileContents', fileContents)
        commandResponses.callback({ type, id, url, data: fileContents.filter(x => x !== undefined) })
      })

      console.log('command', command)
    })
  }

  const source = () => {
    return commandResponses.stream.multicast()
  }

  return { source, sink }
}

module.exports = makeDatSideEffect
