import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
//import { plugins } from '../lib/plugins.js'
let tags = {
  'morocco':'🦄Ö𝗿Ðê𝗿§ †𝗵ê †ê¢𝗵-𝗚ðÐ (𝟮.𝟬)🍁',
  'applications':'‎🦄𝐀𝐩𝐩𝐥𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐂𝐨𝐦𝐚𝐧𝐝𝐬🍁',
  'drawing':'‎🦄𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞𝐝 𝐢𝐦𝐚𝐠𝐞 𝐂𝐨𝐦𝐚𝐧𝐝𝐬🍁' ,
  'ai':'*‎<<(𝗔.𝗶)🙈𝗖𝗼𝗺𝗮𝗻𝗱𝘀>> *',
  'infobot':'‎ معلومات البوت‎',
  'downloader':'‎ أوامر التحميلات',
  'anime':'‎ أوامر عن  الأنيم',
  'islam':'‎ الدين هو الاسلام‎',
  'owner':'‎ اوامر صاحب البوت',
  'search':'‎ أوامر البحث',
  'audio-changer':'‎ تعديل الصوتيات‎',
  'sticker':'‎ أوامر الملصقات',
  'image-edit':'‎ تعديل الصور',
  'pdf':'‎ pdf ومشتقاته‎',
  'uploader':'‎‎ رفع الملفات‎',
}
const defaultMenu = {
  before: ` 𝙏𝙀𝘾𝙃-𝙂𝙊𝘿 (𝟮.𝟬) 👋. 

┏━━ Welcome  *%name*
👥 *Total user:* %totalreg 
⏰ *Uptime:* %muptime  
┗━━━━━━━━━━⬣
%readmore
  ≡ *𝙏𝙀𝘾𝙃-𝙂𝙊𝘿 (𝟮.𝟬) | M E N U*
`.trimStart(),
  header: '┏━━⊜ *_%category_* ',
  body: '┃⋄ %cmd %isdiamond %isPremium',
  footer: '┗━━━━━━━━⬣\n',
  after: '*𝐎𝐖𝐍𝐄𝐑_𝐍𝐀𝐌𝐄 :-🦄𝙏𝙀𝘾𝙃-𝙂𝙊𝘿 (𝟮.𝟬)🍁*\🦄𝐎𝐖𝐍𝐄𝐑_𝐍𝐔𝐌𝐁𝐄𝐑🍁 :-*+919883457657*',}
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, diamond, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'ar'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        diamond: plugin.diamond,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isdiamond/g, menu.diamond ? '(Ⓛ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, diamond, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

 conn.sendMessage(m.chat, {
text: text,
contextInfo: {
externalAdReply: {
title: '🦄𝙏𝙀𝘾𝙃-𝙂𝙊𝘿 (𝟮.𝟬)🍁',
body: "🎀𝐇ᴇʏ  𝐁ᴀʙᴇ 𝐂ᴏᴍᴇ 𝐓ᴏ 𝐌ʏ 𝐋ɪғᴇ🌸🍃",
thumbnailUrl: 'https://graph.org/file/cd8c9e76e31407d0f2764.jpg',
sourceUrl: 'https://wa.me/919883457657?text=𝑯𝒆𝒍𝒍𝒐  𝑩𝒓𝒐...𝑰 𝑨𝒎 𝒀𝒐𝒖𝒓 𝑩𝒊𝒈 𝑭𝒂𝒏 ❤️✨',
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})

    /*conn.sendFile(m.chat, 'menu.png', text.trim(), m, null, )
    /*conn.sendButton(m.chat, text.trim(), '▢ DyLux  ┃ ᴮᴼᵀ\n▢ Sígueme en Instagram\nhttps://www.instagram.com/fg98_ff', pp, [
      ['ꨄ︎ Apoyar', `${_p}donate`],
      ['⏍ Info', `${_p}botinfo`],
      ['⌬ Grupos', `${_p}gpdylux`]
    ],m, rpl)*/

  } catch (e) {
    conn.reply(m.chat, '❎There is an error in the command list', m)
    throw e
  }
}
handler.help = ['menu']
handler.tags = ['infobot']
handler.command = ['menu','b','list'] 
handler.register = false


export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, 'd ', h, 'h ', m, 'm '].map(v => v.toString().padStart(2, 0)).join('')
}
