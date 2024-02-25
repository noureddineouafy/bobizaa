import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
╭────────────────────
│👋 مرحبا يا , ${conn.getName(m.sender)}!
│🤖 أتمنى أنك بخير ♥ البوت أون لاين الآن 
يمكنك إستخدامه عبر كتابة menu.
╰────────────────────
*─[ BY [JoAnimi] ]*🌟✨
`.trim()
  m.reply(caption)
}

 await conn.sendMessage(m.chat, {
text: text,
contextInfo: {
externalAdReply: {
title: 'KILLUA BOT ♥',
body: "بوت من تحرير الاسطوره يوسف چو 💖",
thumbnailUrl: 'https://telegra.ph/file/e1f63555f0063389c9845.jpg',
sourceUrl: 'https://youtube.com/@JoAnimi1?si=3y1aUCmnTVzCVgIM',
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})

    /*conn.sendFile(m.chat, 'menu.png', text.trim(), m, null, )
    /*conn.sendButton(m.chat, text.trim(), '▢ DyLux  ┃ ᴮᴼᵀ\n▢ Sígueme en Instagram\nhttps://youtube.com/@JoAnimi1?si=3y1aUCmnTVzCVgIM', pp, [
      ['ꨄ︎ Apoyar', `${_p}donate`],
      ['⏍ Info', `${_p}botinfo`],
      ['⌬ Grupos', `${_p}gpdylux`]
    ],m, rpl)*/

  } catch (e) {
    conn.reply(m.chat, '❎ هناك خطأ في لائحة الاوامر', m)
    throw e
  }
}

handler.help = ['m']
handler.tags = ['infobot']
handler.command = /^(m)$/i


export default handler
