
let handler = async (m, { conn, text }) => {
  let room = Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))
if (room == undefined) return conn.reply(m.chat,`هممممممم تهبد? لازم تعمل ريبلاي على رسالة الي تبغى تحذفها!`, m)
delete conn.game[room.id]
await conn.reply(m.chat, `تم الحذف`, m)
}
handler.help = ['delttt']
handler.tags = ['game']
handler.command = ['حذف', 'delttt', 'delxo']

export default handler
