import got from 'got';
import cheerio from 'cheerio';
import { Maker } from 'imagemaker.js';

const handler = async (m, { conn, args }) => {
  try {
    const input = args.join(' ');

    if (!input) {
      return conn.reply(m.chat, `\n\n*هذا الأمر خاص بعمل شعارات (logo)* باسمك \n\n\nنكتب هكذا على سبيل المثال :\n*.logo* naruto|1|noureddine_ouafy\n\nيمكنك مشاهدة هذا الفيديو حتى تعرف المزيد من المعلومات حول هذه الميزة♥\nhttps://www.instagram.com/reel/CxygqzGM-vN`, m);
    }

    const [effect, order, ...objects] = input.split('|');

    if (!order) {
      const searchResults = await searchTheme(effect);
      const itemsList = searchResults.map((result, index) => `${index + 1}. ${result.title}`).join('\n');
      return conn.reply(m.chat,  `*هذا الأمر خاص بعمل شعارات (logo)* باسمك \n\n\nنكتب هكذا على سبيل المثال :\n*.logo* naruto|1|noureddine_ouafy`, m);
    }

    const searchResults = await searchTheme(effect);

    if (isNaN(order) || order <= 0 || order > searchResults.length) {
      const itemsList = searchResults.map((result, index) => `${index + 1}. ${result.title}`).join('\n');
      return conn.reply(m.chat,  `*هذا الأمر خاص بعمل شعارات (logo)* باسمك \nمأخوذة من هذا الموقع\nhttps://textpro.me\n\nنكتب هكذا على سبيل المثال :\n*.logo* naruto|1|noureddine_ouafy`, m);
    }

    const selectedResult = searchResults[order - 1];
    const maker = new Maker();

    const textproResult = await maker.TextPro(selectedResult.link, objects);
    const tag = `@${m.sender.split('@')[0]}`;

    await conn.sendMessage(m.chat, {
      image: {
        url: textproResult.imageUrl
      },
      caption: `instagram.com/noureddine_ouafy\nهذه الصورة طلبها السيد/ة: ${tag}`,
      mentions: [m.sender]
    }, {
      quoted: m
    });
  } catch (error) {
    conn.reply(m.chat, '❌حذث خطأ راسل نورالدين \ninstagram.com/noureddine_ouafy : ' + error.message, m);
  }
};

handler.help = ['textpro <effect> <text>'];
handler.tags = ['maker'];
handler.command = /^(logo)$/i;
export default handler;

async function searchTheme(q) {
  try {
    const baseUrl = 'https://textpro.me';
    const response = await got(baseUrl + '/search?q=' + encodeURIComponent(q));
    const html = response.body;
    const $ = cheerio.load(html);

    const effects = [];

    $('.col-md-4').each((index, element) => {
        const link = $(element).find('.div-effect a').attr('href');
        const title = $(element).find('.title-effect-home').text();
        effects.push({ link: 'https://textpro.me' + link, title: title });
    });

    return effects;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
