(async () => {
     switch(true) {
         case /^cowok$/i.test(command): {
             await reply(mess.wait)
             data = fs.readFileSync('./lib/cowok.js')
             jsonData = JSON.parse(data)
             randConn = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randConn];
             cowokk = await getBuffer(randKey.result)
             let prep = await conn.toMSG(cowokk, 'imageMessage', {thumbnail: cowokk})
             conn.sendMessage(from, { contentText: `Image ${command}nya nih kak`, footerText: '© FxSx', buttons: [{ buttonId: `${prefix}cowok`, buttonText: { displayText: 'Next' }, type: 1 }], headerType: 'IMAGE', imageMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
         case /^cewek$/i.test(command): {
             await reply(mess.wait)
             data = fs.readFileSync('./lib/cewek.js')
             jsonData = JSON.parse(data)
             randConn = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randConn];
             cewekk = await getBuffer(randKey.result)
             let prep = await conn.toMSG(cewekk, 'imageMessage', {thumbnail: cewekk})
             conn.sendMessage(from, { contentText: `Image ${command}nya nih kak`, footerText: '© FxSx', buttons: [{ buttonId: `${prefix}cewek`, buttonText: { displayText: 'Next' }, type: 1 }], headerType: 'IMAGE', imageMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
         case /^exo$/i.test(command): {
             await reply(mess.wait)
             data = fs.readFileSync('./lib/exo.js')
             jsonData = JSON.parse(data)
             randConn = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randConn];
             xoo = await getBuffer(randKey.result)
             let prep = await conn.toMSG(xoo, 'imageMessage', {thumbnail: xoo})
             conn.sendMessage(from, { contentText: `Image ${command}nya nih kak`, footerText: '© FxSx', buttons: [{ buttonId: `${prefix}exo`, buttonText: { displayText: 'Next' }, type: 1 }], headerType: 'IMAGE', imageMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
         case /^bts(batues|butues)$/i.test(command): {
             await reply(mess.wait)
             data = fs.readFileSync('./lib/bts.js')
             jsonData = JSON.parse(data)
             randConn = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randConn];
             batues = await getBuffer(randKey.result)
             let prep = await conn.toMSG(batues, 'imageMessage', {thumbnail: batues})
             conn.sendMessage(from, { contentText: `Image ${command}nya nih kak`, footerText: '© FxSx', buttons: [{ buttonId: `${prefix}bts`, buttonText: { displayText: 'Next' }, type: 1 }], headerType: 'IMAGE', imageMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
         case /^blackpink$/i.test(command): {
             await reply(mess.wait)
             data = fs.readFileSync('./lib/blackpink.js')
             jsonData = JSON.parse(data)
             randConn = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randConn];
             blakpink = await getBuffer(randKey.result)
             let prep = await conn.toMSG(blakpink, 'imageMessage', {thumbnail: blakpink})
             conn.sendMessage(from, { contentText: `Image ${command}nya nih kak`, footerText: '© FxSx', buttons: [{ buttonId: `${prefix}blackpink`, buttonText: { displayText: 'Next' }, type: 1 }], headerType: 'IMAGE', imageMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
         case /^dark(joke|jokes)$/i.test(command): {
             await reply(mess.wait)
             data = fs.readFileSync('./lib/darkjokes.js')
             jsonData = JSON.parse(data)
             randConn = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randConn];
             gelapjok = await getBuffer(randKey.result)
             let gelapjok = await conn.toMSG(gelapjok, 'imageMessage', {thumbnail: gelapjok})
             conn.sendMessage(from, { contentText: `Image ${command}nya nih kak`, footerText: '© FxSx', buttons: [{ buttonId: `${prefix}darkjoke`, buttonText: { displayText: 'Next' }, type: 1 }], headerType: 'IMAGE', imageMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
         case /^cosplay$/i.test(command): {
             await reply(mess.wait)
             data = fs.readFileSync('./lib/cosplay.js')
             jsonData = JSON.parse(data)
             randConn = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randConn];
             cospla = await getBuffer(randKey.result)
             let prep = await conn.toMSG(cosplay, 'imageMessage', {thumbnail: cospla})
             conn.sendMessage(from, { contentText: `Image ${command}nya nih kak`, footerText: '© FxSx', buttons: [{ buttonId: `${prefix}cosplay`, buttonText: { displayText: 'Next' }, type: 1 }], headerType: 'IMAGE', imageMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
         case /^waifu$/i.test(command): {
             await reply(mess.wait)
             data = fs.readFileSync('./lib/waifu.js')
             jsonData = JSON.parse(data)
             randConn = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randConn];
             waifuu = await getBuffer(randKey.result)
             let prep = await conn.toMSG(waifuu, 'imageMessage', {thumbnail: waifuu})
             conn.sendMessage(from, { contentText: `Image ${command}nya nih kak`, footerText: '© FxSx', buttons: [{ buttonId: `${prefix}waifu`, buttonText: { displayText: 'Next' }, type: 1 }], headerType: 'IMAGE', imageMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
         case /^(wallpaperprogrammer|wlpprogram|wlpcoding|wlphacker)$/i.test(command): {
             await reply(mess.wait)
             data = fs.readFileSync('./lib/wallpaper.js')
             jsonData = JSON.parse(data)
             randConn = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randConn];
             perr = await getBuffer(randKey.result)
             let prep = await conn.toMSG(perr, 'imageMessage', {thumbnail: perr})
             conn.sendMessage(from, { contentText: `Image ${command}nya nih kak`, footerText: '© FxSx', buttons: [{ buttonId: `${prefix}wlphacker`, buttonText: { displayText: 'Next' }, type: 1 }], headerType: 'IMAGE', imageMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
         case /^asupan$/i.test(command): {
             reply(mess.wait)
             data = fs.readFileSync('./lib/asupan.js')
             jsonData = JSON.parse(data)
             randConn = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randConn];
             asupan = await getBuffer(randKey.result)
             let prep = await conn.toMSG(asupan, 'videoMessage')
             conn.sendMessage(from, { contentText: `Video ${command}nya nih kak`, footerText: '© FxSx', buttons: [{ buttonId: `${prefix}asupan`, buttonText: { displayText: 'Next' }, type: 1 }], headerType: 'VIDEO', videoMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
         case /^asupan(uwu|loli)$/i.test(command): {
             await reply(mess.wait)
             data = fs.readFileSync('./lib/asupanloli.js')
             jsonData = JSON.parse(data)
             randConn = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randConn];
             asupanlol = await getBuffer(randKey.result)
             let prep = await conn.toMSG(asupanlol, 'videoMessage')
             conn.sendMessage(from, { contentText: `Video ${command}nya nih kak`, footerText: '© FxSx', buttons: [{ buttonId: `${prefix}asupanloli`, buttonText: { displayText: 'Next' }, type: 1 }], headerType: 'VIDEO', videoMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
     }
})()