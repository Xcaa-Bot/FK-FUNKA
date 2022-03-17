(async () => {
     switch(true) {
         case /^(next|lanjut)$/i.test(command): {
             if (isGroup) return reply(mess.group)
             let rom = Object.values(anonymous).find(room => room.check(sender))
             if (!rom) {
                conn.reply(from, 'Anda tidak memiliki pasangan 🤔\nType '+ prefix +'mencari untuk menemukan pasangan baru', m)
             }
             let other = rom.other(sender)
             if (other) {
                 conn.reply(other, 'Anda telah menghentikan dialog 😞\nType '+ prefix +'mencari untuk menemukan pasangan baru', m)
             }
             delete anonymous[rom.id]
             break
         } 
         case /^(start|search)$/i.test(command): {
             if (isGroup) return reply(mess.group)
             if (Object.values(anonymous).find(room => room.check(sender))) return reply('Kamu masih berada di dalam anonymous chat')
             let room = Object.values(anonymous).find(room => room.state === "WAITING" && !room.check(sender))
             if (room) {
                 conn.reply(room.c, 'Pasangan tidak ada 😐\n'+ prefix + 'selanjutnya — temukan pasangan baru\n'+ prefix + 'berhenti — hentikan dialog ini', m)
                 room.b = sender
                 room.state = "CHATTING"
                 conn.reply(from, 'Pasangan tidak ada 😐\n' + prefix + 'selanjutnya — temukan pasangan baru\n'+ prefix + 'berhenti — hentikan dialog ini', m)
             } else {
                 let ifd = +new Date()
                 anonymous[ifd] = {
                     id: ifd,
                     c: sender,
                     b: '',
                     state: "WAITING",
                     check: function (who = '') {
                     return [this.c, this.b].includes(who)
                 },
                 other: function (who = '') {
                     return who === this.c ? this.b : who === this.b ? this.c : ''
                 },
             }
             reply('Mencari...')
             }
             break
         }
         case /^(stop|berhenti)$/i.test(command): {
             if (isGroup) return reply(mess.group)
             let reme = Object.values(anonymous).find(room => room.check(sender))
             if (!reme) {
                 conn.reply(from, 'Anda tidak memiliki pasangan 🤔\nType '+ prefix + 'mencari untuk menemukan pasangan baru', m)
             }
             conn.reply(from, 'Anda telah menghentikan dialog 😞\nType '+ prefix + 'mencari untuk menemukan pasangan baru', m)
             delete anonymous[reme.id]
             let erh = reme.other(sender)
             if (erh) {
                 conn.reply(erh, 'Pasangan Anda telah menghentikan dialog 😞\nType '+ prefix +'mencari untuk menemukan pasangan baru', m)
             }
             break
         }
     } 
})()