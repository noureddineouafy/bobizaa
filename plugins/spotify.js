import fb from 'api-dylux'
import fetch from 'node-fetch'
let limit = 999

let handler = async (m, { conn, text, args, usedPrefix, command }) => {

if (!args[0]) throw `هذا الامر خاص بالتحميل من منصة سبوتيفاي لكن يجب ان تتوفر على رابط الاغنية ثم تكتب هكذا على سبيل المثال :\n\n*.spotify* https://open.spotify.com/track/4Jj3yew48NodVHWePPUGR7`


let ling = await fetch(`https://api.yanzbotz.my.id/api/downloader/spotify?url=${args[0]}`)
let spotify = await ling.json()

let detil = `
*المغني:* ${spotify.result.data.metadata.artist}
*الاسم:* ${spotify.result.data.metadata.name}
*الالبوم:* ${spotify.result.data.metadata.album}

_جاري التحميل..._
`
let detil2 = `
*المغني:* ${spotify.result.data.metadata.artist}
*الاسم:* ${spotify.result.data.metadata.name}
*الالبوم:* ${spotify.result.data.metadata.album}
`

conn.sendMessage(m.chat, {text: detil,
contextInfo: {
forwardingScore: 9999,
isForwarded: true,
externalAdReply: {
title: ('Spotify Downloader'),
body: spotify.result.data.metadata.name,
thumbnailUrl: (`${spotify.result.data.metadata.image}`),
sourceUrl: (`${spotify.result.data.metadata.weburl}`),
mediaType: 1,
renderLargerThumbnail: false
}}},
{quoted: m})

await conn.sendFile(m.chat, spotify.result.data.metadata.download, (`${spotify.result.data.metadata.name} (bobiza Bot).m4a`), 'Spotify Downloader\n© Bobiza Bot', m)

 }
handler.help = ['spotify'].map(v => v + ' <url>')
handler.tags = ['dl','prem']
handler.command = /^((spotify|dl)?)$/i
handler.diamond = true

export default handler

//https://api.yanzbotz.my.id/api/downloader/spotify?url=https://open.spotify.com/track/4Jj3yew48NodVHWePPUGR7

/*import fetch 'node-fetch'

let handler = async (m, { conn, command, usedPrefix, text }) => {
  if (!text) throw `Ketik ${usedPrefix + command} judul lagu dan penyanyinya 

Contoh : ${usedPrefix + command} oh asmara kobo kanaeru`
   await m.reply('Tunggu bentar...')
  const response = await fetch(`https://myvin.me/spotify/play?q=${text}`)
  if (!response.ok) throw `Gagal memanggil API: ${response.statusText}`

  const buffer = await response.buffer()
  conn.sendFile(m.chat, buffer, 'audio.mp3', '', m, 0, { mimetype: 'audio/mp4' })
}

handler.help = ['spotify']
handler.command = ['spotify']
handler.tags = ['dl']
handler.diamond = true

export default handler*/
