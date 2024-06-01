import fs from 'fs';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';
const { levelling } = '../lib/levelling.js';
import PhoneNumber from 'awesome-phonenumber';
import { promises } from 'fs';
import { join } from 'path';

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems }) => {
    try {
        let vn = './Menu4.mp4';
        let pp = imagen4;
        let img = await (await fetch('https://telegra.ph/.')).buffer();
        let d = new Date(new Date + 3600000);
        let locale = 'ar';
        let week = d.toLocaleDateString(locale, { weekday: 'long' });
        let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
        let _uptime = process.uptime() * 1000;
        let uptime = clockString(_uptime);
        let user = global.db.data.users[m.sender];
        let { money, joincount } = global.db.data.users[m.sender];
        let { exp, limit, level, role } = global.db.data.users[m.sender];
        let { min, xp, max } = xpRange(level, global.multiplier);
        let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;
        let more = String.fromCharCode(8206);
        let readMore = more.repeat(850);
        let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];

        let str = `
            مرحبا بك/ي معاك/ي سفيان كرومي-𝐵𝛩𝑇
            ⎔ ⋅ ───━ •﹝  المطور🪭﹞• ━─── ⋅ ⎔
            KERROUMI SOUFIAN BOT
            ───━ •﹝  التطبيقات ﹞• ━─── 
            .apk 
            .apk2
            ───━ •﹝ تصفية صور﹞• ━─── 
            .hd
            .remini2
            ───━ •﹝ الذكاء الاصطناعي﹞• ━─── 
            .gpt2
            .gemini
            .doulingo
            .bobiza 
            ───━ •﹝يوتيوب﹞• ━─── 
            .yts
            .song
            .video
            ───━ •﹝الدين الاسلامي﹞• ━─── 
            .adhan
            .asmaeallah
            .ayati
            .bader
            .coran
            .hizb
            ───━ •﹝ملصقات﹞• ━─── 
            .s
            .tovideo
            .toimage
            .emojimix
            ───━ •﹝تيك توك﹞• ━───

            ⎔ ⋅ ───━ •﹝🪭﹞• ━─── ⋅ ⎔

            ⎔ ⋅ ───━ •﹝🪭﹞• ━─── ⋅ ⎔
            KERROUMI SOUFIAN BOT
            ⎔ ⋅ ───━ •﹝🪭﹞• ━─── ⋅ ⎔
        `.trim();

        let buttonMessage = {
            video: { url: vn },
            caption: str,
            mentions: [m.sender],
            footer: '' + wm,
            headerType: 4,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 'VIDEO',
                    mediaUrl: null,
                    title: '⁨SOUFIAN KERROUMI👑',
                    body: null,
                    thumbnail: img,
                    sourceUrl: 'https://instagram.com/soufian_k23'
                }
            }
        };

        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

    } catch (e) {
        console.error(e);
        conn.reply(m.chat, '[❗خطاء❗]', m);
    }
};

handler.command = /^(اوامر|menu|الاوامر|مهام|المهام)$/i;
handler.exp = 20;
handler.fail = null;
export default handler;

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
