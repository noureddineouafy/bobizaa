
kingcmd: "tomp3",
shortcut:['mp3','toaudio'],
infocmd: "changes type to audio.",
kingclass: "converter",
use: 'reply to any Video',
kingpath: __filename
},
async(sigma, citel, text) => {
if (!citel.quoted) return citel.reply(`_Reply to Any Video_`);
let mime = citel.quoted.mtype
if (mime =="audioMessage" || mime =="videoMessage")
{
let media = await sigma.downloadAndSaveMediaMessage(citel.quoted);
const { toAudio } = require('../lib');
let buffer = fs.readFileSync(media);
let audio = await toAudio(buffer);
sigma.sendMessage(citel.chat, { audio: audio, mimetype: 'audio/mpeg' }, { quoted: citel });


fs.unlink(media, (err) => {
if (err) { return console.error('File Not Deleted from From TOAUDIO AT : ' , media,'\n while Error : ' , err); }
else return console.log('File deleted successfully in TOAUDIO MP3 at : ' , media);
});

}
else return citel.send ("*Please, Reply To A video Message*");
