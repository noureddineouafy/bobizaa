import ytdl from "ytdl-core";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply("هذا الامر خاص بتحميل فيديوات اليوتوب على شكل document مثال :\n*.ytmp4* https://www.youtube.com/watch?v=LrsNYeLqRAU&t=0 ");
  let obj = await ytmp3(text);
  let title = obj.meta.title;
  conn.sendFile(m.chat, obj.buffer, title + ".mp4", "", m, 0, {
    mimetype: "video/mp4",
    asDocument: true,
  });
};

handler.help = ["ytmp4 *url*"];
handler.tags = ['tdownload'];
handler.command = ["ytmp4"];

export default handler;

async function ytmp3(url) {
  try {
    const { videoDetails } = await ytdl.getInfo(url, {
      lang: "ar",
    });
    const stream = ytdl(url, {
      filter: "videoandaudio",
    });
    const chunks = [];
    stream.on("data", (chunk) => {
      chunks.push(chunk);
    });
    await new Promise((resolve, reject) => {
      stream.on("end", resolve);
      stream.on("error", reject);
    });
    const buffer = Buffer.concat(chunks);
    return {
      meta: {
        title: videoDetails.title,
        channel: videoDetails.author.name,
        seconds: videoDetails.lengthSeconds,
        description: videoDetails.description,
        image: videoDetails.thumbnails.slice(-1)[0].url,
      },
      buffer: buffer,
      size: buffer.length,
    };
  } catch (error) {
    throw error;
  }
}
