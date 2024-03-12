import fetch from 'node-fetch';
import googleIt from 'google-it';

const handler = async (m, { conn, command, args }) => {
  const full = /f$/i.test(command);
  const text = args.join(' ');
  if (!text) throw `البحث في غوغل : \n\n*.google* سورة البقرة`;
  const url = 'https://google.com/search?q=' + encodeURIComponent(text);
  const search = await googleIt({ query: text });
  const msg = search.map(({ title, link, snippet }) => {
    return `*${title}*\n_${link}_\n_${snippet}_`;
  }).join('\n\n');
  try {
    const logos = `https://skizo.tech/api/ssweb?type=desktop&url=${url}&apikey=seika`;
    conn.sendFile(m.chat, logos, 'logos.jpg', url + '\n\n' + msg, m);
  } catch (e) {
    m.reply(msg);
  }
};

handler.help = ['google'];
handler.tags = ['search'];
handler.command = /^google?$/i;
export default handler;