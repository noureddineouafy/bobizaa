import { GDriveDl } from '../lib/scrape.js'

let handler = async (m, { conn, args }) => {
  if (!(args[0] || '').match(/([\w-]){33}|([\w-]){19}/)) throw '*التحميل من منصة غوغل درايف يكفي ان تكتب الامر متبوع برابط من المنصة مثال :*\n\n*.gdrive2* https://drive.google.com/u/0/uc?id=1-XxkNNYHEvKlbPMEMNbgEBg6tgKEC8bO&export=download'

  const someincludes = ( data, id ) => {
        let res = data.find(el => id.includes(el) )
        return res ? true : false;
    }

  try {
    let res = await GDriveDl(args[0])
    if (res.fileSize.slice(-2) == "GB") return m.reply(`لا تقلق.\nأين يمكنني إرسال مقطع فيديو ${res.fileSize}`)
    if (!someincludes(['kB','KB'], res.fileSize.slice(-2)) && parseInt(res.fileSize) > 100) return m.reply(`حجم الملف: ${res.fileSize}\nغير قادر على الإرسال، الحد الأقصى للملف هو 100 ميجابايت`)
    let txt = `*[ جاري التحميل ]*\n\n`
    txt += `*الاسم :* ${res.fileName}\n`
    txt += `*الحجم :* ${res.fileSize}\n`
    txt += `*نوع الملف :* ${res.mimetype}`
    await m.reply(txt)
    if (!res.downloadUrl) throw eror
    await conn.sendFile(m.chat, res.downloadUrl, res.fileName + res.mimetype, res.fileName + res.mimetype, m)
  } catch (e) {
    console.log(e)
    throw '*ليس لدى الروبوتات إمكانية الوصول إلى GoogleDrive هذا*'
  }
}

handler.help = ['gdrive2']
handler.tags = ['downloader']
handler.command = /^(gdrive2)$/i


export default handler