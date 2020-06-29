const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')
const makeLogger = require('../../utils/logger')
const getFileExtensionFromString = require('@jscad/core/utils/getFileExtensionFromString')

const makeDatSideEffect = async (params) => {
  const commandResponses = callBackToStream()
  const defaults = { logging: false }
  const { logging } = Object.assign({}, defaults, params)
  const log = makeLogger({ enabled: logging })
  let enabled = true

  const DatArchive = window.DatArchive
  if (!DatArchive) {
    // todo handle loading of package for node.js side if/ when needed
    log.error('Dat archives not supported in this environment!')
    enabled = false
  }

  const sink = (commands$) => {
    let archive
    let hiearchyRoot = []
    let activeUrl
    let rootFolder

    // every time a new command is recieved (observable)
    commands$.forEach((command) => {
      const { type, id, urls, path } = command
      // console.log('command', command)
      if (!enabled) {
        commandResponses.callback({ type, id, error: new Error('Dat archives not supported in this environment!') })
        return
      }

      // command handlers/ response
      const unhandled = () => {
        commandResponses.callback({ type, id, error: new Error(`Dat: no handler found for command ${type}`) })
      }
      const read = () => {
        urls.map(async (url) => {
          url = url.replace(' ', '+')
          // set the local state
          activeUrl = url

          archive = new DatArchive(url, {})
          const filesAndFolders = await archive.readdir(path, { recursive: true, stat: true })
          // console.log('filesAndFolders', filesAndFolders)
          const fileContents = await Promise.all(filesAndFolders.map(async (f) => {
            const fullPath = `${path}/${f.name}`
            if (f.stat.isFile() && f.name.includes('js')) {
              const content = await archive.readFile(fullPath)
              return { content, name: f.name, fullPath: f.name, isFile: true }
            }
            return undefined
          })
          )
          const info = await archive.getInfo()
          rootFolder = info.title || 'unnamed'// rootfolder is a fake root folder !
          const transformed = fileContents.filter((x) => x !== undefined).map((f) => {
            const entry = { name: f.name, ext: getFileExtensionFromString(f.name), source: f.content, fullPath: `/${rootFolder}/` + f.fullPath }
            return entry
          })
          hiearchyRoot = [{
            children: transformed,
            fullPath: `/${rootFolder}`,
            name: rootFolder
          }]
          commandResponses.callback({ type, id, url, data: hiearchyRoot })
          const history = await archive.history()
          console.log('history', history)
        })
      }

      const write = () => {
        // TODO: ??
        log.warning('writing to dat archives is not implemented yet')
      }

      const watch = () => {
        console.log('starting watch')
        const evts = archive.watch()
        // TODO: deal with additions & deletions
        // ex /holder.stl has been updated!
        // index.js:99 Uncaught (in promise) NotFoundError: File not found

        evts.addEventListener('changed', async ({ path }) => {
          // const fullPath = `${path}/${f.name}`
          // TODO: how about folders ?
          console.log(path, 'has been updated!')
          const content = await archive.readFile(path)
          const name = require('path').basename(path)
          const entry = { name, ext: 'js', source: content, fullPath: `/${rootFolder}` + path }
          // console.log('content', content)
          // FIXME: cannot work
          // hiearchyRoot.children = [...hiearchyRoot.children]
          const index = hiearchyRoot[0].children.findIndex((el) => el.fullPath === entry.fullPath)
          // FIXME: eeek !
          hiearchyRoot = JSON.parse(JSON.stringify(hiearchyRoot))
          hiearchyRoot[0].children[index] = entry

          commandResponses.callback({ type: 'read', id: 'loadRemote', url: activeUrl, data: hiearchyRoot })
        })
      }

      const commandHandlers = {
        unhandled,
        read,
        write,
        watch
      }
      const commandHandler = commandHandlers[type] || commandHandlers.unhandled
      commandHandler()
    })
  }

  const source = () => commandResponses.stream.multicast()

  return { source, sink }
}

module.exports = makeDatSideEffect
