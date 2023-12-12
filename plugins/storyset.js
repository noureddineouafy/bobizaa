import axios from "axios"
import cheerio from "cheerio"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) throw "هذا الامر خاص بتحميل صور ذاك جودة عالية للمصممين هذه الاخيرة عبارة عن vector وهي مأخوذة من موقع \nhttps://storyset.com\n\n يمكنك تحميلها عبارة كتابة على سبيل المثال :\n\n\n*.storyset* men"
    try {
            await m.reply(wait)
            let res = await fetchThumbnailUrls('https://storyset.com/search?q=' + encodeURIComponent(text));
            let rdm = res[Math.floor(Math.random() * res.length)];
            await conn.sendMessage(m.chat, {
                image: {
                    url: rdm
                }, caption: "[ RESULT ]"
            }, {
                quoted: m
            })

    } catch (e) {
        throw 'error'
    }
}
handler.help = ["storyset"]
handler.tags = ["internet"]
handler.command = /^(storyset)$/i

export default handler

/* New Line */
async function fetchThumbnailUrls(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const thumbnailUrls = $('script[type="application/ld+json"]').toArray()
            .map(element => {
                try {
                    const jsonData = JSON.parse($(element).html());
                    if (jsonData['@type'] === 'ImageObject' && jsonData.thumbnailUrl) {
                        return jsonData.thumbnailUrl;
                    }
                } catch (error) {
                    // Kesalahan parsing JSON, lewati
                }
            }).filter(url => url);

        return thumbnailUrls;
    } catch (error) {
        console.error('Gagal mengambil halaman web:', error);
        return [];
    }
}
