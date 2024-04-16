import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
//import { plugins } from '../lib/plugins.js'
let tags = {
  '🅼🅾🆁🅾🅲🅲🅾':' ‎أﯛآمر للمغآربة',
  '🅰🅿🅿🅻🅸🅲🅰🆃🅸🅾🅽🆂':'‎ أﯛآمر آلتطبيقآت‎',
  '🅳🆁🅰🆆🅸🅽🅶':'‎ تﯛليد آلصﯛر‎ أﯛآمر' ,
  '🅰🅸':'‎ آلذڪآء آلآصطنآعي‎ أﯛآمر',
  '🅸🅽🅵🅾🅱🅾🆃':'‎ معلﯛمآت آلبﯛت‎',
  '🅳🅾🆆🅽🅻🅾🅰🅳🅴🆁':'‎ أﯛآمر آلتحميلآت',
  '🅰🅽🅸🅼🅴':'‎ أﯛآمر عن آلأنيم',
  '🅸🆂🅻🅰🅼':'‎ آلدين ۿﯛ آلآسلآم‎',
  '🅾🆆🅽🅴🆁':'‎ آﯛآمر صآحب آلبﯛت',
  '🆂🅴🅰🆁🅲🅷':'‎ أﯛآمر آلبحث',
  '🅰🆄🅳🅸🅾-🅲🅷🅰🅽🅶🅴🆁':'‎ تعديل آلصﯛتيآت‎',
  '🆂🆃🅸🅲🅺🅴🆁':'‎ أﯛآمر آلملصقآت',
  '🅸🅼🅰🅶🅴-🅴🅳🅸🆃':'‎ تعديل آلصﯛر',
  '🅿🅳🅵':'‎ 🅿🅳🅵 ﯛمشتقآتۿ‎',
  ''🆄🅿🅻🅾🅰🅳🅴🆁':'‌‎ رفع آلملفآت‎',
}
const defaultMenu = {
  before: `ال̷س̷ل̷ام̷ ع̷ٍل̷ي̷گ̷م̷ 👋. 

┏━━ 🆂🅰🅻🅰🅼  *%name*
👥 *🆃🅾🆃🅰🅻 🆄🆂🅴🆁:* %totalreg 
⏰ *🆄🅿🆃🅸🅼🅴:* %muptime  
┗━━━━━━━━━━⬣
%readmore
  ≡ *ᗷ O ᗷ I ᘔ ᗩ | ᗰ E ᑎ ᑌ*
`.trimStart(),
  header: '┏━━⊜ *_%category_* ',
  body: '┃⋄ %cmd %isdiamond %isPremium',
  footer: '┗━━━━━━━━⬣\n',
  after: '*إستخدامك للبوت بشكل صحيح يعني أنك تزيد من إحتمالية أن يبقى البوت شغالا لمدة أطول . لذا إن واجهتك أي مشكلة لا تخجل من سؤال صاحب البوت .رقمه سوف تجده في الأسفل + شارك البوت ان كان هذا البوت قد نال إعجابك*\n+212614998730',
}
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
title: '𝔹𝕆𝔹𝕀ℤ𝔸 𝔹𝕆𝕋 💖',
body: "𝐃𝐄𝐕: 𝐁𝐈𝐋𝐀𝐋 𝐌𝐎𝐔𝐁𝐀𝐑𝐄𝐊 𖣐💚",
thumbnailUrl: 'https://i.top4top.io/p_3022p8c8h1.jpg',
sourceUrl: 'https://instagram.com/127.0.0.1_8888',
mediaType: 1,
renderLargerThumbnail: true
}}}, { quoted: m})
conn.sendMessage(m.chat, {audio: { url: 'https://files.catbox.moe/5e9fvz.mp4'}, mimetype:'audio/mpeg', ptt:true }, {quoted:m})
    /*conn.sendFile(m.chat, 'menu.png', text.trim(), m, null, )
    /*conn.sendButton(m.chat, text.trim(), '▢ DyLux  ┃ ᴮᴼᵀ\n▢ Sígueme en Instagram\nhttps://www.instagram.com/fg98_ff', pp, [
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
