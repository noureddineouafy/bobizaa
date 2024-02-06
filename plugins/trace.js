import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js';
let handler = async (m, { conn }) => {
  try {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";

    if (!mime.startsWith('image')) {
      throw "*المرجو الاشارة لصورة الانيم الذي تريد ان تعرف من أين أخدت تلك الصورة 😉ثم تشير لها وتكتب*\n*.trace*";
    }

    let data = await q.download();
    let image = await uploadImage(data);



    let apiUrl = `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(image)}`;
    console.log("API URL:", apiUrl);

    let response = await fetch(apiUrl);
    let result = await response.json();
    console.log("API Response:", result);

    if (!result || result.error || result.result.length === 0) {
      throw "*المرجو الاشارة لصورة الانيم الذي تريد ان تعرف من أين أخدت تلك الصورة 😉ثم تشير لها وتكتب*\n*.trace*";
    }

    let { anilist, from, to, similarity, video, episode } = result.result[0];
    let animeTitle = anilist.title ? anilist.title.romaji || anilist.title.native : "العنوان غير معروف";

    let message = `*اسم الانيم:* ${animeTitle}\n`;

    if (anilist.synonyms && anilist.synonyms.length > 0) {
      message += `*♥:* ${anilist.synonyms.join(", ")}\n`;
    }

    message += `*مدى التشابه:* ${similarity.toFixed(2)}%\n`;
    message += `*المدة:* ${formatDuration(from * 1000)} - ${formatDuration(to * 1000)}\n`;

    if (episode) {
      message += `*الحلقة رقم:* ${episode}\n`;
    }

    console.log("معلومات حوله:", {
      animeTitle,
      synonyms: anilist.synonyms ? anilist.synonyms.join(", ") : "لا توجد",
      similarity,
      timestamp: `${formatDuration(from * 1000)} - ${formatDuration(to * 1000)}`,
      video,
      episode,
    });

    // Send the video with anime information as the caption
    await conn.sendFile(m.chat, video, 'anime.mp4', message, m);
  } catch (error) {
    console.error("Error:", error);
    m.reply("*المرجو الاشارة لصورة الانيم الذي تريد ان تعرف من أين أخدت تلك الصورة 😉ثم تشير لها وتكتب*\n*.trace*");
  }
};

function formatDuration(ms) {
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

handler.help = ["trace"];
handler.tags = ["anime"];
handler.command = /^trace$/i;

export default handler;