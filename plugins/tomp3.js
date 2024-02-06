import {toAudio} from '../lib/converter.js';
const handler = async (m, {conn, usedPrefix, command}) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q || q.msg).mimetype || q.mediaType || '';
  if (!/video|audio/.test(mime)) throw `*هذا الامر خاص بتحويل مقطع فيديو لموسيقى*`;
  const media = await q.download();
  if (!media) throw '*تأكد انك قمت بارسال فيديو وتأكد انك كتبت \n.tomp3*';
  const audio = await toAudio(media, 'mp4');
  if (!audio.data) throw '*حذث خطأ راسل صاحب البوت*';
  conn.sendMessage(m.chat, {audio: audio.data, mimetype: 'audio/mpeg'}, {quoted: m});
};
;
handler.help = ["tomp3"]
handler.tags = ["tools"]
handler.command = /^(tomp3)$/i
export default handler;
