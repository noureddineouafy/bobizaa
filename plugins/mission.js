let handler = async (m, { conn }) => {
    
    const name = conn.getName(m.sender);
    let videoUrl = 'https://telegra.ph/file/3730115217e34afa7f21a.mp4';
    let tagUser = '@' + m.sender.split("@s.whatsapp.net")[0];
    let more = String.fromCharCode(8206);
    let teks = `${pickRandom([`*◞♥️بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ♥️◜*
 *↻╍╍━┛🕋┗━╍╍↺*
*◞{إِنَّمَا ٱلتَّوۡبَةُ عَلَى ٱللَّهِ لِلَّذِينَ يَعۡمَلُونَ ٱلسُّوٓءَ بِجَهَٰلَةٖ ثُمَّ يَتُوبُونَ مِن قَرِيبٖ فَأُوْلَٰٓئِكَ يَتُوبُ ٱللَّهُ عَلَيۡهِمۡۗ وَكَانَ ٱللَّهُ عَلِيمًا حَكِيمٗا}◜*
*↻╍╍━┛🕋┗━╍╍↺*
*◞❐ أهـلا وسـهـلاً بـك يـا${taguser}
*◞❐ إسـم الـبـوت ⇠『LUFFY』
*◞❐ إسـم الـمـنـصـة ⇠『HEROKU』◈◜*
*◞❐ الـمـطـور ⇠『JOHAN』
*◞❐ عـدد الـمـسـتـخـدمـيـن ⇠『${retotalreg}』
*◞❐ وقـت الـتـشـغـيـل ⇠『${uptime}』
*◞❐ الـتـوقـيـت ⇠『${date}』
*◞❐ الـإصـدار الـجـديـد ⇠『...』
*◞❐ ـطـلـب قـائـمـة الـأوامـر إكـتـب ⇠『المهام』j
*◞❐ مـلاحـظـة 🛑 ◈◜*
*◞❐ يـجـب عـلـيـك كـتـابـة نـقـطـة قـبـل كـل أمـر مـثـل ⇠ 『 .تـخـمـيـن 』◈◜*
`])}`.trim();

    conn.sendMessage(m.chat, {
        video: { url: videoUrl },
        caption: teks,
        mimetype: 'video/mp4',
        filename: 'video.mp4'
    }, { quoted: m });
};

handler.command = ['list','ليست','الاوامر','اوامر'];


export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
