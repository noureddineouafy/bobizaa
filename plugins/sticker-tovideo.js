import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png, webp2mp4} from '../lib/webp2mp4.js'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'
import { ffmpeg } from '../lib/converter.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
let stiker = false
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!m.quoted) throw `المرجو الاشارة للملصق المتحرك الذي تريد تحويله لفيديو`

    let img = await q.download?.()
    let stek = new Sticker(img, { pack: packname, author: author, type: StickerTypes.FULL })
    let buffer = await stek.toBuffer()
    let out
      try {
        if (/webp/g.test(mime)) out = await webp2mp4(img)
        else if (/image/g.test(mime)) out = await uploadImage(img)
        else if (/video/g.test(mime)) out = await uploadFile(img)
        else if (/audio/g.test(mime)) out = await ffmpeg(media, [
            '-filter_complex', 'color',
            '-pix_fmt', 'yuv420p',
            '-crf', '51',
            '-c:a', 'copy',
            '-shortest'
        ], 'mp3', 'mp4')
        if (typeof out !== 'string') out = await uploadImage(img)
        else if (/gif/g.test(mime)) out = stek
      } catch (e) {
        throw eror
      }
     await conn.sendFile(m.chat, out, 'tovid.mp4', 'تم عملية تحويل الملصق لفيديو بنجاح \n تابعني في الانستغرام\ninstagram.com/noureddine_ouafy' , m)
}
//lo mau apa??
handler.help = ['tovideo']
handler.tags = ['sticker']
handler.command = /^tovideo$/i

export default handler
