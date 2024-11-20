import fg from 'api-dylux'  
 import fetch from 'node-fetch' 
 import { savefrom, facebookdl, facebookdlv2 } from '@bochilteam/scraper' 
 import fbDownloader from 'fb-downloader-scrapper' 
 import { facebook } from "@xct007/frieren-scraper" 
 import axios from 'axios' 
 let handler = async (m, { conn, args, command, usedPrefix }) => { 
 if (!args[0]) throw `مثال : \n .fb https://www.facebook.com/100063533185520/posts/pfbid0LdVjrGvG1KPooo9yzdrDrp8UoZFBqVbh9L97YNx8qw2g6HgxSB82GbwRiUueUJJnl/?app=fbl`  
 if (!args[0].match(/www.facebook.com|fb.watch/g)) throw `*مثال : \n .fb https://www.facebook.com/100063533185520/posts/pfbid0LdVjrGvG1KPooo9yzdrDrp8UoZFBqVbh9L97YNx8qw2g6HgxSB82GbwRiUueUJJnl/?app=fbl` 
 try { 
 await m.reply(`*جاري تحميل الفيديو...*`)       
 const d2ata = await facebook.v1(args[0]); 
 let r2es = ''; 
 if (d2ata.urls && d2ata.urls.length > 0) { 
 r2es = `${d2ata.urls[0]?.hd || d2ata.urls[1]?.sd || ''}`} 
await  conn.sendFile(m.chat, r2es, 'error.mp4', `instagram.com/noureddine_ouafy`, m); 
 } catch (err1) { 
 try {   
 const req = await igeh(args[0]) 
await conn.sendMessage(m.chat, { video : { url : req.url_list }}, m)    
 } catch (err1_2) { 
 try { 
 let Rres = await fetch(`https://api.lolhuman.xyz/api/facebook?apikey=${lolkeysapi}&url=${args[0]}`) 
 let Jjson = await Rres.json() 
 let VIDEO = Jjson.result[0] 
 if (VIDEO == '' || !VIDEO || VIDEO == null) VIDEO = Jjson.result[1] 
await  conn.sendFile(m.chat, VIDEO, 'error.mp4', `*𝙰𝚀𝚄𝙸 𝙴𝚂𝚃𝙰 𝚂𝚄 𝚅𝙸𝙳𝙴𝙾*`, m)     
 } catch (err2) {     
 try { 
 let ress = await fg.fbdl(args[0]) 
 let urll = await ress.data[0].url     
 await conn.sendFile(m.chat, urll, 'error.mp4', 'instagram.com/noureddine_ouafy', m)      
 } catch (err3) { 
 try { 
 let res = await fbDownloader(args[0]) 
 for (let result of res.download) { 
 let ur = result.url     
 await conn.sendFile(m.chat, ur, 'error.mp4', 'instagram.com/noureddine_ouafy', m)} 
 } catch (err4) { 
 try { 
 let res3 = await fetch(`https://latam-api.vercel.app/api/facebookdl?apikey=brunosobrino&q=${args[0]}`)   
 let json = await res3.json() 
 let url3 = await json.video 
 await conn.sendFile(m.chat, url3, 'error.mp4', 'instagram.com/noureddine_ouafy', m)          
 } catch (err5) {     
 try { 
 const { result } = await facebookdl(args[0]).catch(async _ => await facebookdlv2(args[0])).catch(async _ => await savefrom(args[0])) 
 for (const { url, isVideo } of result.reverse()) await await conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, '*instagram.com/noureddine_ouafy*', m)     
 } catch (err6) { 
 throw `حذثت مشكلة أَبلغ عنها صاحب البوت حتى يصلحها \ninstagram.com/noureddine_ouafy` 
 }}}}}}}} 
handler.help = ["fb"]
handler.tags = ["downloader"];
handler.command = /^(fb)$/i
 export default handler 
  
 async function igeh(url_media) { 
 return new Promise(async (resolve,reject)=>{ 
 const BASE_URL = "https://instasupersave.com/" 
 try { 
 const resp = await axios(BASE_URL); 
 const cookie = resp.headers["set-cookie"]; // get cookie from request 
 const session = cookie[0].split(";")[0].replace("XSRF-TOKEN=","").replace("%3D", "") 
 var config = { method: 'post', url: `${BASE_URL}api/convert`, headers: { 'origin': 'https://instasupersave.com', 'referer': 'https://instasupersave.com/pt/', 'sec-fetch-dest': 'empty', 'sec-fetch-mode': 'cors', 'sec-fetch-site': 'same-origin', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52', 'x-xsrf-token': session, 'Content-Type': 'application/json', 'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}` }, data: { url: url_media }}; 
 axios(config).then(function (response) { 
 let ig = [] 
 if(Array.isArray(response.data)){ 
 response.data.forEach(post => { ig.push(post.sd === undefined ? post.thumb : post.sd.url)}) 
 } else { 
 ig.push(response.data.url[0].url)} 
 resolve({ results_number : ig.length, url_list: ig })}).catch(function (error) { 
 reject(error.message)}) 
 } catch (e) { 
 reject(e.message) 
 }})}
