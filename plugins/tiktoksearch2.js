import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `البحث في التيك توك مثال :\n\n*${usedPrefix + command} المغرب*`;;
  const spas = "              ";
  const res = await fetch(`https://api.ikyy.my.id/tiktoksearch?text=${text}`);	
  const data = await res.json();
  const json = data.result[0];
  await conn.sendFile(m.chat, json.play, 'tiktok.mp4', `instagram.com/noureddine_ouafy 


*📛:صاحب الفيديو* ${json.author}
*📍:البلد* ${json.region}
*🕐:مدة الفيديو* ${json.duration}
*🖇️:عنوان الفيديو* ${json.title}

`, m);
  await conn.sendFile(m.chat, json.music, 'error.mp3', null, m, true);
};

handler.help = ['tiktoksearch2'];
handler.command = /^(tiktoksearch2)$/i;
handler.tags = ['search'];


export default handler;