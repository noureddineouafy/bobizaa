import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args
}) => {
let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "أدخل نصًا أو رد على النص الذي تريد اقتباسه!\n*.bruzu @noureddine_ouafy*"
   await m.reply(wait)
    try {
        let data = await Bruzu(text, m.name)
let apiURL = 'https://img.bruzu.com/?'+new URLSearchParams(data).toString();
        await conn.sendFile(m.chat, apiURL, "", "*[ instagram.com/noureddine_ouafy ]*", m)
    } catch (e) {
        throw eror
    }
}
handler.help = ["bruzu"]
handler.tags = ["tools"]
handler.command = /^(bruzu)$/i
export default handler

function getParamsObject(url) {
  const urlParams = new URLSearchParams(url.split('?')[1]);
  const paramsObject = {};

  for (const [key, value] of urlParams.entries()) {
    paramsObject[key] = value;
  }

  return paramsObject;
}

async function Bruzu(quotes, watermark) {
  const url = 'https://bruzu.com/templates/';
    const response = await fetch(url);
    const html = await response.text();
    const links = [];
  const $ = cheerio.load(html);

  // Use the specified div class to target the links
  $('div.masonry a').each((index, element) => {
    const link = $(element).attr('href');
    if (link) {
      links.push(link);
    }
  });
  const decodedLinks = links.map(link => decodeURIComponent(link));
  const src = decodedLinks.map(link => getParamsObject(link));
  const json = src[Math.floor(Math.random() * src.length)]
  return {
    ...json,
    'b.t': quotes,
    'c.t': watermark
  };
  }
