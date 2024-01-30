let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw '✳️ علامة المستخدم'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw '✳️ أدخل كمية *الذهب* التي تريد إضافتها'
    if (isNaN(txt)) throw '🔢 أرقام فقط'
    let dmt = parseInt(txt)
    let diamond = dmt
    
    if (diamond < 1) throw '✳️ الحد الأدنى *1*'
    let users = global.db.data.users
   users[who].credit += dmt

    await m.reply(`≡ *تمت إضافة الذهب*
┌──────────────
▢ *المجموع:* ${dmt}
└──────────────`)
   conn.fakeReply(m.chat, `▢هل استقبلت \n\n *+${dmt}* ذهب`, من, m.text)
}

handler.help = ['addgold <@user>']
handler.tags = ['economy']
handler.command = ['إضافة_الذهب'] 
handler.rowner = true

export default handler
