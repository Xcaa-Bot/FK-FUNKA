(async () => {
     switch(true) {
         case /^yt(s|search)$/i.test(command): {
             if (!text) return reply(`Contoh : ${prefix + command} story wa anime`)
             let yts = require("yt-search")
             let search = await yts(text)
             let teks = 'YouTube Search\nResult From '+text+'\n'
             let no = 1
             for (let i of search.all) {
                 teks += `╭ No : ${no++}\n├ Type : ${i.type}\n├ Video ID : ${i.videoId}\n├ Title : ${i.title}\n├ Views : ${i.views}\n├ Duration : ${i.timestamp}\n├ Upload At : ${i.ago}\n├ Author : ${i.author.name}\n└ Url : ${i.url}\n\n`
             }
             conn.sendMessage(from, `${search.all[0].thumbnail}`, 'imageMessage', { quoted: m, caption: teks })
             break
         }
         case /^yt(play)$/i.test(command): {
             if (!text) return reply(`Contoh : ${prefix + command} Kokoro no tomo`)
             let yts = require("yt-search")
             let search = await yts(text)
             let anu = search.videos[Math.floor(Math.random() * search.videos.length)]
             teksnya = `╭ Title : ${anu.title}\n├ Ext : Search\n├ ID : ${anu.videoId}\n├ Duration : ${anu.timestamp}\n├ Viewers : ${anu.views}\n├ Upload At : ${anu.ago}\n├ Author : ${anu.author.name}\n├ Channel : ${anu.author.url}\n├ Description : ${anu.description}\n└ Url : ${anu.url}`,
             let prep = await conn.toMSG(anu.thumbnail, 'locationMessage', {thumbnail: anu.thumbnail})
             conn.sendMessage(from, { contentText: teksnya.trim(), footerText: '© FxSx', buttons: [{ buttonId: `${prefix}ytmp3 ${anu.url} 128kbps`, buttonText: { displayText: 'AUDIO' }, type: 1 }, { buttonId: `${prefix}ytmp4 ${anu.url} 360p`, buttonText: { displayText: 'VIDEO' }, type: 1 }], headerType: 'LOCATION', locationMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
         case /^yt(mp3|audio)$/i.test(command): {
             if (!text) return reply(`Contoh : ${prefix + command} https://youtube.com/... 128kbps`)
		     let { aiovideodl } = require('./lib/scraper')
             let result = await aiovideodl(isUrl(text)[0])
             let { url, title, thumbnail, duration, medias } = result
             let quality = args[1] ? args[1] : '128kbps'                
             let media = medias.filter(v => v.videoAvailable == false && v.audioAvailable == true && v.quality == quality).map(v => v)
             if (media[0].formattedSize.split('MB')[0] >= 100.00) return reply('File Melebihi Batas'+util.format(media))
             conn.sendMessage(from, thumbnail, 'imageMessage', {quoted m, caption: `╭ Title : ${title}\n├ File Size : ${media[0].formattedSize}\n├ Url : ${url}\n├ Ext : MP3\n└ Resolusi : ${args[1] || '128kbps'}`})
             conn.sendMessage(from, media[0].url, 'audioMessage', {quoted: m, mimetype: 'audio/mp4', fileName: `${title}.mp3`})
             break
         }
         case /^yt(mp4|video)$/i.test(command): {
             if (!text) return reply(`Contoh : ${prefix + command} https://youtube.com/... 360p`)
             let { aiovideodl } = require('./lib/scraper')
             let result = await aiovideodl(isUrl(text)[0])
             let { url, title, thumbnail, duration, medias } = result
             let quality = args[1] ? args[1] : '360p'                
             let media = medias.filter(v => v.videoAvailable == true && v.audioAvailable == false && v.quality == quality).map(v => v)
             if (media[0].formattedSize.split('MB')[0] >= 100.00) return reply('File Melebihi Batas'+util.format(media))
             conn.sendMessage(from, media[0].url, 'videoMessage', {quoted: m, fileName: `${title}.mp4`, mimetype: 'video/mp4', caption: `╭ Title : ${title}\n├ File Size : ${media[0].formattedSize}\n├ Url : ${url}\n├ Ext : MP4\n└ Resolusi : ${args[1] || '360p'}`})
             break
         }
         case /^get(mp3|audio|musik)$/i.test(command): {
             if (!text) return reply(`Contoh : ${prefix + command} 1`)
             if (!m.quoted) return reply('Reply Pesan')
             if (!m.quoted.isBaileys) return reply(`Hanya Bisa Membalas Pesan Dari Bot`)
             let urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
             if (!urls) return reply(`Mungkin pesan yang anda reply tidak mengandung result ytsearch`)
             let { aiovideodl } = require('./lib/scraper')
             let result = await aiovideodl(urls[text - 1])
             let { url, title, thumbnail, duration, medias } = result
             let quality = args[1] ? args[1] : '128kbps'
             let media = medias.filter(v => v.videoAvailable == false && v.audioAvailable == true && v.quality == quality).map(v => v)
             if (media[0].formattedSize.split('MB')[0] >= 100.00) return reply('File Melebihi Batas'+util.format(media))
             conn.sendMessage(from, thumbnail, 'imageMessage', {quoted: m, caption: `╭ Title : ${title}\n├ File Size : ${media[0].formattedSize}\n├ Url : ${url}\n├ Ext : MP3\n└ Resolusi : ${args[1] || '128kbps'}`})                 
             conn.sendMessage(from, media[0].url, 'audioMessage', {mimetype: 'audio/mp4', fileName: `${title}.mp3`, quoted: m })
             break
         }
         case /^get(mp4|vidio|video)$/i.test(command): {
             if (!text) return reply(`Contoh : ${prefix + command} 1`)
             if (!m.quoted) return reply('Reply Pesan')
             if (!m.quoted.isBaileys) return reply(`Hanya Bisa Membalas Pesan Dari Bot`)
             let urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
             if (!urls) return reply(`Mungkin pesan yang anda reply tidak mengandung result ytsearch`)
             let { aiovideodl } = require('./lib/scraper')
             let result = await aiovideodl(urls[text - 1])
             let { url, title, thumbnail, duration, medias } = result
             let quality = args[1] ? args[1] : '360p'                
             let media = medias.filter(v => v.videoAvailable == true && v.audioAvailable == false && v.quality == quality).map(v => v)
             if (media[0].formattedSize.split('MB')[0] >= 100.00) return reply('File Melebihi Batas'+util.format(media))
             conn.sendMessage(from, media[0].url, 'videoMessage', {fileName: `${title}.mp4`, mimetype: 'video/mp4', caption: `╭ Title : ${title}\n├ File Size : ${media[0].formattedSize}\n├ Url : ${url}\n├ Ext : MP4\n└ Resolusi : ${args[1] || '360p'}`, quoted: m })
             break
         }
         case /^pinte(rest)$/i.test(command): {
             if (!text) return reply(`Contoh : ${prefix + command} Yuna Taira`)
             await reply('Diproses...')
		     let { pinterest } = require('./lib/scraper')
             anu = await pinterest(text)
             meg = anu[Math.floor(Math.random() * anu.length)]
             let prep = await conn.toMSG(meg, 'imageMessage', {thumbnail: meg})
             conn.sendMessage(from, { contentText: `╭「 *PINTEREST* 」\n├ Query : ${text}\n└ Media Url : +result`, footerText: '© FxSx', buttons: [{ buttonId: `${prefix}pinterest ${text}`, buttonText: { displayText: 'Next' }, type: 1 }], headerType: 'IMAGE', imageMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
         case /^(gimage|googleimage)$/i.test(command): {
             if (!text) return reply(`Contoh : ${prefix + command} Yuna Taira`)
             await reply('Diproses...')
             let gis = require('g-i-s')
             gis(text, async (error, result) => {
             ca = result
             images = ca[Math.floor(Math.random() * ca.length)].url
             let prep = await conn.toMSG(images, 'imageMessage', {thumbnail: images})
             conn.sendMessage(from, { contentText: `╭「 *GIMAGE* 」\n├ Query : ${text}\n└ Media Url : ${images}`, footerText: '© FxSx', buttons: [{ buttonId: `${prefix}gimage ${text}`, buttonText: { displayText: 'Next' }, type: 1 }], headerType: 'IMAGE', imageMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
         case /^wallpaper$/i.test(command): {
             if (!text) return reply(`Contoh : ${prefix + command} gunung`)
		     let { wallpaper } = require('./lib/scraper')
             anu = await wallpaper(text)
             result = anu[Math.floor(Math.random() * anu.length)]
		     let prep = await conn.toMSG(result.image[0], 'imageMessage', {thumbnail: result.image[0]})
             conn.sendMessage(from, { contentText: `╭「 *WALLPAPER* 」 \n├ Title : ${result.title}\n├ Category : ${result.type}\n├ Detail : ${result.source}\n└ Media Url : ${result.image[2] || result.image[1] || result.image[0]}`, footerText: '© FxSx', buttons: [{ buttonId: `${prefix}wallpaper ${text}`, buttonText: { displayText: 'Next' }, type: 1 }], headerType: 'IMAGE', imageMessage: prep }, 'buttonsMessage', { quoted: m })
             break
         }
     }
})()