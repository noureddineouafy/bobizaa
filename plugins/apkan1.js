import { sandroid1 } from '../lib/scrape.js'
import fetch from 'node-fetch'
let handler = async(m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, '\nهذا الامر خاص بالبحث عن التطبيقات في موقع https://an1.com/\n مثال:\n.apkan1 lite', m)

  await m.reply('جاري البحث...')
    let res = await sandroid1(text)
    let teks = res.data.map((v, index) => {
                    return v.judul + '\n⌚ dev: ' + v.dev + '\n⏲️ rating: ' + v.rating + '\n👁️ thumb: ' + v.thumb + '\n📎 link: ' + v.link
                }).filter(v => v).join("\n\n________________________\n\ninstagram.com/noureddine_ouafy")
                await m.reply(teks)
}
handler.help = ['apkan1']
handler.tags = ['applications']
handler.command = /^(apkan1)$/i
handler.owner = false
handler.premium = false
handler.exp = 0
handler.limit = false

export default handler
