import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "s",
        "d"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("+")
    if (!lister.includes(feature)) return m.reply("\nهذا الامر خاص بتحميل التطبيقات والالعاب    من موقع \n https://id.uptodown.com/\nيمكنك تحميل برامج التطبيقات من هذا الامر من خلال كتابة \n*.uptodown s+facebook lite*\n\nبعد ان تحصل على رابط التطبيق تعود للبوت وتكتب له هذا الامر لتحميله\n*.uptodown d+*(رابط التطبيق)*\n\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "s") {
            if (!inputs) return m.reply("مثال :\n*.uptodown* s+facebook lite")
            await m.reply(wait)
            try {
                let res = await searchApp(inputs)
                let teks = res.map((item, index) => {
                    return `*[ RESULT ${index + 1} ]*

📰 *Title:* ${item.title}
🔗 *Link:* ${item.link}
📝 *Description:* ${item.description}
🖼️ *Image:* ${item.image}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply('error')
            }
        }

        if (feature == "d") {
            if (!inputs) return m.reply("مثال :\n*.uptodown d*+https://facebook-lite.id.uptodown.com/android")
            try {
                let resl = await getApp(inputs)
                let faqs = (resl.faqs).map((item, index) => `${index + 1}. ${item.question}\n${item.answer}\n\n`).join('');
                let tech = (resl.technicalInformation).map((item, index) => `${index + 1}. ${item.key}\n${item.value}\n\n`).join('');

                let cap = `🔗 URL: ${resl.url}
📌 Title: ${resl.title}
📏 Size: ${resl.size}
🆓 Is Free: ${resl.isFree}
🖼️ Screenshot: ${resl.screenshotSrc}
📝 Description: ${resl.description}
👥 Reviewer: ${resl.reviewer}
🌐 Translated By: ${resl.translatedBy}
📋 Requirements: ${resl.requirements}
❓ FAQs: ${faqs}
🔧 Technical Information: ${tech}

${wait}`
                await conn.sendFile(m.chat, resl.screenshotSrc, "", cap, m)
                await conn.sendFile(m.chat, resl.url, resl.title, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply('error')
            }
        }
    }
}
handler.help = ["uptodown"]
handler.tags = ["applications"]
handler.command = /^(uptodown)$/i
export default handler

/* New Line */
async function searchApp(query) {
    const searchUrl = 'https://id.uptodown.com/android/search';
    const data = new URLSearchParams();
    data.append('q', query);

    try {
        const response = await fetch(searchUrl, {
            method: 'POST',
            body: data
        });
        const html = await response.text();
        const $ = cheerio.load(html);

        const resultArray = [];

        $('.item').each((index, element) => {
            const nameElement = $(element).find('.name a');
            const imageElement = $(element).find('.app_card_img');

            const item = {
                title: nameElement.text(),
                link: nameElement.attr('href'),
                description: $(element).find('.description').text(),
                image: imageElement.attr('src')
            };

            resultArray.push(item);
        });

        return resultArray;
    } catch (error) {
        throw new Error(error);
    }
}

async function getInfo(url) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const screenshotSrc = $('img[itemprop="screenshot"]').attr('src');
    const description = $('.text-description').text().trim();
    const reviewer = $('.by span').eq(0).text().trim();
    const translatedBy = $('.by span').eq(1).text().trim();

    const requirements = $('h2:contains("Persyaratan") + ul li').map((index, element) => (
        $(element).text().trim()
    )).get();

    const faqs = $('.question-content').map((index, element) => ({
        question: $(element).find('h3.title').text().trim(),
        answer: $(element).find('p').text().trim()
    })).get();

    const technicalInformation = $('section#technical-information table tr').map((index, element) => ({
        key: $(element).find('th').text().trim(),
        value: $(element).find('td').last().text().trim()
    })).get();

    const category = $('section.info table tr').eq(0).find('td a').text().trim();
    const language = $('section.info table tr').eq(1).find('td').first().text().trim();
    const publisher = $('section.info table tr').eq(2).find('td a').text().trim();
    const downloads = $('section.info table tr').eq(3).find('td').last().text().trim();
    const date = $('section.info table tr').eq(4).find('td').last().text().trim();
    const contentRating = $('section.info table tr').eq(5).find('td').last().text().trim();

    return {
        screenshotSrc,
        description,
        reviewer,
        translatedBy,
        requirements,
        faqs,
        technicalInformation,
        category,
        language,
        publisher,
        downloads,
        date,
        contentRating
    };
};

// Fungsi untuk mencari dan mengambil data yang diperlukan
async function getApp(url) {
    const links = url.endsWith('/download') ? url : url + '/download'
    const response = await fetch(links);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Cari elemen dengan class "button download" di dalam div dengan class "button-group"
    const button = $('.button-group .button.download');
    const info = await getInfo(links.replace(/\/download$/, ''));

    // Ambil atribut-atribut yang diinginkan
    const data = {
        url: button.attr('data-url'),
        title: button.attr('title'),
        size: button.find('.size').text(),
        isFree: button.find('p:last-of-type').text() === 'gratis',
        screenshotSrc: info.screenshotSrc,
        description: info.description,
        reviewer: info.reviewer,
        translatedBy: info.translatedBy,
        requirements: info.requirements,
        faqs: info.faqs,
        technicalInformation: info.technicalInformation
    };

    return data;
};
