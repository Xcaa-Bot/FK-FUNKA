(async () => {
     switch(true) {
         case /^(menu|help)$/i.test(command): {
             menunya = `
╭「 *INFO BOT* 」
├ Author : Nurul
├ NameB : Funka
├ Library : Baileys
├ Version : 1.0.0
└ Terminal : Termux

╭「 *ABOUT* 」
├ ${prefix}owner
├ ${prefix}speed
├ ${prefix}runtime
├ ${prefix}listgroup
├ ${prefix}rvo
└ ${prefix}delete

╭「 *RDM IMAGE* 」
├ ${prefix}cowok
├ ${prefix}cewek
├ ${prefix}exo
├ ${prefix}bts
├ ${prefix}blackpink
├ ${prefix}cosplay
├ ${prefix}waifu
├ ${prefix}wlphacker
├ ${prefix}drakjokes
├ ${prefix}asupan
└ ${prefix}asupanloli

╭「 *DOWNLOAD* 」
├ ${prefix}yts
├ ${prefix}play
├ ${prefix}ytmp3
├ ${prefix}ytmp4
├ ${prefix}getmp3
├ ${prefix}getmp4
├ ${prefix}pinterest
├ ${prefix}gimage
└ ${prefix}wallpaper

╭「 *CONVERTER* 」
├ ${prefix}sticker
├ ${prefix}tomp3
├ ${prefix}tomp4
├ ${prefix}toimg
└ ${prefix}tourl

╭「 *ANONYMOUS* 」
├ ${prefix}start
├ ${prefix}next
└ ${prefix}stop

╭「 *GROUPS* 」
├ ${prefix}setppgc
├ ${prefix}linkgc
├ ${prefix}promote
├ ${prefix}demote
├ ${prefix}hidetag
└ ${prefix}tagall

╭「 *OWNER* 」
├ ${prefix}public
├ ${prefix}self
├ ${prefix}setppbot
├ ${prefix}setprefix
├ ${prefix}join
├ ${prefix}get
├ ${prefix}restart
└ >
`
              data = fs.readFileSync('./lib/imageB.js')
              jsonData = JSON.parse(data)
              randConn = Math.floor(Math.random() * jsonData.length);
              randKey = jsonData[randConn];
              imgB = await getBuffer(randKey.image)
              let prep = await conn.toMSG(imgB, 'locationMessage', {thumbnail: imgB})
              conn.sendMessage(from, { contentText: menunya.trim(), footerText: 'Maaf jika tidak puas dengan fitur bot ini\n\n© FxSx', buttons: [{ buttonId: `${prefix}owner`, buttonText: { displayText: 'OWNER' }, type: 1 }, { buttonId: `${prefix}ping`, buttonText: { displayText: 'SPEED' }, type: 1 }, { buttonId: `${prefix}runtime`, buttonText: { displayText: 'RUNTIME' }, type: 1 }], headerType: 'LOCATION', locationMessage: prep }, 'buttonsMessage', { quoted: m })
              break
         }
     }
})()