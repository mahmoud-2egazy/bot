import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

// Owner
global.owner = [
['201225655220', 'Zeltoria', true],
]
global.mods = []
global.prems = []
// Info
global.nomorwa = '201225655220'
global.packname = 'Made With'
global.author = '© Clara - MD'
global.namebot = 'Clara - MD'
global.wm = '© Clara - MD'
global.stickpack = 'Made With'
global.stickauth = '© Clara - MD'
global.fotonya = 'https://telegra.ph/file/7a72c74871ac2fb87b8df.jpg'
// Link Sosmed
global.sig = 'https://www.instagram.com/danil_elistz'
global.sgh = 'https://github.com/Zeltoria'
global.sgc = 'https://chat.whatsapp.com/Fi5CZvazVIc0T7LCrxiqDV'
// Payment
global.dana = '085176701771'
// Info Wait
global.wait = '_Sedang Di Proses, Mohon Tunggu_....'
global.eror = './vn/eror.mp3'
global.multiplier = 69 
// Apikey
global.APIs = {
    anu : 'anu.tv'
}

/*Apikey*/
global.APIKeys = {
    "anu.tv": "anu",
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})