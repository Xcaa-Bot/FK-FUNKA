const fs = require('fs')

global.packName = 'Funka-Bot'
global.authorName = '© Nurul'
global.prefix = '#'
global.mode = 'publik'
global.ownerNumber = ['6283818221226']
global.thumb = fs.readFileSync('./src/foto.jpg')


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(`Update '${__filename}'`)
    delete require.cache[file]
    require(file)
})