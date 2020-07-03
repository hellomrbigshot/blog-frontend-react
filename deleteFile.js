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
      deleteFile(floder, item)
    }
  })
}
function deleteFile (curPath, file) {

   const regJs = /^(\w{1,})\.jsx?/
   if (regJs.test(file)) {
     fs.unlinkSync(path.join(curPath, file))
   }
}
play(floder)
