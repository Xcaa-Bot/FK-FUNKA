const fs = require('fs')

global.packName = 'Funka-Bot'
global.authorName = '© Nurul'
global.prefix = '#'
global.mode = 'publik'
global.ownerNumber = ['6283818221226']
global.thumb = fs.readFileSync('./src/fotobot.jpg')
global.mess = {
    sukses: 'Sukses...',
    admin: 'Fitur Khusus Admin Group!',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
    owner: 'Fitur Khusus Owner Bot!',
    group: 'Fitur Khusus Untuk Group!',
    private: 'Fitur Khusus Untuk Private Chat!',
    wait: 'Loading...',
    eror: 'Error...',
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(`Update '${__filename}'`)
    delete require.cache[file]
    require(file)
})