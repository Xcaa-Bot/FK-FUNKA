(async () => {
     switch(true) {
         case /^owner$/i.test(command): {
             await reply(mess.wait)
             let listOwner = new Array()
             for (let i of global.ownerNumber.map(v => v.replace(/\D/g, '') + '@s.whatsapp.net')) {
                 listOwner.push({ vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;;;;\nFN:${conn.getName(i)}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Home\nitem2.URL:https://www.instagram.com/thenay_xploit_\nitem2.X-ABLabel:Funka\nitem3.X-ABLabel:Xcaa\nEND:VCARD` })
             }
             conn.sendMessage(from, { displayName: listOwner.length + ' kontak', contacts: listOwner }, 'contactsArrayMessage', { quoted: m })
             break
         }
         case /^d(elete|elate|el)?$/i.test(command): {
             if (quoted && quoted.fromMe) {
                  await quoted.delete()
             } else reply('Reply chat bot')
             break
         }
         case /^(up|run)time$/i.test(command): {
             reply(clockString(process.uptime()))
             break
         }
         case /^(ping|speed)$/i.test(command): {
             let old = +new Date
             let neww = +new Date
             let speed = parseMs(neww - old)
             reply(`Merespon dalam ${speed.seconds}.${speed.milliseconds} detik`)
             break
         }
         case /^(list(grup|group|gc)|grouplist)$/i.test(command): {
             await reply(mess.wait)
             let txt = conn.chats.all().filter(v => v.jid.endsWith('g.us')).map(v =>`${v.name}\n${v.jid} [${v.read_only ? 'Left' : 'Joined'}]`).join`\n\n`
             reply('「 *LIST GROUP* 」\n' + txt)
             break
         }
         case /^r(vo|eadviewonce)$/i.test(command): {
             if (!m.quoted) return reply('Reply viewOncenya')
             if (m.quoted.mtype !== 'viewOnceMessage') return reply('Thats not a viewOnce message')
             await reply(mess.wait)
             await conn.copyNForward(from, await conn.loadMessage(from, m.quoted.id), false, { readViewOnce: true }).catch(_ => reply('Maybe its been opened by a bot'))
             break
         }
     }
})()