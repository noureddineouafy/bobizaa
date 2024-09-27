import {search, download} from 'aptoide-scraper';
const handler = async (m, {conn, usedPrefix: prefix, command, text}) => {
 if (!text) throw `معشوق الجماهير هذا الأمر خاص بتحميل التطبيقات المجانية والمدفوعة منها نكتب هكذا على سبيل المثال \n*.apk facebbok lite*`;
  try {    
    const searchA = await search(text);
    const data5 = await download(searchA[0].id);
    let response = `📲 تحميل التطبيقات 📲\n\n📌 *اسم التطبيق:* ${data5.name}\n📦 *الباكيدج:* ${data5.package}\n🕒 *تحذيث رقم:* ${data5.lastup}\n📥 *حجم التطبيق:* ${data5.size}\n\nما الذي يجعلك لا تتابع  صاحب البوت يا عزيزي  😄 عبدالصمد يحب من يستعمل بوتاته لذا تابعه في حساباته \ninstagram.com/abdsamad___75`
    await conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m});
 if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
      return await conn.sendMessage(m.chat, {text: '*[ 😁 ]الملف كبير جدًا لذا لن يتم إرساله.'}, {quoted: m});
    }
    await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m});
  } catch {
    throw `*[😒] خطأ، لم يتم العثور على نتائج لبحثك.*`;
  }    
};
handler.help = ["apk"]
handler.tags = ["applications"]
handler.command = ["apk"] 
export default handler;
