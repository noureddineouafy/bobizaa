import { canLevelUp, xpRange } from '../lib/levelling.js';

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender);
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.imgur.com/whjlJSf.jpg');
    let user = global.db.data.users[m.sender];
    let background = 'https://i.ibb.co/4YBNyvP/images-76.jpg'; // Fixed background URL

    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier);
        let txt = `
┌───⊷ *مستوى*
▢ رقم : *${name}*
▢ مستوى : *${user.level}*
▢ اكس بي : *${user.exp - min}/${xp}*
▢ دور : *${user.role}*
└──────────────

مرحبًا يا من هناك, ${name}! أنت لست مستعدًا للارتقاء بالمستوى بعد. يبدو أنك بحاجة إلى تناول الطعام *${max - user.exp}* المزيد من XP للارتقاء بالمستوى والوصول إلى آفاق جديدة! استمر، وسوف تغني الروبوتات مديحك قريبًا! 🚀
`.trim();

        try {
            let imgg = `https://wecomeapi.onrender.com/rankup-image?username=${encodeURIComponent(name)}&currxp=${user.exp - min}&needxp=${xp}&level=${user.level}&rank=${encodeURIComponent(pp)}&avatar=${encodeURIComponent(pp)}&background=${encodeURIComponent(background)}`;
            conn.sendFile(m.chat, imgg, 'level.jpg', txt, m);
        } catch (e) {
            m.reply(txt);
        }
    } else {
        let str = `
┌─⊷ *المستوى الأعلى*
▢ المستوى السابق : *${user.level - 1}*
▢ المستوى الحالي : *${user.level}*
▢ دور : *${user.role}*
└──────────────

وو-هو، ${name}! لقد ارتقت إلى آفاق جديدة ووصلت إلى المستوى ${user.level}! 🎉 حان الوقت للاحتفال! 🎊
ستبث قوتك المكتشفة حديثًا الخوف في قلوب المتصيدين، وسوف تنحني الروبوتات أمام أوامرك! واصل العمل المذهل، ومن يدري ما هي المغامرات الملحمية التي تنتظرك بعد ذلك! 🌟
`.trim();

        try {
            let img = `https://wecomeapi.onrender.com/levelup-image?avatar=${encodeURIComponent(pp)}`;
            conn.sendFile(m.chat, img, 'levelup.jpg', str, m);
        } catch (e) {
            m.reply(str);
        }
    }
}

handler.help = ['levelup'];
handler.tags = ['economy'];
handler.command = ['رانك', 'levelup', 'لفل'];

export default handler
