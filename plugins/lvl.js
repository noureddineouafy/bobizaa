const fetch = require('node-fetch')
let handler = async (m, { text, usedPrefix, command }) => {
if (!text) throw `*[❗] اهلا انا شات جي بي تي *\n\n*—◉ مثال بوت اعطيني كود بايثون*\n*◉ ${usedPrefix + command} Reflexion sobre la serie Merlina 2022 de netflix*\n*◉ ${usedPrefix + command} Codigo en JS para un juego de cartas*`
try {
//m.reply('*[❗] 𝙴𝚂𝙿𝙴𝚁𝙴 𝚄𝙽 𝙼𝙾𝙼𝙴𝙽𝚃𝙾 𝙴𝙽 𝙻𝙾 𝚀𝚄𝙴 𝙼𝙰𝙽𝙳𝙾 𝙻𝙾 𝚀𝚄𝙴 𝙼𝙴 𝙿𝙸𝙳𝙸𝙾*')
await conn.sendPresenceUpdate('composing', m.chat)
let tiores = await fetch(`https://api.lolhuman.xyz/api/openai?apikey=${lolkeysapi}&text=${text}&user=user-unique-id`)
let hasil = await tiores.json()
m.reply(`${hasil.result}`.trim())
} catch {
throw `*[❗] خطأ لايوجد*`
}}
handler.command = ['openai', 'بوت', 'ia', 'robot']
module.exports = handler