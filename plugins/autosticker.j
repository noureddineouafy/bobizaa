import {toAudio} from '../lib/converter.js';
const handler = async (m, {conn, usedPrefix, command}) => {
const q = m.quoted ? m.quoted : m;
const mime = (q || q.msg).mimetype || q.mediaType || '';
if (!/video|audio/.test(mime)) throw `*_قم بالإشارة👆 إلى المقطع🏞 الذي تود تحويله💫 لأوديو 🎧_*`;
const media = await q.download();
if (!media) throw '*[❗𝐈𝐍𝐅𝐎❗] 𝙻𝙾 𝙻𝙰𝙼𝙴𝙽𝚃𝙾, 𝙾𝙲𝚄𝚁𝚁𝙸𝙾 𝚄𝙽 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙳𝙴𝚂𝙲𝙰𝚁𝙶𝙰𝚁 𝚂𝚄 𝚅𝙸𝙳𝙴𝙾, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝚅𝚄𝙴𝙻𝚅𝙰 𝙰 𝙸𝙽𝚃𝙴𝙽𝚃𝙰𝚁𝙻𝙾*';
const audio = await toAudio(media, 'mp4');
if (!audio.data) throw '*[❗𝐈𝐍𝐅𝐎❗] 𝙻𝙾 𝙻𝙰𝙼𝙴𝙽𝚃𝙾, 𝙾𝙲𝚄𝚁𝚁𝙸𝙾 𝚄𝙽 𝙴𝚁𝚁𝙾𝚁 𝙰𝙻 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙸𝚁 𝚂𝚄 𝙽𝙾𝚃𝙰 𝙳𝙴 𝚅𝙾𝚉 𝙰 𝙰𝚄𝙳𝙸𝙾/𝙼𝙿𝟹, 𝙿𝙾𝚁 𝙵𝙰𝚅𝙾𝚁 𝚅𝚄𝙴𝙻𝚅𝙰 𝙰 𝙸𝙽𝚃𝙴𝙽𝚃𝙰𝚁𝙻𝙾*';
conn.sendMessage(m.chat, {audio: audio.data, mimetype: 'audio/mpeg'}, {quoted: m});
};
handler.alias = ['to', 'tos'];
handler.command = /^to$/i;
export default handler;
