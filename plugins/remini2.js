import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js';

async function handler(m, { conn, usedPrefix, command }) {
    try {
        const q = m.quoted ? m.quoted : m;
        const mime = (q.msg || q).mimetype || q.mediaType || '';
        if (/^image/.test(mime) && !/webp/.test(mime)) {
            const img = await q.download();
            const out = await uploadImage(img);
            const api = await fetch(`https://api.betabotz.eu.org/api/tools/remini?url=${out}&apikey=beta-Nourr123`);
            const image = await api.json();
            const { url } = image;
            conn.sendFile(m.chat, url, null, 'instagram.com/noureddine_ouafy', m);
        } else {
            m.reply(`هذا الامر خاص بزيادة جودة اي صورة يكفي فقط ان ترسل للبوت الصورة وتقوم بالاشارة اليها وتكتب :\n*${usedPrefix + command}*`);
        }
    } catch (e) {
        console.error(e);
        m.reply(`فشلت في معالجة الصورة. حاول مرة اخرى`);
    }
}

handler.help = ['remini2'];
handler.tags = ['image-edit'];
handler.command = ['remini2'];

export default handler;