(async () => {
     switch(true) {
         case /^>?> /.test(body): {
             if (!isOwner) return reply('Fitur Khusus Owner')
             let teks
             try {
                 teks = await eval(`(async () => { ${(/^>>/.test(budy) ? 'return ' : '') + text} })()`)
             } catch (e) {
                 teks = e
             } finally {
                 reply(util.format(teks))
             }
             break
         }
         case /^[$] /.test(body): {
             if (!isOwner) return reply('Fitur Khusus Owner')
             await reply('Diproses...')
             exec(text, (stderr, stdout) => {
                 if (stderr) reply(stderr)
                 if (stdout) reply(stdout)
             })
             break
         }
         case /^setprefix$/i.test(command): {
             if (!isOwner) return reply('Fitur Khusus Owner')
             global.prefix = text
             reply(`Success Set Prefix To ${text}`)
             break
         }
         case /^(self|publi(k|c))$/i.test(command): {
             if (!isOwner) return reply('Fitur Khusus Owner')
             global.mode = /self/i.test(body) ? 'SELF' : 'PUBLIC'
             reply(`MODE : ${mode}`)
             break
         }
         case /^set(ppbot|botpp)$/i.test(command): {
             if (!isOwner) return reply('Fitur Khusus Owner')
             let media = quoted ? quoted : m
             if (/image|document/.test(media.mtype)) {
                 reply('Diproses...')
                 conn.updateProfilePicture(conn.user.jid, await media.download()).then(() => reply(mess.sukses))
             } else reply('Gambarnya mana?')
             break
         }
         case /^join$/i.test(command): {
             if (!isOwner) return reply('Fitur Khusus Owner')
             let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
             let [_, code] = text.match(linkRegex) || []
             if (!code) return reply('Invalid code.')
             let res = await conn.acceptInvite(code)
             reply('Sukses...')
             break
         }
         case /^(get|fetch)$/i.test(command): {
             if (!isOwner) return reply('Fitur Khusus Owner')
             if (!text) return reply('Urlnya?')
             let res = await fetch(args[0])
             if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
                 delete res.headers
                 reply(`Content-Length: ${res.headers.get('content-length')}`)
             } 
             if (!/text|json/.test(res.headers.get('content-type'))) return conn.sendFile(from, text, 'file', text, m)
             let txt = await res.buffer()
             try {
                txt = util.format(JSON.parse(txt + ''))
             } catch (e) {
                txt = txt + ''
             } finally {
                reply(txt.slice(0, 65536) + '')
             }
             break
         }
         case /^restart$/i.test(command): {
             if (!isOwner) return reply('Fitur Khusus Owner')
             await reply('Diproses...')
             process.send('reset')
             break
         }
     }
})()