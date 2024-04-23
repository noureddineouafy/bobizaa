import axios from 'axios';
let processingRequest = false;
const token = Buffer.from("ZXlKaGJHY2lPaUpTVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKelpXRXRZWEowSWl3aVlYVmtJanBiSW14dloybHVJbDBzSW1WNGNDSTZNVGN4TnpJeU5EWTROQ3dpYVdGMElqb3hOekV5TURRd05qZzBMQ0pxZEdraU9pSXpOVE15Tmprek16UTJNRGcxTURZNU15SXNJbkJoZVd4dllXUWlPbnNpYVdRaU9pSTFOMkV4TW1JMk1URXdObUkwTXpRMk5tWXhaV0V4TWpNMVpqQTBOVFZqTUNJc0ltVnRZV2xzSWpvaWRHWm1abWRtZURnM1FHZHRZV2xzTG1OdmJTSXNJbU55WldGMFpWOWhkQ0k2TVRjd05EY3pOVEUwTURVM01Td2ljM1JoZEhWeklqb3hmWDAuQ1NIemtLV19kcFV0TFRwWF9QWHNqSmxhOVQ2cTVFYnJnNGpZNVZXRW1CYUNROHNWemxUUjNPSFdrRWk4QzZ2RmhPcEJvUGdJMHFtNVgyX2lsdnRSVXZBNHVUUFI3UlJ1OWRZTEZJLXlXSDNCSmY3SVpQSF82bVFDMlJZRk1sOGFDY2JCTVNybFFZb3BEWEhyby0wTjNUUFBuaUtaM1Z0RG1jNGhibUNNaE5XUmZ6OF9pcU9MRnA1bWhlR1pjUXRYZHFtV0g4TklqaF94T042eXBzek5mTVVaUm9TUlZVSy02dVVmV3hLMnpQTW1KOEZpNVAzbl9NUG8tWkdweGI2OVFvWTkwQlphRFRUMmpkUTZsNnoxa2x3ZTBGMTNjelRYbDRTN0xnWnVOaWNGSFB1M0NqNk5DOTVIY0MwRnoweEhjSWFiSGdXUnQ2eG5ZNGZKbUtwN0dB","base64").toString("utf-8");

async function getimg(req_id) {
    try {
        const response = await axios.get(`https://apis-awesome-tofu.koyeb.app/api/seaart/getimg?token=${token}&req_id=${req_id}`);
        const data = response.data;
        return data.status !== "FINISHED" ? getimg(req_id) : { url: data.imgUri.url, info: data.imgUri };
    } catch (error) {
        throw new Error('Error fetching image: ' + error.message);
    }
}

async function getmodel(modelid) {
    try {
        const data = { id: modelid };
        const response = await axios.post('https://www.seaart.ai/api/v1/model/detail', data, {
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
            }
        });
        return response.data.data.name;
    } catch (error) {
        throw new Error('Error fetching model: ' + error.message);
    }
}

const handler = async (m, { conn, args, usedPrefix }) => {
    if (processingRequest) {
        return await m.reply('طلب آخر قيد المعالجة حاليًا. انتظر من فضلك.');
    }

    processingRequest = true;

    try {
        const text = args.length >= 1 ? args.join(" ") : m.quoted && m.quoted.text || '';
        if (!text.trim()) {
            await m.reply(`تخيل و انا سأرسل لك ما تخيلته انا بوبيزة استطيع فعلها نعم ! \nمـــثال:\n*.artdraw* girl with hijan  style`);
            return;
        }

        const models = ['68cce2cd1bef6cbb6393876d4790da43', '014004d18d0dcc73a128467096107c69', '038254337d59ef522fdb64268bc28e47', '0c97b277da98f5ff4d92774e0fe69889'];
        const randomModel = models[Math.floor(Math.random() * models.length)];
        const neg_prompt = 'Bad hand, bad face, bad art, bad legs, bad chest, bad body, bad quality';
        const payload = { token, model_id: randomModel, prompt: text, neg_prompt };

        const preResponse = await axios.post('https://apis-awesome-tofu.koyeb.app/api/seaart', payload);
        const req_id = preResponse.data.req_id;
        const processedImg = await getimg(req_id);
        const chosmodel = await getmodel(randomModel);
        const media = processedImg.url;
        delete processedImg.info.url;
        const caption = Object.entries(processedImg.info).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join('\n');

        await conn.sendMessage(m.chat, { image: { url: media }, caption: `instagram.com/noureddine_ouafy` }, { quoted: m });
    } catch (error) {
        console.error(error);
        await m.reply('حدث خطأ أثناء معالجة طلبك. الرجاء معاودة المحاولة في وقت لاحق.');
    } finally {
        processingRequest = false;
    }
};
handler.help = ["artdraw"];
handler.tags = ["drawing"];
handler.command = /^(artdraw)$/i;
export default handler;
