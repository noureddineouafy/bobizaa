import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw `ارسل صورة ثم أشر إليها واكتب هكذا \n.${command}`
  let loadd = [
 '《██▒▒▒▒▒▒▒▒▒▒▒》10%',
 '《████▒▒▒▒▒▒▒▒▒》30%',
 '《███████▒▒▒▒▒▒》50%',
 '《██████████▒▒▒》70%',
 '《█████████████》100%',
 '~_*BOBIZA-BOT*_~\n```انتظر قليلا.....```'
 ]

let { key } = await conn.sendMessage(m.chat, {text: '_انتظر قليلا..._'})//Pengalih isu

for (let i = 0; i < loadd.length; i++) {
await conn.sendMessage(m.chat, {text: loadd[i], edit: key })}
let media = await q.download()
let url = await uploadImage(media)
let hasil = await (await fetch(`https://api.lolhuman.xyz/api/deepfry?apikey=haikalgans&img=${url}`)).buffer()
await conn.sendFile(m.chat, hasil, '', 'instagram.com/noureddine_ouafy', m)
}
handler.help = ['deepfry']
handler.tags = ['maker']
handler.command = /^(deepfry)$/i


export default handler
