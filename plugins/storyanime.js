let handler = async (m, { conn, usedPrefix, command }) => {
		
			await conn.sendMessage(m.chat, { video: { url: dir[Math.floor(Math.random() * dir.length)] }, caption: `_تابع صاحب البوت في الانستغرام_\ninstagram.com/noureddine_ouafy` }, { quoted: m })
	}

handler.help = ['stories']
handler.tags = ['tools','anime']
handler.command = /^(stories)$/i
handler.limit = false

export default handler

const dir = [
'https://telegra.ph/file/2a7393444c187fdc5025e.mp4' ,
 'https://telegra.ph/file/3d6770157b2688353f003.mp4' ,
 'https://telegra.ph/file/9dafa6fad5b55288cd1cd.mp4' ,
 'https://telegra.ph/file/7220da847885c2b9f6113.mp4' ,
 'https://telegra.ph/file/e5dcc208e32def27520b7.mp4' ,
 'https://telegra.ph/file/180bcb4bab7e465f2d581.mp4' ,
 'https://telegra.ph/file/6658beb59a19e07baf6d7.mp4' ,
 'https://telegra.ph/file/4eb8f4fb858052f87e6cf.mp4' ,
 'https://telegra.ph/file/f9399232ea5dc7594ac83.mp4' ,
  
 
'',
]
