let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `اذا كنت تواجه مشكلة ما في البوت أو أن أحد الأوامر لا تعمل معك فاكتب  الامر متبوع بالمشكلة التي تعاني منها في البوت وسيتم تلبة طلبكم من طرف صاحب البوت سوف اعطيك مثال اكتب هكذا \n\n*.report* أرجوك ميزة تحميل الفيديوات لا تعمل معي هل من حل ? `
  if (text.length < 10) throw `يجب ان تكون الرسالة فيها اكثر من اربع كلمات `
  if (text.length > 1000) throw `الحد الادنى هو 1000 حرف اختر ما تريد قوله !`
  let teks = `*${command.toUpperCase()}!*\n\nfrom : *@${m.sender.split`@`[0]}*\n\nmessage : ${text}\n`
  conn.reply(global.nomorown + '@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
      contextInfo: {
          mentionedJid: [m.sender]
      }
  })
  m.reply(`_يتم إرسال الرسالة إلى صاحب البوت، ...  بمجرد ان يقرأ صاحب البوت هذه الرسالة سيتم الرد عليكم لا تقلقوا ._\n*انا بوبيزة رفيقتك♥*`)
}
handler.help = ['report']
handler.tags = ['infobot']
handler.command = /^(report)$/i
export default handler