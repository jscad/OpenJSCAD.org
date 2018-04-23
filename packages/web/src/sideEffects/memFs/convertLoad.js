console.log('readFilesAndFolders', readFilesAndFolders)
            readFilesAndFolders.forEach(function (entry) {
              const ext = entry.name.split('.')[1].toLowerCase()
              const {name, source, fullPath} = entry

              console.log('ext', ext)
              if (ext === 'stl') {
                const convertedName = name.replace('.', '_')
                const convertedSource = "`"+source+"`"

                const newMainFile = {name: 'main.js',
                  source: `
                  const load = (filePath) => {
                    const source = ${convertedSource}
                    return deserializeStl(source, undefined, {output: 'csg'})
                  }
                  const main = () => {
                    const ${convertedName} = load('.${fullPath}')
                    return ${convertedName}
                }
                `,
                  fullPath: 'main.js'}
                console.log('new main entry', newMainFile)
                const newFilesAndFolders = [newMainFile]
                fs = makeFakeFs(newFilesAndFolders)
                commandResponses.callback({type, id, data: newFilesAndFolders})
                
                /*function onDone (data) {
                  // console.log('done converting', data)
                }
                const worker = require('../../core/io/createConversionWorker').createConversionWorker(onDone)

                worker.postMessage({source, filename: name})*/
              } else {
              }

            })