import cp, { exec as _exec } from "child_process";
import { promisify } from "util";
let exec = promisify(_exec).bind(cp);

let handler = async (m, { conn, isROwner, usedPrefix, command, text }) => {
	await m.reply(global.wait);
	if (!isROwner) return;
	let ar = Object.keys(plugins);
	let ar1 = ar.map((v) => v.replace(".js", ""));
	if (!text)
		throw `هذا الامر خاص بالحصول على كود اي ميزة لديك في السكريبت مثال:\n${usedPrefix + command} bard`;
	if (!ar1.includes(text))
		return m.reply(`🗃️ الــ plugin التي تبحث عنها غير موجودة عندك في السكريبت 😐 هذه هي الميزات التي توجد عندك في السكريبت :  !\n\n${ar1.map((v) => " " + v).join`\n`}`);
	let o;
	try {
		o = await exec("cat plugins/" + text + ".js");
	} catch (e) {
		o = e;
	} finally {
		let { stdout, stderr } = o;
		if (stdout.trim()) m.reply(stdout);
		if (stderr.trim()) m.reply(stderr);
	}
};
handler.help = ["getplugin"];
handler.tags = ['owner'];
handler.command = /^(getplugin|gp)$/i;
handler.rowner = true;

export default handler;