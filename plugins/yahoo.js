import fetch from 'node-fetch'
const {
    generateSerpApiUrl
} = await (await import('../lib/serpapi.js'));

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    args
}) => {
    try {
        let text
        if (args.length >= 1) {
            text = args.slice(0).join(" ")
        } else if (m.quoted && m.quoted.text) {
            text = m.quoted.text
        } else throw "البحث عن البحوث/الصور/الفيديوات في yahoo\nللبحث عن نص نكتب مثال \n*.yahoo* facebook\n\nللبحث عن الصور نكتب هكذا \n*.yahooimg* girl\nللبحث عن فيديوات نكتب \n*.yahoovid girl"

        await m.reply(wait)

        if (command === "yahoo") {
            const param = {
                api_key: 'f70cce2ec221209bcd45af4533adbbc51c51b682c29251b618061115c6e95d5c',
                engine: 'yahoo',
                p: text
            };
            let all = await generateSerpApiUrl(param)
            let caption = all.organic_results.map((v, index) => `${htki + " " + ++index + " " + htka}\n*${v.title || 'Tidak terdeteksi'}*\n  *○ Link:* ${v.link || 'Tidak terdeteksi'}\n  *○ Snippet:* ${v.snippet || 'Tidak terdeteksi'}`).join("\n\n")
            await conn.reply(m.chat, caption, m)
        }
        if (command === "yahooimg") {
            const param = {
                api_key: 'f70cce2ec221209bcd45af4533adbbc51c51b682c29251b618061115c6e95d5c',
                engine: 'yahoo_images',
                p: text
            };
            let all = await generateSerpApiUrl(param)
            let caption = all.images_results[0]
            await conn.sendMessage(m.chat, {
                image: {
                    url: caption.original || caption.thumbnail
                },
                caption: `- ${caption.title}\n- ${caption.snippet}\n- ${caption.source}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        }
        if (command === "yahoovid") {
            const param = {
                api_key: 'f70cce2ec221209bcd45af4533adbbc51c51b682c29251b618061115c6e95d5c',
                engine: 'yahoo_videos',
                p: text
            };
            let all = await generateSerpApiUrl(param)
            let caption = all.videos_results[0]
            await conn.sendMessage(m.chat, {
                video: {
                    url: caption.preview || caption.thumbnail
                },
                caption: `- ${caption.title}\n- ${caption.duration}\n- ${caption.source}\n- ${caption.date}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        }
    } catch (error) {
        console.error(error);
        // Handle the error, e.g., send an error message to the user
    }
}
handler.help = ["yahoo"]
handler.tags = ["search"]
handler.command = /^yahoo(img|vid)?$/i
export default handler
