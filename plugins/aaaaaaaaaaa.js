import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
╭────────────────────
│👋 مرحبا يا , ${conn.getName(m.sender)}!
│🤖 أتمنى أنك بخير ♥ البوت أون لاين الآن 
يمكنك إستخدامه عبر كتابة menu.
before: `السلام عليكم 👋. 

┏━━ salam  *%name*
👥 *Total user:* %totalreg 
⏰ *Uptime:* %muptime  
┗━━━━━━━━━━⬣
%readmore
  ≡ *K I L L U A | M E N U*

  header: '┏━━⊜ *_%category_* ',
  body: '┃⋄ %cmd %isdiamond %isPremium',
  footer: '┗━━━━━━━━⬣\n',
  after: '*إستخدامك للبوت بشكل صحيح يعني أنك تزيد من إحتمالية أن يبقى البوت شغالا لمدة أطول . لذا إن واجهتك أي مشكلة لا تخجل من سؤال صاحب البوت .رقمه سوف تجده في الأسفل *\n+201008599375 واجه شكري ودعمي لاخي نور https://instagram.com/noureddine_ouafy',
  
╰────────────────────
*─[ BY [JoAnimi] ]*🌟✨
`.trim()
  m.reply(caption)
}

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
  
handler.help = ['test']
handler.tags = ['infobot']
handler.command = /^(test)$/i


export default handler
