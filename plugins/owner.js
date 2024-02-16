import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
╭────────────────────
│👋 مرحبا يا , ${conn.getName(m.sender)}!
│*「 معلومات عن صاحب البوت✌️😳🌝 」*

*instagram:*
null

*youtube:*
youtube.com/@joAnimi1

*facebook page:*
null

*script bot :* null
╰────────────────────
*─[ BY NOUREDDINE_OUAFY ]*🌟✨
`.trim()
  m.reply(caption)
}
handler.help = ['owner']
handler.tags = ['infobot']
handler.command = /^(owner)$/i


export default handler
