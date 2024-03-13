import fetch from 'node-fetch'
import moment from 'moment-timezone'
let handler = async (m, { conn, args }) => {
let wib = moment.tz('Africa/casablanca').format('HH:mm:ss')
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  
  let clockString = `تاريخ اليوم : ${day}/${month}/${year}\n الساعة تشير لــ  : ${wib}`;
  
  // Mengirimkan hasil ke grup atau 
  conn.reply(m.chat, clockString, m);
}

handler.help = ['clock'];
handler.tags = ['tools'];
handler.command = /^(clock)$/i;

export default handler;