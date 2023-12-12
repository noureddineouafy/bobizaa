import  fetch from 'node-fetch'
let handler = async (m, { conn, args }) => {
  let response = args.join(' ').split('|')
  if (!args[0]) throw 'مثال :\n*.lg5* bobiza'
  m.reply('_إنتظر..._')
  let res = `https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=${response[0]}`
  conn.sendFile(m.chat, res, 'bobiza.jpg', `instagram.com/noureddine_ouafy`, m, false)
}
handler.help = ['flaming5'].map(v => v + ' <text>')
handler.tags = ['maker','logo']
handler.command = /^(lg5)$/i
export default handler
