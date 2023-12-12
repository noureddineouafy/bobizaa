import axios from 'axios';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import {mediafiredl} from '@bochilteam/scraper';

const handler = async (m, {conn, args, usedPrefix, command}) => {
  if (!args[0]) throw `التحميل من منصة ميديافاير مثال:\n*mediafire2* https://www.mediafire.com/file/ttuenrfdra2onw1/SCRIP_BOT_jaga_grup_pairing.zip/`;
  try {
    const resEX = await mediafiredl(args[0]);
    const captionES = `_*التحميل من ميديافاير*_\n
▢ *الاسم:* ${resEX.filename}
▢ *الحجم:* ${resEX.filesizeH}
▢ *نوع الملف:* ${resEX.ext}\n\n
*[ 🏃🏃 ] جاري تحميل الملف...*`.trim();
    m.reply(captionES);
    await conn.sendFile(m.chat, resEX.url, resEX.filename, '', m, null, {mimetype: resEX.ext, asDocument: true});
  } catch {
    try {
      const res = await mediafireDl(args[0]);
      const {name, size, date, mime, link} = res;
      const caption = `_*التحميل من ميديافاير*_\n
▢ *اسم الملف:* ${name}
▢ *حجمه:* ${size}
▢ *نوعه:* ${mime}\n\n
**[ 🏃🏃 ] جاري تحميل الملف...*`.trim();
      await m.reply(caption);
      await conn.sendFile(m.chat, link, name, '', m, null, {mimetype: mime, asDocument: true});
    } catch {
      await m.reply('اعتذر لكن فشلنا في تنزيل ملفك ربما يكون الملف كبيرا او انه محذوف من المنصة ');
    }
  }
};
handler.command = /^mediafire2$/i;
export default handler;

async function mediafireDl(url) {
  const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/', '')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
  const $ = cheerio.load(res.data);
  const link = $('#downloadButton').attr('href');
  const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ', '').replaceAll('\n', '');
  const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text();
  const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ', '');
  let mime = '';
  const rese = await axios.head(link);
  mime = rese.headers['content-type'];
  return {name, size, date, mime, link};
}