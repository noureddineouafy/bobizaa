//https://vihangayt.me/download/apk?id=

import fetch from 'node-fetch'
let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {

let limit = 4000

if (!text) throw `يمكنك تحميل التطبيقات والالعاب كما تشاء 😉 مثال :\n\n *.apkdl2 lite*`

try {
let ling = await fetch(`https://vihangayt.me/download/apk?id=${text}`)
let apkdl = await ling.json()
let apkname = `اسم التطبيق : ${apkdl.data.name}.apk`
let ukur = `${apkdl.data.size}`

if (ukur.split('MB')[0] >= limit)
return m.reply(`
${global.htki} *Bobiza Bot APK-DL* ${global.htka}

${global.htjava} *اسم التطبيق* : ${apkdl.data.name}
${global.htjava} *حجمه* : ${apkdl.data.size}

${global.htjava} _يتجاوز الملف حد التنزيل_ *+${limit} MB*`)

let detil = `
*اسم التطبيق:* ${apkdl.data.name}
*تاريخ النسخة:* ${apkdl.data.lastup}
*الباكيدج:* ${apkdl.data.package}
*حجمه:* ${apkdl.data.size}

_جاري ارسال التطبيق انتظر قليلا..._
`
let detil2 = `
*اسم التطبيق:* ${apkdl.data.name}.apk
*تاريخ النسخة:* ${apkdl.data.lastup}
*باكيدج:* ${apkdl.data.package}
*حجمه:* ${apkdl.data.size}
`

conn.sendMessage(m.chat, {text: detil,
contextInfo: {
forwardingScore: 9999,
isForwarded: true,
externalAdReply: {
title: ('APK Downloader'),
body: (`${apkdl.data.name}`),
thumbnailUrl: (`${apkdl.data.icon}`),
sourceUrl: (`https://play.google.com/store/apps/details?id=${apkdl.data.package}`),
mediaType: 1,
renderLargerThumbnail: false
}}},
{quoted: m})

await conn.sendFile(m.chat, apkdl.data.dllink, (`${apkdl.data.name} (bobiza Bot).apk`), detil2, m)

 }
 catch {
    m.reply('خطأ: حدث خطأ')
  }
}
handler.help = ['apkdl2']
handler.tags = ['applications']
handler.command = /^apkdl2$/i
handler.diamond = false
export default handler
