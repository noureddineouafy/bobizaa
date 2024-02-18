import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
//import { plugins } from '../lib/plugins.js'
let tags = {
  'uploader':'‎‎ رفع الملفات‎',
}
const defaultMenu = {
  before: `السلام عليكم 👋. 

┏━━ salam  *%name*
👥 *Total user:* %totalreg 
⏰ *Uptime:* %muptime  
┗━━━━━━━━━━⬣

⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
*☰ وامـر البـوت↯°*
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
           ⩥🧎🏽‍♂️│ALLAH│🕋⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟🧎🏽‍♂️❯ .adan
│✮ ⃟📖❯ .coran
│✮ ⃟📺❯ .bader
│✮ ⃟📿❯ .asmaeallah
│✮ ⃟📄❯ .ayati
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
           ⩥🌐│Administrator│👨🏻‍💻⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟🚫❯ .ban
│✮ ⃟⭕❯ .unban
│✮ ⃟➕❯ .tostatus
│✮ ⃟📧❯ .tagall
│✮ ⃟👽❯ .hidetag
│✮ ⃟👨🏽‍✈️❯ .setgroupname
│✮ ⃟♻️❯ .restart
│✮ ⃟🗑️❯ .cleartmp
│✮ ⃟🪀❯ .creategroup
│✮ ⃟📰❯ .modules
│✮ ⃟📇❯ .listonline
│✮ ⃟📢❯ .setbio 
│✮ ⃟↗️❯ .addowner 
│✮ ⃟↘️❯ .delowner
│✮ ⃟📝❯ .setbotname 
│✮ ⃟🗒️❯ .setdesc 
│✮ ⃟📸❯ .setpp
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
          ⩥⚙️│Sticker│🧰⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟🎈❯ .sticker
│✮ ⃟😂❯ .bobiz
│✮ ⃟📝❯ .attp
│✮ ⃟💀❯ .wasted
│✮ ⃟©️❯ .wm
│✮ ⃟🏞️❯ .toimg
│✮ ⃟🎞️❯ .tovideo
│✮ ⃟🎞️❯ .stickervideo
│✮ ⃟🔗❯ .smeme
│✮ ⃟🌠❯ .quotly
│✮ ⃟🌠❯.quotlyv2
│✮ ⃟🌠❯ .quotlyv3
│✮ ⃟🌠❯ .quotlyimg
│✮ ⃟🌠❯ .quotlyimgv2
│✮ ⃟🌠❯ .quotlyimgv3
│✮ ⃟🎭❯ .smeta
│✮ ⃟🎐❯ .srbg
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
           ⩥⚙️│Make img AI│🏞️⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟🏞️❯ .animediff
│✮ ⃟🏞️❯ .animediff2
│✮ ⃟🏞️❯ .bingcreate
│✮ ⃟🏞️❯ .bimg
│✮ ⃟🏞️❯ .dalle
│✮ ⃟🏞️❯ .dalle3
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
           ⩥⚙️│Tools│🧮⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟💬❯ .tts
│✮ ⃟👀❯ .tovn
│✮ ⃟🌎❯ .ssweb
│✮ ⃟⚰️❯ .sleep
│✮ ⃟🎞️❯ .short
│✮ ⃟📡❯ .readqr
│✮ ⃟🕯️❯ .ocr
│✮ ⃟⚙️❯ .get
│✮ ⃟🔮❯ .dns
│✮ ⃟🧉❯ .coffee
│✮ ⃟🎪❯ .tomp3
│✮ ⃟✨❯ .stories
│✮ ⃟🌠❯ .hd
│✮ ⃟✍🏻❯ .styletext
│✮ ⃟🎟️❯ .qrcode
│✮ ⃟🏹❯ .tarjim
│✮ ⃟🏹❯ .translate
│✮ ⃟☁️❯ .climate
│✮ ⃟〰️❯ .lyrics 
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
          ⩥📱│Apps│🌐⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟📱❯ .apk
│✮ ⃟📱❯ .apk2
│✮ ⃟📱❯ .apkcafe
│✮ ⃟📱❯ .apkmirror
│✮ ⃟📱❯ .uapkpro
│✮ ⃟🌐❯ .uptodown
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
          ⩥🎙️│Effects│📽️⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟🎙️❯ .bass
│✮ ⃟🎙️❯ .blown
│✮ ⃟🎙️❯ .deep
│✮ ⃟🎙️❯ .earrape
│✮ ⃟🎙️❯ .fast
│✮ ⃟🎙️❯ .fat
│✮ ⃟🎙️❯ .nightcore
│✮ ⃟🎙️❯ .reverse
│✮ ⃟🎙️❯ .robot
│✮ ⃟🎙️❯ .slow
│✮ ⃟🎙️❯ .smooth
│✮ ⃟🎙️❯ .tupai
│✮ ⃟🎙️❯ .streame
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
           ⩥⚙️│Search│📊⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟🔍❯ .spotifysearch
│✮ ⃟🔍❯ .wiki
│✮ ⃟🔍❯ .yts
│✮ ⃟🔍❯ .yttags
│✮ ⃟🖨️❯ .udemy
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
     ⩥🏞️│Image│📹⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟📹❯ .dehaze
│✮ ⃟🎴❯ .blur
│✮ ⃟🌠❯ .remini
│✮ ⃟🌠❯ .hd
│✮ ⃟🌠❯ .recolor
│✮ ⃟🙋🏻‍♂️❯ .tocartoon
│✮ ⃟🙋🏻‍♂️❯ .toanime2
│✮ ⃟🧟‍♂️❯ .zombie
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
     ⩥🏞️│ChatAI│📹⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟🤖❯ .aipilot
│✮ ⃟🤖❯ .bardai
│✮ ⃟🤖❯ .chatgbt
│✮ ⃟🤖❯ .chawnyma
│✮ ⃟🤖❯ .dx
│✮ ⃟🤖❯ .gemini
│✮ ⃟🤖❯ .gemini2
│✮ ⃟🤖❯ .gpt2
│✮ ⃟🤖❯ .wordle
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
           ⩥⚙️│Anime│📊⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟👲🏻❯ .dragon-ball-z
│✮ ⃟👲🏻❯ .hunter
│✮ ⃟👲🏻❯ .jujutsu
│✮ ⃟👲🏻❯ .luffy
│✮ ⃟👲🏻❯ .animepic
│✮ ⃟👲🏻❯ .animestory
│✮ ⃟👲🏻❯ .chainsaw-man
│✮ ⃟👲🏻❯ .classroom-ote
│✮ ⃟👲🏻❯ .manga
│✮ ⃟👲🏻❯ .reels
│✮ ⃟👲🏻❯ .ppcouple
│✮ ⃟👲🏻❯ .tofanime
│✮ ⃟👲🏻❯ .resvcouple
│✮ ⃟👲🏻❯ .stories
│✮ ⃟👲🏻❯ .trace
│✮ ⃟👲🏻❯ .waifu
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
           ⩥⚙️│Downloads│📊⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟🐱❯ .capcut
│✮ ⃟✒️❯  .dafonts
│✮ ⃟📬❯  .dlpanda
│✮ ⃟📧❯  .facebook3
│✮ ⃟📧❯  .facebook4
│✮ ⃟📧❯  .facebook5
│✮ ⃟📩❯  .gdrive2
│✮ ⃟🪄❯  .igdl
│✮ ⃟🖼️❯  .image
│✮ ⃟🗃️❯  .instagram
│✮ ⃟🪩❯  .mediafire1
│✮ ⃟📌❯  .pin
│✮ ⃟📸❯  .pinterest
│✮ ⃟📸❯  .pinterest2
│✮ ⃟📸❯  .pinterest3
│✮ ⃟📷❯  .pixellab
│✮ ⃟📲❯  .snapsave
│✮ ⃟🎼❯  .song
│✮ ⃟🎬❯  .storyset
│✮ ⃟🥌❯  .tt
│✮ ⃟🐤❯  .twitter
│✮ ⃟🐾❯  .unsplash
│✮ ⃟📺❯  .video
│✮ ⃟🖼️❯  .wallpaper
│✮ ⃟🎬❯  .youtube
│✮ ⃟📃❯  .ytdoc
│✮ ⃟🎬❯  .ytmp4
│✮ ⃟🎬❯  .ytvdoc
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
           ⩥📌│Logo│📌⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟📝❯ .brandcrowd
│✮ ⃟📝❯ .glass
│✮ ⃟📝❯ .haryypotter
│✮ ⃟📝❯ .illuminated
│✮ ⃟📝❯ .logo-naruto
│✮ ⃟📝❯ .pubg
│✮ ⃟📝❯ .pubg2
│✮ ⃟📝❯ .sweetcandy
│✮ ⃟📝❯ .ttlogo
│✮ ⃟📝❯ .tweet
│✮ ⃟📝❯ .tweettrump
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
           ⩥📌│PDF│📌⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟📜❯ .bookslib
│✮ ⃟📜❯ .texttopdf
│✮ ⃟📜❯ .topdf
│✮ ⃟📜❯ .urltopdf
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
           ⩥📌│Moroco│📌⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟❗❯ .1bac
│✮ ⃟❗❯ .1collège
│✮ ⃟❗❯ .2bac
│✮ ⃟❗❯ .2collège
│✮ ⃟❗❯ .3collège
│✮ ⃟❗❯ .alloschool
│✮ ⃟❗❯ .raqamitv
│✮⃟❗❯ .tce
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
           ⩥📌│Upload│📌⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟🪩❯ .tourl
│✮ ⃟🪩❯ .top4top
│✮ ⃟🪩❯ .cleandx
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
           ⩥📌│Members│📌⩤
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
│✮ ⃟👨🏻‍💻❯ .owner
│✮ ⃟✴️❯ .menu
│✮ ⃟📍❯ .channel
│✮ ⃟🔖❯ .alive
│✮ ⃟🍁❯ .owner 
│✮ ⃟🚀❯ .ping
│✮ ⃟👾❯ .runtime
│✮ ⃟👾❯ .feature
│✮ ⃟👾❯ .tz
⟣┈┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈┈┈⟢
%readmore
  ≡ *K I L L U A | M E N U*
`.trimStart(),
  header: '┏━━⊜ *_%category_* ',
  body: '┃⋄ %cmd %isdiamond %isPremium',
  footer: '┗━━━━━━━━⬣\n',
  after: '*إستخدامك للبوت بشكل صحيح يعني أنك تزيد من إحتمالية أن يبقى البوت شغالا لمدة أطول . لذا إن واجهتك أي مشكلة لا تخجل من سؤال صاحب البوت .رقمه سوف تجده في الأسفل *\n+201008599375 واجه شكري ودعمي لاخي نور https://instagram.com/noureddine_ouafy',
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
