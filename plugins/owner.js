import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
╭────────────────────
│👋 مرحبا يا , ${conn.getName(m.sender)}!
│*「 معلومات عن صاحب البوت✌️😳🌝 」*

*His Official Number:*
+201008599375

*youtube:*
youtube.com/@joAnimi1

*facebook page:*
ابحث انت عنو اصل هوا أشهر من الميه على العلم (-'_'-)

╰────────────────────
*─[ BY JoAnimi]*🌟✨
`.trim()
  m.reply(caption)
}
handler.help = ['owner']
handler.tags = ['infobot']
handler.command = /^(owner)$/i


export default handler
