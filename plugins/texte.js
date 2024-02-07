import fetch from 'node-fetch'
import { webp2png } from '../lib/webp2mp4.js'
let handler = async (m, { conn }) => {
let q = m.quoted ? m.quoted : m,
mime = (q || q.msg).mimetype || q.mediaType || ''
if (/image/.test(mime)) {
let url = await webp2png(await q.download()),
res = await fetch(API('https://api.ocr.space', '/parse/imageurl', { apikey: '8e65f273cd88957', url }))
if (res.status !== 200) throw res.statusText
let json = await res.json()
m.reply(json?.ParsedResults?.[0]?.ParsedText)
} else throw '*حذثت مشكلة راسل صاحب البوت وقل له ان هذه الميزة يجب عليك اصلاحها*\n instagram.com/noureddine_ouafy'
}
handler.command = /^texte$/i;
handler.help = ['texte']
handler.tags = ['tools']
export default handler
