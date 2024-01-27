import { createHash } from 'crypto'
import { canLevelUp, xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix, command}) => {

let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './Guru.jpg')
let user = global.db.data.users[who]
let about = (await conn.fetchStatus(who).catch(console.error) || {}).status || ''
let { name, exp, credit, lastclaim, registered, regTime, age, level, role, wealth, warn } = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)
let math = max - xp 
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')

// • @${who.replace(/@.+/, '')}
let str = `*🪪 Name:* ${username}${about ? '\n\n 🎌 *Bio:* ' + about : ''}

*💴 النقود :* ${credit}
*⬆️ اكس بي* : Total ${exp} (${user.exp - min} / ${xp})\n${math <= 0 ? `Ready for *${usedPrefix}مستوى أعلى*` : `*${math}xp* في عداد المفقودين لرفع المستوى`}

*🏆 رتبة:* ${role}

*📇 مسجل :* ${registered ? 'Yes': 'No'}

*⭐ مميز* : ${prem ? 'Yes' : 'No'}
`
    conn.sendFile(m.chat, pp, 'profil.jpg', str, m, false, { mentions: [who] })
    m.react(🧨)

}
handler.help = ['profile']
handler.tags = ['group']
handler.command = ['profile'] 

export default handler
