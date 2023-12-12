import { youtubedl, youtubedlv2 } from '@bochilteam/scraper' 
import yts from 'yt-search'

var handler = async (m, { conn, command, text, usedPrefix }) => {
  try {
    if (!text) {
      return conn.reply(m.chat, `exemple ${usedPrefix}${command} hello`, m);
    }

    conn.reply(m.chat, 'انتظر لحظة، جاري البحث والتحميل...', m);

    let search = await yts(text);
    let vid = search.videos[0];
  if (!search) throw 'لم يتم العثور على الفيديو، حاول عنوانًا آخر';
    let { authorName, title, thumbnail, duration, viewH, publishedTime, url } = vid;

    let caption = `╭──── 〔 Y O U T U B E 〕 ─⬣
⬡ : ${title}
⬡ : ${authorName}
⬡ : ${duration}
⬡ : ${viewH}
⬡ : ${publishedTime}
⬡ : ${url}
╰────────⬣`;

    conn.reply(m.chat, caption, m, {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: thumbnail,
          body: wm,
          thumbnail: await (await conn.getFile(thumbnail)).data,
          sourceUrl: url,
        },
      },
    });

    const yt = await youtubedl(url).catch(async (_) => await youtubedlv2(url));
    const link = await yt.audio['128kbps'].download();
    let doc = {
      document: {
        url: link,
      },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
    };

    return conn.sendMessage(m.chat, doc, { quoted: m });
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'هنالك خطأ. الرجاء المحاولة مرة أخرى لاحقاً.\nابحث عن الخيار الصحيح...', m);
  }
};

handler.help = ['play'].map((v) => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^play3$/i

export default handler