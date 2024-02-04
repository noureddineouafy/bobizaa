let handler = async (m, {command, text, conn, usedPrefix}) => {

let url = 'مرحبًا عزيزي المستخدمين: واتساب. أنا مدير شركة: واتساب. أنا أستأجر شخصًا لصنع أفلام إباحية. هل تريد كسب 2000-1000 دخل إضافي من التسوق عبر الإنترنت؟ اتصل بالمدير. العمالة والدخل 04:88. AZN!
https://api.whatsapp.com/send?phone=';
let a7a = url + text;
await conn.reply(m.chat, a7a, m);
}
    handler.help = ['تبنيد'];
    handler.tags = ['K U R O S A K I'];
    handler.command = /^(فنش2)$/i

    export default handler;