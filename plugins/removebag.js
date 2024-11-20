let handler = async (m, { conn, text, args, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'المرجو الاشارة للصورة التي تريد ان تزيل خلفيتها ثم  اكتب \n' + usedPrefix+command 
m.reply('انتظر قليلا ..')

let cap = تمت إزالة الخلفية بنجاح  : تابعني هنا \ninstagram.com/soufian_k23

try {
const img = await q.download()
const { data } = await axios.post("https://backend.zyro.com/v1/ai/remove-background", { 
image: "data:image/jpeg;base64," + img.toString("base64") 
})
const image = Buffer.from(data.result.split(",")[1], "base64")
await conn.sendMessage(m.chat, {image: image, caption: cap}, {quoted: m, ephemeralExpiration: m.expiration})
} catch (e) {
m.reply('حذث خطأ ما لم أستطع مساعدتك انا اسفة عزيزي :( ')
} finally {

}

}
handler.help = ['removebg']
handler.tags = ['tools']
handler.command = /^(rem)$/i

export default handler
