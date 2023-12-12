import ytdl from "ytdl-core";
import fs from "fs";

let handler = async (m, {conn, args, isPrems, isOwner}) => {
  const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
  };
  if (args.length === 0) {
    m.reply(`*هذا الامر خاص بتحميل فيديوات اليوتوب على شكل document*\nسوف اعطيك مثال تكتب هكذا \n\n*.ytdoc* https://youtube.com/watch?v=JhaYzYCLiCw`);
    return;
  }
  try {
    let urlYt = args[0];
    if (!urlYt.startsWith("http")) {
      m.reply(`اين رابط الفيديو`);
      return;
    }
    let infoYt = await ytdl.getInfo(urlYt);
    let titleYt = infoYt.videoDetails.title;
    let randomName = getRandom(".mp4");
    const stream = ytdl(urlYt, {
      filter: (info) => info.itag == 22 || info.itag == 18,
    }).pipe(fs.createWriteStream(`./${randomName}`));
    m.reply(`*_⏰ جاري تحميل الفيديو... ⏰_*`);
    console.log("Descargando ->", urlYt);
    await new Promise((resolve, reject) => {
      stream.on("error", reject);
      stream.on("finish", resolve);
    });
    let stats = fs.statSync(`./${randomName}`);
    let fileSizeInBytes = stats.size;
    let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    console.log("Tamaño del video: " + fileSizeInMegabytes);
    if (fileSizeInMegabytes <= 999) {
      conn.sendMessage(
        m.chat,
        {
          document: fs.readFileSync(`./${randomName}`),
          fileName: `${titleYt}.mp4`,
          mimetype: "video/mp4",
        },
        {quoted: m}
      );
    } else {
      m.reply(`*حجم الفيديو يتجاوز  999ميجابات.*`);
    }
    fs.unlinkSync(`./${randomName}`);
  } catch (e) {
    m.reply(e.toString());
  }
};
handler.help = ["ytd"];
handler.tags = ["downloader"];
handler.command = ["videodoc", "documentvid", "videodocumento", "ytdoc"];
handler.exp = 3;

export default handler;
