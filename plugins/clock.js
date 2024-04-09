import fetch from 'node-fetch'
import moment from 'moment-timezone'
let handler = async (m, { conn, args }) => {
let wib = moment.tz('Africa/casablanca').format('HH:mm:ss')
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  
  let clockString = `تـٌـٌٌـاريځـٌٌـٌٌ الُـِـِِـِِِـِِـِـيوُمـْـْْـْ : ${day}/${month}/${year}\n ال̷س̷اع̷ٍة ت̷ش̷ُي̷ر̷ ل̷ــ  : ${wib}`;
  
  // Mengirimkan hasil ke grup atau 
  conn.reply(m.chat, clockString, m);
}

handler.help = ['clock'];
handler.tags = ['tools'];
handler.command = /^(clock)$/i;

export default handler;
