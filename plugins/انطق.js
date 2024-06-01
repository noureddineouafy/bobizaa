import { Readable } from 'stream';
import { gtts } from 'node-gtts';

let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('من فضلك، قم بإدخال النص الذي تريد نطقه.');
  
  let text = args.join(' ');
  let stream = await tts(text);
  
  conn.sendMessage(m.chat, stream, 'audio/mpeg', null, m);
};

handler.help = ['tts <النص>'];
handler.tags = ['tools'];
handler.command = ['tts', 'انطق'];

export default handler;

function tts(text, lang = 'ar') {
  return new Promise((resolve, reject) => {
    try {
      let gttsStream = gtts(text, lang);
      let bufferStream = new Readable();
      bufferStream._read = () => {};
      gttsStream.pipe(bufferStream);
      resolve(bufferStream);
    } catch (e) {
      reject(e);
    }
  });
}
