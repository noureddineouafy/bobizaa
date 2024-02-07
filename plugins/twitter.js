import fetch from 'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'
import vm from 'node:vm'
import qs from 'qs'
const handler = async (m, {conn, text, args, usedPrefix, command}) => {
const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"
}
const twitterUrlRegex = /^https?:\/\/(www\.)?twitter\.com\/(\w+)\/status\/(\d+)$/i
if (!text) return conn.reply(m.chat,`هذا الامر خاص بالتحميل من منصة تويتر مثال نكتب هكذا \n*.twitter*  https://twitter.com/Animalesybichos/status/1564616107159330816\n`, fkontak)
try{ 
const apiUrl = `https://api.lolhuman.xyz/api/twitter?apikey=GataDios&url=${encodeURIComponent(text)}`
const response = await fetch(apiUrl)
const jsonData = await response.json()
const tweetData = jsonData.result
const tweetTitle = tweetData.title
const tweetVideoUrl = tweetData.media[0].url
const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${text}`)).text()
const tweetTitleWithoutUrl = tweetTitle.replace(/https?:\/\/t\.co\/\w+/i, '').trim()
const txt1 = `😁 ${tweetTitleWithoutUrl}\n\n🔗 *رابط مختصر للفيديو:*\n• _${shortUrl1}_\n\ninstagram.com/noureddine_ouafy`.trim()
await conn.sendFile(m.chat, tweetVideoUrl, 'error.mp4', txt1, fkontak)
} catch (e) {
console.log(e)
}}

handler.help = ["twitter"]
handler.tags = ["downloader"]
handler.command = /^(twitter)$/i
export default handler
