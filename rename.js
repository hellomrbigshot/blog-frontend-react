const fs = require('fs')
const path = require('path')
const floder = path.resolve('./src')
function play (floder) {
  const fileList = fs.readdirSync(floder).slice(0)
  fileList.forEach(item => {
    const curPath = path.join(floder, item)
    const stats = fs.statSync(curPath)
    const isDirectory = stats.isDirectory()
    if (isDirectory) {
      play(curPath)
    } else {
      renameFile(floder, item)
    }
  })
}
function renameFile (curPath, file) {

   const regJs = /^(\w{1,})\.jsx?/
   if (regJs.test(file)) {
     const newFile = file.replace(/\.jsx?/, '.tsx')
     const oldPath = path.join(curPath, file)
     const newPath = path.join(curPath, newFile)
     console.log('oldPath', oldPath)
     console.log('newPath', newPath)
     fs.renameSync(path.join(curPath, file), path.join(curPath, newFile))
   }
}
play(floder)
