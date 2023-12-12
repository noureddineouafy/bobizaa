import fetch from 'node-fetch';

export default async function handler(m, { conn, args, text, command, usedPrefix, isCreator, isPrems }) {
  let response = args.join(' ').split('|');
  if (!args[0]) throw 'يمكنك صناعة شعار تيكتوك مثال :\n\n*.ttlogo* bobiza|bot';
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  let res = `https://api.lolhuman.xyz/api/photooxy2/tiktok?apikey=a03b95861cfa18e990228d7b&text1=${response[0]}&text2=${response[1]}`;
  conn.sendFile(m.chat, res, 'bobiza.jpg', `instagram.com/noureddine_ouafy`, m, false);
}

handler.help = ['ttlogo'].map(v => v + ' <text>|<text>');
handler.tags = ['maker'];
handler.command = /^(ttlogo)$/i;
