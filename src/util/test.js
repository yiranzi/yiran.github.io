const fs = require('fs')
const path = require('path')
const Test = {}
// 遍历文件夹
Test.walkDir = function (dir, files) {
  files = files || []
  fs.readdirSync(dir).forEach((file) => {
    let filePath = `${dir}/${file}`
    let stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      Test.walkDir(filePath, files)
    } else {
      files.push(filePath)
    }
  })
}

// next.config.js exportPathMap
Test.exportPathMap = function () {
  const dir = path.join(__dirname, '../pages')

  let files = []
  Test.walkDir(dir, files)
  let pathMap = {}
  files.forEach((file) => {
    let filePath = file.replace(dir, '').replace('.js', '')
    pathMap[filePath] = {page: filePath}
  })
  return pathMap
}

module.exports = Test