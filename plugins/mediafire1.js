import cheerio from "cheerio";
import { mediafiredl } from "@bochilteam/scraper";
import fetch from "node-fetch";
import { generateWAMessageFromContent } from "@whiskeysockets/baileys";

let handler = async (m, {
    conn,
    text,
    usedPrefix,
    command
}) => {
    try {
        let spas = "                ";

        let lister = ["v1", "v2", "v3", "v4"];
        let [inputs, feature] = text.split("|");
        const msg = `Masukkan input yang valid\n\n*Contoh:*\n${usedPrefix + command} link|v2\n\n*Pilih versi yang ada:*\n${lister
            .map((v) => `  ○ ${v.toUpperCase()}`)
            .join("\n")}`;
        feature = feature || "v4";
        if (!lister.includes(feature.toLowerCase())) return m.reply(msg);

        if (lister.includes(feature)) {

            if (feature == "v1") {
                if (!inputs) return m.reply("Input mediafire link");
                try {
                    let lol = await fetch(`https://api.lolhuman.xyz/api/mediafire?apikey=${global.lolkey}&url=${inputs}`);
                    let human = await lol.json();
                    if (!human.result.filename) throw new Error("Error Gan");
                    let caplol = `
*💌 Name:* ${human.result.filename}
*🗂️ Extension:* ${human.result.filetype}
*📊 Size:* ${human.result.filesize}
*📨 Uploaded:* ${human.result.uploaded}
${wait}
`;
                    let thumbnail = 'https://i.pinimg.com/736x/a2/27/d9/a227d943642d43d8992b1bde1f323dd0.jpg';
                    let thumed = await (await conn.getFile(thumbnail)).data;
                    let msg = await generateWAMessageFromContent(m.chat, {
                        extendedTextMessage: {
                            text: caplol,
                            jpegThumbnail: thumed,
                            contextInfo: {
                                mentionedJid: [m.sender],
                                externalAdReply: {
                                    body: 'D O W N L O A D E R',
                                    containsAutoReply: true,
                                    mediaType: 1,
                                    mediaUrl: inputs,
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true,
                                    sourceId: "B O B I Z A",
                                    sourceType: "PDF",
                                    previewType: "PDF",
                                    sourceUrl: inputs,
                                    thumbnail: thumed,
                                    thumbnailUrl: thumbnail,
                                    title: 'M E D I A F I R E'
                                }
                            }
                        }
                    }, {
                        quoted: m
                    });
                    await conn.relayMessage(m.chat, msg.message, {});
                    if (human.result.link) {
                        await conn.sendFile(m.chat, human.result.link, human.result.filename, "", m, null, {
                            mimetype: human.result.filetype,
                            asDocument: true
                        });
                    } else throw new Error("Error Gan");
                } catch (error) {
                    console.error(error);
                    m.reply("An error occurred. Please try again later.");
                }
            }
            if (feature == "v2") {
                if (!inputs) return m.reply("Input mediafire link");
                try {
                    let bocil = await mediafiredl(inputs);
                    let capboc = `
*💌 Name:* ${bocil.filename}
*📊 Size:* ${bocil.filesizeH}
*🗂️ Extension:* ${bocil.ext}
*📨 Uploaded:* ${bocil.aploud}
${wait}
`;
                    let thumbnail = 'https://i.pinimg.com/736x/a2/27/d9/a227d943642d43d8992b1bde1f323dd0.jpg';
                    let thumed = await (await conn.getFile(thumbnail)).data;
                    let msg = await generateWAMessageFromContent(m.chat, {
                        extendedTextMessage: {
                            text: capboc,
                            jpegThumbnail: thumed,
                            contextInfo: {
                                mentionedJid: [m.sender],
                                externalAdReply: {
                                    body: 'D O W N L O A D E R',
                                    containsAutoReply: true,
                                    mediaType: 1,
                                    mediaUrl: inputs,
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true,
                                    sourceId: "B O B I Z A",
                                    sourceType: "PDF",
                                    previewType: "PDF",
                                    sourceUrl: inputs,
                                    thumbnail: thumed,
                                    thumbnailUrl: thumbnail,
                                    title: 'M E D I A F I R E'
                                }
                            }
                        }
                    }, {
                        quoted: m
                    });
                    await conn.relayMessage(m.chat, msg.message, {});
                    if (bocil.url) {
                        await conn.sendFile(m.chat, bocil.url, bocil.filename, "", m, null, {
                            mimetype: bocil.ext,
                            asDocument: true
                        });
                    } else throw new Error("Error Gan");
                } catch (error) {
                    console.error(error);
                    m.reply("An error occurred. Please try again later.");
                }
            }
            if (feature == "v3") {
                if (!inputs) return m.reply("Input mediafire link");
                try {
                    let scrap = await mediafireDl(inputs);
                    let capscrap = `
*💌 Name:* ${scrap[0].nama}
*📊 Size:* ${scrap[0].size}
*🗂️ Extension:* ${scrap[0].mime}
${wait}
`;
                    let thumbnail = 'https://i.pinimg.com/736x/a2/27/d9/a227d943642d43d8992b1bde1f323dd0.jpg';
                    let thumed = await (await conn.getFile(thumbnail)).data;
                    let msg = await generateWAMessageFromContent(m.chat, {
                        extendedTextMessage: {
                            text: capscrap,
                            jpegThumbnail: thumed,
                            contextInfo: {
                                mentionedJid: [m.sender],
                                externalAdReply: {
                                    body: 'D O W N L O A D E R',
                                    containsAutoReply: true,
                                    mediaType: 1,
                                    mediaUrl: inputs,
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true,
                                    sourceId: "B O B I Z A",
                                    sourceType: "PDF",
                                    previewType: "PDF",
                                    sourceUrl: inputs,
                                    thumbnail: thumed,
                                    thumbnailUrl: thumbnail,
                                    title: 'M E D I A F I R E'
                                }
                            }
                        }
                    }, {
                        quoted: m
                    });
                    await conn.relayMessage(m.chat, msg.message, {});
                    if (scrap[0].link) {
                        await conn.sendFile(m.chat, scrap[0].link, scrap[0].nama, "", m, null, {
                            mimetype: scrap[0].mime,
                            asDocument: true
                        });
                    } else throw new Error("Error Gan");
                } catch (error) {
                    console.error(error);
                    m.reply("An error occurred. Please try again later.");
                }
            }
            if (feature == "v4") {
                if (!inputs) return m.reply("التحميل من منصة  mediafire\n المرجو ادخال الامر متبوعا برابط من المنصة مثال :\n.mediafire1 https://www.mediafire.com/file/96mscj81p92na3r/images+(35).jpeg/file");
                try {
                    let scrap = await mediafireDl2(inputs);
                    let capscrap = `
*💌 Name:* ${scrap.nama}
*📊 Size:* ${scrap.size}
*🗂️ Extension:* ${scrap.mime}
${wait}
`;
                    let thumbnail = 'https://i.pinimg.com/736x/a2/27/d9/a227d943642d43d8992b1bde1f323dd0.jpg';
                    let thumed = await (await conn.getFile(thumbnail)).data;
                    let msg = await generateWAMessageFromContent(m.chat, {
                        extendedTextMessage: {
                            text: capscrap,
                            jpegThumbnail: thumed,
                            contextInfo: {
                                mentionedJid: [m.sender],
                                externalAdReply: {
                                    body: 'D O W N L O A D E R',
                                    containsAutoReply: true,
                                    mediaType: 1,
                                    mediaUrl: inputs,
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true,
                                    sourceId: "B O B I Z A",
                                    sourceType: "PDF",
                                    previewType: "PDF",
                                    sourceUrl: inputs,
                                    thumbnail: thumed,
                                    thumbnailUrl: thumbnail,
                                    title: 'M E D I A F I R E'
                                }
                            }
                        }
                    }, {
                        quoted: m
                    });
                    await conn.relayMessage(m.chat, msg.message, {});
                    if (scrap.link) {
                        await conn.sendFile(m.chat, scrap.link, scrap.nama, "", m, null, {
                            mimetype: scrap.mime,
                            asDocument: true
                        });
                    } else throw new Error("Error Gan");
                } catch (error) {
                    console.error(error);
                    m.reply("*حدث خطأ. الرجاء معاودة المحاولة في وقت لاحق*.");
                }
            }

        }
    } catch (err) {
        console.error(err);
        m.reply("*حدث خطأ غير متوقع. الرجاء معاودة المحاولة في وقت لاحق*.");
    }
};
handler.help = ["mediafire1"];
handler.tags = ["downloader"];
handler.command = /^mediafire1$/i;
export default handler;

async function mediafireDl(url) {
    try {
        const res = await fetch(url);
        const $ = cheerio.load(await res.text());
        const link = $('a#downloadButton').attr('href');
        const [nama, mime, size] = [
            link.split('/').pop().trim(),
            link.split('.').pop().trim(),
            $('a#downloadButton').text().replace(/Download|\(|\)|\n|\s+/g, '').trim()
        ];
        return [{
            nama,
            mime,
            size,
            link
        }];
    } catch (error) {
        console.error(error);
        throw new Error("Error Gan");
    }
}

async function mediafireDl2(url) {
    try {
        var _a, _b;
        if (!/https?:\/\/(www\.)?mediafire\.com/.test(url))
            throw new Error('Invalid URL: ' + url);
        const data = await (await fetch(url)).text();
        const $ = cheerio.load(data);
        const Url = ($('#downloadButton').attr('href') || '').trim();
        const url2 = ($('#download_link > a.retry').attr('href') || '').trim();
        const $intro = $('div.dl-info > div.intro');
        const filename = $intro.find('div.filename').text().trim();
        const filetype = $intro.find('div.filetype > span').eq(0).text().trim();
        const ext = ((_b = (_a = /\(\.(.*?)\)/.exec($intro.find('div.filetype > span').eq(1).text())) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.trim()) || 'bin';
        const $li = $('div.dl-info > ul.details > li');
        const aploud = $li.eq(1).find('span').text().trim();
        const filesizeH = $li.eq(0).find('span').text().trim();
        const filesize = parseFloat(filesizeH) * (/GB/i.test(filesizeH) ?
            1000000 :
            /MB/i.test(filesizeH) ?
            1000 :
            /KB/i.test(filesizeH) ?
            1 :
            /B/i.test(filesizeH) ?
            0.1 :
            0);
        return {
            link: Url,
            url2,
            nama: filename,
            filetype,
            mime: ext,
            aploud,
            size: filesizeH,
            filesize
        };
    } catch (error) {
        console.error(error);
        throw new Error("Error Gan");
    }
}