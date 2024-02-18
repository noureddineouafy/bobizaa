import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'

 conn.sendMessage(m.chat, {
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
handler.help = ['menu']
handler.tags = ['infobot']
handler.command = ['menu','b','list'] 
handler.register = false

