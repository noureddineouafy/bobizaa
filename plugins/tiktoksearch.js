import { ttSearch } from '../lib/tiktoksearch.js'
let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    let input = `البحث عن فيديوهات في التيكتوك مثال \n\n${usedPrefix + command} free fire`
  if (!text) return m.reply(input)
 m.reply(wait)
ttSearch(text).then(a => {
let b = a.videos[`${num.getRandom()}`]
let cap = b.title
let result = 'https://tikwm.com/' + b.play
conn.sendMessage(m.chat, {video: {url: result}, caption: cap}, {quoted: m})
}).catch(err => {
m.reply('eror')
})
}
handler.help = ['tiktoksearch']
handler.tags = ['search']
handler.command=/^(tiktoksearch)$/i
export default handler

const num = ['0','1','2','3','4','5','6','7','8','9']