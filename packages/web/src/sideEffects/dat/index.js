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
  let enabled = true

  if (!window.DatArchive) {
    log.error('Dat archives not supported in this environment!')
    enabled = false
  }

  const sink = (commands$) => {
    if (!enabled) { // bail out if not available
      return
    }
    // every time a new command is recieved (observable)
    commands$.forEach(command => {
      const { type, id, data, urls, options, path } = command
      // console.log('command', command)

      // command handlers/ response
      const error = () => {
        commandResponses.callback({ type, id, error: new Error(`no handler found for command ${type}`) })
      }
      const read = () => {
        urls.map(async url => {
          const archive = new DatArchive(url, {})
          const filesAndFolders = await archive.readdir(path, { recursive: true, stat: true })
          // console.log('filesAndFolders', filesAndFolders)
          const fileContents = await Promise.all(filesAndFolders.map(async f => {
            const fullPath = `${path}/${f.name}`
            if (f.stat.isFile() && f.name.includes('js')) {
              const content = await archive.readFile(fullPath)
              return { content, name: f.name, fullPath: f.name, isFile: true }
            }
            return undefined
          })
          )
          const info = await archive.getInfo()
          const rootFolder = info.title || 'unnamed'// rootfolder is a fake root folder !
          const transformed = fileContents.filter(x => x !== undefined).map(f => {
            return { name: f.name, ext: 'js', source: f.content, fullPath: `/${rootFolder}/` + f.fullPath }
          })
          const hiearchyRoot = [{
            children: transformed,
            fullPath: `/${rootFolder}`,
            name: rootFolder
          }]
          commandResponses.callback({ type, id, url, data: hiearchyRoot })
        })
      }

      const commandHandlers = {
        read,
        error
      }
      const commandHandler = commandHandlers[type] || commandHandlers['error']
      commandHandler()
    })
  }

  const source = () => {
    return commandResponses.stream.multicast()
  }

  return { source, sink }
}

module.exports = makeDatSideEffect
