require('./config.js')
'use strict';
const { WAConnection, MessageType } = require('@adiwajshing/baileys')
const handler = require('./handler.js')
const simple = require('./lib/simple.js')
const Client = simple.WAConnection(WAConnection)
const fs = require('fs')
const functions = require('./lib/function.js')
const { color } = functions


async function start(session) {
    global.conn = new Client()
    console.log(color('[BOT]', 'yellow'), color('Loading...', 'blue'))
    conn.on('qr', () => {
        console.log(color('[SCAN]', 'yellow'), color('QR Code Now...', 'aqua'))
    })
    if (fs.existsSync(session)) conn.loadAuthInfo(session)
    conn.on('connecting', () => {
        console.log(color('[BOT]', 'yellow'), color('Connecting...', 'blue'))
    })
    conn.on('open', () => {
        console.log(color('[BOT]', 'yellow'), color('Connected...!', 'aqua'))
    })
    conn.connect().then(() => {
        console.log(color('<=====[CONNECTED]=====>', 'magenta'))
        console.log(color('\n')
        console.log(color('<= ', 'green'), color(`Name : ${conn.user.name}`, 'aqua'), color(' =>', 'green'))
        console.log(color('<= ', 'green'), color(`Nomer : ${conn.user.jid.split('@')[0]}`, 'aqua'), color(' =>', 'green'))
        console.log(color('<= ', 'green'), color('Library : Baileys', 'aqua'), color(' =>', 'green'))
        console.log(color('<= ', 'green'), color('Version : 1.0.0', 'aqua'), color(' =>', 'green'))
        console.log(color('\n')
        console.log(color('<=====[CONNECTED]=====>', 'magenta'))
        fs.writeFileSync(session, JSON.stringify(conn.base64EncodedAuthInfo(), null, '\t'))
    })

    conn.on('chat-update', async(m) => {
        handler.chatUpdate(conn, m)
    })
    
    conn.on('group-participants.update', async (anu) => {
        console.log(anu)
        try {
            let mdata = await conn.groupMetadata(anu.id)
            let participants = anu.participants[0]
            for (let num of participants) {
                try {
                    ppuser = await conn.profilePictureUrl(num)
                } catch {
                    ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }
                if (anu.action == 'add') {
                    come = await fs.readFileSync('./sound/welcome.mp3')
                    conn.sendMessage(mdata.id, come, 'audioMessage', {quoted: {"key": {"fromMe": false,"participant":"0@s.whatsapp.net", "remoteJid": "0@s.whatsapp.net"}, "message": {orderMessage: {itemCount: 1, status: 200, thumbnail: ppuser, surface: 200, message: `Welcome @${num.split("@")[0]}👋`, orderTitle: 'Welcome', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {forwardingScore: 508, isForwarded: true}}, ptt: true, mimetype: 'audio/mp4', contextInfo: {mentionedJid: [num]}})
                } else if (anu.action == 'remove') {
                    ave = await fs.readFileSync('./sound/leave.mp3')
                    conn.sendMessage(mdata.id, ave, 'audioMessage', {quoted: {"key": {"fromMe": false,"participant":"0@s.whatsapp.net", "remoteJid": "0@s.whatsapp.net"}, "message": {orderMessage: {itemCount: 1, status: 200, thumbnail: ppuser, surface: 200, message: `Sayonara Pantek @${num.split("@")[0]}`, orderTitle: 'Sayonara', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {forwardingScore: 508, isForwarded: true}}, ptt: true, mimetype: 'audio/mp4', contextInfo: {mentionedJid: [num]}})
                }
            }
        } catch (e) {
            console.log(e)
        }
    })
}

start('session.json')