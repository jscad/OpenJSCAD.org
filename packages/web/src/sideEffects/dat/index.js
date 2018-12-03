const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')
const makeLogger = require('../../utils/logger')

const makeDatSideEffect = async (params) => {
  const commandResponses = callBackToStream()
  const defaults = { logging: false }
  const { logging } = Object.assign({}, defaults, params)
  const log = makeLogger({ enabled: logging })
  let enabled = true

  if (!window.DatArchive) {
    // todo handle loading of package for node.js side if/ when needed
    log.error('Dat archives not supported in this environment!')
    enabled = false
  }

  const sink = (commands$) => {
    if (!enabled) { // bail out if not available
      return
    }

    let archive
    // every time a new command is recieved (observable)
    commands$.forEach(command => {
      const { type, id, urls, path } = command
      // console.log('command', command)

      // command handlers/ response
      const unhandled = () => {
        commandResponses.callback({ type, id, error: new Error(`no handler found for command ${type}`) })
      }
      const read = () => {
        urls.map(async url => {
          url = url.replace(' ', '+')
          // const decoded = unescape(url)
          // const foo = url.replace(' ', '+')
          // console.log(`url "${url}" VS "${decoded}" VS ${foo}`)
          archive = new DatArchive(url, {})
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
          watch()
        })
      }

      const watch = () => {
        const evts = archive.watch()
        console.log('starting watch')
        evts.addEventListener('changed', async ({ path }) => {
          console.log(path, 'has been updated!')
          const content = await archive.readFile(path)
          console.log('content', content)
        })
      }

      const commandHandlers = {
        read,
        unhandled
      }
      const commandHandler = commandHandlers[type] || commandHandlers['unhandled']
      commandHandler()
    })
  }

  const source = () => {
    return commandResponses.stream.multicast()
  }

  return { source, sink }
}

module.exports = makeDatSideEffect
