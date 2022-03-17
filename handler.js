require('./config.js')
'use strict';
const { 
    WAConnection, 
    MessageType, 
    Mimetype, 
    GroupSettingChange 
} = require('@adiwajshing/baileys')
const fetch = require('node-fetch')
const axios = require('axios')
const cheerio = require('cheerio')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const util = require('util')
const { exec } = require('child_process')

const simple = require('./lib/simple.js')
const convert = require('./lib/converter.js')
const { uploadFile, getAdmin, parseResult, parseMs, bytesToSize, clockString, processTime, fetchText, fetchJson, getBuffer, getTime, isUrl, urlShort, pickRandom, print, color, sleep } = require('./lib/function.js')

let anonymous = {}

module.exports = {
    async chatUpdate(conn, chat) {
        try {
           if (!chat.hasNewMessage) return
           let m = chat.messages.all()[0]
           if (!m.message || m.key && m.key.remoteJid == 'status@broadcast') return
           m.message = m.message.hasOwnProperty('ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
           await simple.smsg(conn, m)
           switch (m.mtype) {
               case 'audioMessage':
               case 'videoMessage':
               case 'imageMessage':
               case 'stickerMessage':
               case 'documentMessage': {
                   if (!m.fromMe) await sleep(1000)
                   if (!m.msg.url) await conn.updateMediaMessage(m)
                   break
               }
           }
           const { chat: from, fromMe, isGroup, sender, mtype, quoted, mentionedJid, reply, isQuotedSticker, isQuotedImage, isQuotedVideo, isQuotedDocument, isQuotedAudio, isBaileys } = m
           if (isBaileys) return
           const body = typeof m.text == 'string' ? m.text : ''
           const command = body.startsWith(prefix) ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : ''
           const args = body.trim().split(/ +/).slice(1)
           const isCmd = command.startsWith(prefix);
           const text = q = args.join(" ")
           
           const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
           const groupName = isGroup ? groupMetadata.subject : ''
           const meta = isGroup ? await conn.chats.get(from).metadata : ''
           const admin = isGroup ? getAdmin(meta.participants) : ''
           const isAdmin = admin.includes(sender) || false
           const isBotAdmin = admin.includes(conn.user.jid) || false
           const pushname = fromMe ? conn.user.name : conn.getName(sender)
           const time = getTime('HH:mm:ss')
           const isOwner = fromMe || global.ownerNumber.map(v => v.replace(/\D/g, '') + '@s.whatsapp.net').includes(sender)
           
           if (mode == 'self' && !isOwner) return
           if (m.message) console.log(chalk.black(chalk.bgWhite('[ MSG ]')), chalk.black(chalk.bgGreen(time)), chalk.black(chalk.bgAqua(body || m.mtype)) + '\n' + chalk.magenta('> Dari'), chalk.aqua(pushname), chalk.yellow(sender) + '\n' + chalk.blueBright('> Di'), chalk.aqua(isGroup ? groupName : 'Private Chat', from))
          
           if (from.endsWith("@s.whatsapp.net") && !isCmd) {
               let room = Object.values(anonymous).find(room => [room.c, room.b].includes(sender) && room.state === 'CHATTING')
               if (room) {
                   let other = [room.c, room.b].find(user => user !== sender)
                   m.copyNForward(other, true, quoted && quoted.fromMe ? { contextInfo: { ...m.msg.contextInfo, forwardingScore: 508, isForwarded: true, participant: other }} : {})
               }
           }
          
           fs.readdirSync('./cmd').forEach((file) => {
           if (path.extname(file).toLowerCase() == '.js') {
                   eval(fs.readFileSync('./cmd/' + file,  'utf8'))
               }
           })
       } catch (e) {
           conn.logger.error(e)
       }
   }
}
       
let file = require.resolve(__filename)
fs.watchFile(file, () => {
     fs.unwatchFile(file)
     console.log(`Update '${__filename}'`)
     delete require.cache[file]
     require(file)
})