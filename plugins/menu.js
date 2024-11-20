import fs from 'fs';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';
const { levelling } = '../lib/levelling.js';
import PhoneNumber from 'awesome-phonenumber';
import { promises } from 'fs';
import { join } from 'path';

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems }) => {
    try {
        let imgUrl = 'https://mallucampaign.in/images/img_1717617791.jpg';  // Use the correct URL
        let d = new Date(new Date().getTime() + 3600000);
        let locale = 'en';
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
╭───[ Welcome ]───╮
│
│  👋 ${taguser}
│  🤖 Soufian Kerroumi
│
├────────────────────
│ Available Commands:
│
│ 📱 Applications:
│   ├─ 🟢 .apk
│   ├─ 🟢 .apk2
│
│ 🖼 Photo Editing:
│   ├─ 🟢 .hd
│   ├─ 🟢 .remini2
│   └─ 🟢 .rem
│
│ 🧠 AI Commands:
│   ├─ 🟢 .kerroumi
│   ├─ 🟢 .gpt2
│   ├─ 🟢 .gemini
│   ├─ 🟢 .doulingo
│   └─ 🟢 .bobiza
│
│ 📺 YouTube:
│   ├─ 🟢 .yts
│   ├─ 🟢 .song
│   └─ 🟢 .video
│
│ 🕌 Islamic Commands:
│   ├─ 🟢 .adhan
│   ├─ 🟢 .asmaeallah
│   ├─ 🟢 .ayati
│   ├─ 🟢 .bader
│   ├─ 🟢 .coran
│   └─ 🟢 .hizb
│
│ 📸 Stickers:
│   ├─ 🟢 .s
│   ├─ 🟢 .tovideo
│   ├─ 🟢 .toimage
│   └─ 🟢 .emojimix
│
│ 🎵 TikTok:
│   └─ 🟢 .tiktok1
│
│ 📷 Instagram:
│   └─ 🟢 .soufian
│
│ 🐦 Twitter:
│   └─ 🟢 .twitter
│
│ 📁 Mediafire:
│   └─ 🟢 .mediafire1
│
╰────────────────────
❤ SOUFIAN KERROUMI ❤
`.trim();

        let buttonMessage = {
            image: { url: imgUrl },
            caption: str,
            mentions: [m.sender],
            footer: '',
            headerType: 4,
            contextInfo: {
                mentionedJid: [m.sender],
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 1,
                    mediaUrl: null,
                    title: '⁨SOUFIAN KERROUMI👑',
                    body: null,
                    thumbnail: null,
                    sourceUrl: 'https://instagram.com/soufian_k23'
                }
            }
        };

        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });

    } catch (e) {
        console.error(e);
        conn.reply(m.chat, '[❗Error❗]', m);
    }
};

handler.command = /^(commands|menu)$/i;
handler.exp = 20;
handler.fail = null;
export default handler;

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
