
let handler = async (m, { conn, args, text, usedPrefix , command }) => {




    let amount = parseInt(args[0])
    let color = args[1]?.toLowerCase()
    if (args.length < 2 )  throw `🎪 استخدام الأمر: ${usedPrefix + Command} <amount> <color>\n\n مثال: ${usedPrefix + Command} 500 أحمر`
    let colores = ['red', 'black']
    let colour = colores[Math.floor(Math.random() * colores.length)];
    let user = global.db.data.users[m.sender]
    if (isNaN(amount) || amount < 500) throw `🎰 الحد الأدنى للرهان هو 500 ذهب`
    if (!colores.includes(color)) throw '😑 يجب تحديد لون صالح: أحمر أو أسود'
    if (user.credit < amount) throw '😶 ليس لديك ما يكفي من الذهب!'
    if (amount > 100000) throw `🟥 *لا يمكنك المراهنة بالذهب بأكثر من 100000*`
   let result = ''
    if (colour == color) {
        result = `${colour == 'red' ? 'هبطت الكرة على 🔴' : 'هبطت الكرة على ⚫'} \n\nلقد فزت بذهبية قدرها ${amount * 2}.`
        user.credit += amount * 2
    } else {
        result = `${colour == 'red' ? 'هبطت الكرة على 🔴' : 'هبطت الكرة على ⚫'} \n\nلقد خسرت ${amount} من الذهب`
        user.credit -= amount
    }
    m.reply(نتيجة)
}
handler.help = ['roulette <amount> <color(red/black)>']
handler.tags = ['economy']
handler.command = ['الروليت', 'rt']

handler.group = true

export default handler
