let handler = async (m, { conn }) => {

m.reply(`*قناتي على اليوتيوب:*\n
*https://www.youtube.com/@JoAnimi1*
*تابعني هناك♥*`)
}
handler.help = ['channel']
handler.tags = ['infobot']
handler.command = /^(channel)$/i

export default handler;
