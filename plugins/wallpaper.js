import { wallpaper } from "../lib/scrape.js";

let handler = async (m, { conn, command, text, usedPrefix }) => {
    let query = text
    if (!query) throw `مثال: \n\n*.wallpaper girl*`;
    m.reply(wait);
    try {
        let wallpapers = await wallpaper(query);
        let randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
        let cap = "تابع مالك البوت في حسابه\ninstagram.com/noureddine_ouafy";
        conn.sendMessage(m.chat, { image: { url: randomWallpaper }, caption: cap }, m);
    } catch (e) {
        console.log(e);
        m.reply(`حذث خطأ`);
    }
};
handler.help = ['wallpaper']
handler.tags = ['downloader']
handler.command = /^wallpaper$/i

export default handler