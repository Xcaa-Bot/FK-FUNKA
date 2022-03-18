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
        console.log('\n')
        console.log(color('<= ', 'green'), color(`Name : ${conn.user.name}`, 'aqua'))
        console.log(color('<= ', 'green'), color(`Nomer : ${conn.user.jid.split('@')[0]}`, 'aqua'))
        console.log(color('<= ', 'green'), color('Library : Baileys', 'aqua'))
        console.log(color('<= ', 'green'), color('Version : 1.0.0', 'aqua'))
        console.log('\n')
        console.log(color('<=====[CONNECTED]=====>', 'magenta'))
        fs.writeFileSync(session, JSON.stringify(conn.base64EncodedAuthInfo(), null, '\t'))
    })

    conn.on('chat-update', async(m) => {
        handler.chatUpdate(conn, m)
    })
}

start('session.json')