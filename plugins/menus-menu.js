import fetch from 'node-fetch';
const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  try {
    const pp = imagen4;
    // let vn = './media/menu.mp3'
    const img = './Menu2.jpg';
    const d = new Date(new Date + 3600000);
    const locale = 'es-ES';
    const week = d.toLocaleDateString(locale, {weekday: 'long'});
    const date = d.toLocaleDateString(locale, {day: '2-digit', month: '2-digit', year: 'numeric'});
    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
    const user = global.db.data.users[m.sender];
    const {money, joincount} = global.db.data.users[m.sender];
    const {exp, limit, level, role} = global.db.data.users[m.sender];
    const rtotalreg = Object.values(global.db.data.users).filter((user) => user.registered == true).length;
    const rtotal = Object.entries(global.db.data.users).length || '0'
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
    const doc = ['pdf', 'zip', 'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const document = doc[Math.floor(Math.random() * doc.length)];
    const str = `JOHAN-BOT

 ▢ *مرحبا,* ${taguser}

 _*< إحصائياتك />*_

 ▢ *مستوى:* ${level}
 ▢ *خبرة:* ${exp}
 ▢ *يتراوح:* ${role}
 ▢ *الماس:* ${limit}
 ▢ *JOHAN-COINS:* ${money}
 ▢ *الرموز:* ${joincount}
 ▢ *Premium:* ${user.premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌') || ''}
 ${readMore}

_☠︎︎☠︎︎━━ │الـجـروب│━━☠︎︎☠︎︎_

*✓ ✍︎☫ ✓│ضيف* 
*✓ ✍︎☫ ✓│طرد*
*✓ ✍︎☫ ✓│ترقية*
*✓ ✍︎☫ ✓│اعفاء*
*✓ ✍︎☫ ✓│تحذير*
*✓ ✍︎☫ ✓│حذف_تحذير*
*✓ ✍︎☫ ✓│حذف*
*✓ ✍︎☫ ✓│منشن*
*✓ ✍︎☫ ✓│مخفي*
*✓ ✍︎☫ ✓│المشرفين*
*✓ ✍︎☫ ✓│لمنشن*
*✓ ✍︎☫ ✓│بروفايل*
*✓ ✍︎☫ ✓│الجروب*
*✓ ✍︎☫ ✓│دعوه*
*✓ ✍︎☫ ✓│تغيير_اللينك*
*✓ ✍︎☫ ✓│لفل*
*✓ ✍︎☫ ✓│جروب*
*✓ ✍︎☫ ✓│الترحيب*
*✓ ✍︎☫ ✓│المغادره*
*✓ ✍︎☫ ✓│ايات*
*✓ ✍︎☫ ✓│جروب قفل  فتح*
*✓ ✍︎☫ ✓│خط*
*✓ ✍︎☫ ✓│توب*
*✓ ✍︎☫ ✓│لينك*
*✓ ✍︎☫ ✓│يومي*
*✓ ✍︎☫ ✓│الماس*
*✓ ✍︎☫ ✓│ترتيب_البنك*
*✓ ✍︎☫ ✓│شراء*
*✓ ✍︎☫ ✓│هجوم*

_🂱✓ ━━│الدين│━━✓🂱_

*✓ ✍︎☫ ✓│سورة*
*✓ ✍︎☫ ✓│حديث*
*✓ ✍︎☫ ✓│قران*
*✓ ✍︎☫ ✓│الله*

_🂱✓ ━━│الـمطـور فـقط│━━✓🂱_

*✓ ✍︎☫ ✓│ضيف_بريميام*
*✓ ✍︎☫ ✓│حذف_بريميام*
*✓ ✍︎☫ ✓│بان*
*✓ ✍︎☫ ✓│الغاء_البان*
*✓ ✍︎☫ ✓│اطفاء*
*✓ ✍︎☫ ✓│تفعيل*
*✓ ✍︎☫ ✓│المبندين*
*✓ ✍︎☫ ✓│إعادة*
*✓ ✍︎☫ ✓│اعادةتشغيل*
*✓ ✍︎☫ ✓│أدخل*
*✓ ✍︎☫ ✓│ضيف_اكس_بي*
*✓ ✍︎☫ ✓│ضيف_جواهر*

_✓⬇️✯ ━━│الـتـنزيـل│━━✯⬇️✓_

*✓ ✍︎☫ ✓│انستغرام*
*✓ ✍︎☫ ✓│انستا*
*✓ ✍︎☫ ✓│شغل*
*✓ ✍︎☫ ✓│تيكتوك*
*✓ ✍︎☫ ✓│تويتر*
*✓ ✍︎☫ ✓│اغنية*
*✓ ✍︎☫ ✓│بحث*
*✓ ✍︎☫ ✓│فيديو*
*✓ ✍︎☫ ✓│تطبيق*
*✓ ✍︎☫ ✓│صوره*


_✓🎮✘ ━━│الـــتـرفــيـه│━━✘🎮✓_


*✓ ✍︎☫ ✓│اكس او*
*✓ ✍︎☫ ✓│كت*
*✓ ✍︎☫ ✓│صراحه*
*✓ ✍︎☫ ✓│لو*
*✓ ✍︎☫ ✓│هل*
*✓ ✍︎☫ ✓│ترجم*
*✓ ✍︎☫ ✓│احزر*
*✓ ✍︎☫ ✓│زواج*
*✓ ✍︎☫ ✓│انطق*
*✓ ✍︎☫ ✓│تاج*
*✓ ✍︎☫ ✓│حكمه*
*✓ ✍︎☫ ✓│ميمز*
*✓ ✍︎☫ ✓│سوال*

_✓✠━━│الـتحـويل│━━✠✓_

*✓ ✍︎☫ ✓│ملصق*
*✓ ✍︎☫ ✓│سرقة*
*✓ ✍︎☫ ✓│لفيديو*
*✓ ✍︎☫ ✓│لصورة*
*✓ ✍︎☫ ✓│لانمي*
*✓ ✍︎☫ ✓│تخيل*
*✓ ✍︎☫ ✓│مكس*
*✓ ✍︎☫ ✓│لجواهر*
*✓ ✍︎☫ ✓│ستك*
*✓ ✍︎☫ ✓│تلجراف*
*✓ ✍︎☫ ✓│لكرتون*
*✓ ✍︎☫ ✓│باركود*

_✓❏━━│الـصوتـيات│━━❏✓_

*✓ ✍︎☫ ✓│عميق*
*✓ ✍︎☫ ✓│منفوخ*
*✓ ✍︎☫ ✓│تخين*
*✓ ✍︎☫ ✓│صاخب*
*✓ ✍︎☫ ✓│سريع*
*✓ ✍︎☫ ✓│تخينن*
*✓ ✍︎☫ ✓│رفيع*
*✓ ✍︎☫ ✓│روبوت*
*✓ ✍︎☫ ✓│بطيء*
*✓ ✍︎☫ ✓│ناعم*
*✓ ✍︎☫ ✓│سنجاب*

👑┑━━━حـقـوق الـمـطـور━━━┍👑
*❗⇆ رقـم الـمطـور  ↯*
❗ https://wa.me/+22247072475
👑┙━━━حـقـوق الـمـطـور━━━┕👑`.trim();
    if (m.isGroup) {
      // await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
      const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
      conn.sendMessage(m.chat, {image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: m});
    } else {
      // await conn.sendFile(m.chat, vn, 'menu.mp3', null, m, true, { type: 'audioMessage', ptt: true})
      const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
      conn.sendMessage(m.chat, {image: pp, caption: str.trim(), mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: fkontak2});
    }
  } catch {
    conn.reply(m.chat, '*[ ℹ️ ]تحتوي هذه القائمة على خطأ داخلي، ولهذا السبب لم يكن من الممكن إرسالها.*', m);
  }
};
handler.command = /^(menu|الاوامر|memu|memú|اوامر|info|comandos|allmenu|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
handler.exp = 50;
handler.fail = null;
export default handler;
function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
