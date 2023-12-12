import fetch from 'node-fetch'

var handler = async (m, {conn, text, usedPrefix, command}) => {

if (!text) throw ` أدخل نصًا لإنشاء صورة لاستخدام ميزة *DALE-E 2*\n\n❕ مثال\n*${usedPrefix + command}* girl`
await conn.sendMessage(m.chat, {text: '*❗ جاري صنع الصورة انتظر قليلا.*'}, {quoted: m})
try {
const tiores1 = await fetch(`https://vihangayt.me/tools/imagine?q=${text}`)
const json1 = await tiores1.json();
await conn.sendMessage(m.chat, {image: {url: json1.data}}, {quoted: m})
} catch {
console.log('⚠️ وقعت مشكلة.')
try {
let tiores2 = await conn.getFile(`https://vihangayt.me/tools/midjourney?q=${text}`)
await conn.sendMessage(m.chat, {image: {url: tiores2.data}}, {quoted: m})
} catch {
console.log('⚠️ وقعت مشكلة.');
try {
let tiores3 = await fetch(`https://vihangayt.me/tools/lexicaart?q=${text}`)
let json3 = await tiores3.json()
await conn.sendMessage(m.chat, {image: {url: json3.data[0].images[0].url}}, {quoted: m})
} catch {
console.log('⚠️ وقعت مشكلة.')
try {
const tiores4 = await conn.getFile(`https://api.lolhuman.xyz/api/dall-e?apikey=${lolkeysapi}&text=${text}`)
await conn.sendMessage(m.chat, {image: {url: tiores4.data}}, {quoted: m})
} catch {
console.log('⚠️ حذثت مشكلة حاول مراسلة صاحب البوت')
throw `*⚠️ حذثت مشكلة راسل صاحب البوت بها*`
}}}}

}
handler.help = ['dall2']
handler.tags = ['ai']
handler.command = /^(dalle2)/i

export default handler