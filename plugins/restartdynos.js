import request from 'request'
let handler = async (m, { conn, usedPrefix, command, args }) => {
  let q = m.quoted ? m.quoted : m;
  if (!/text/.test(q.text)) {
    var token = process.env['HEROKU_API_KEY']
    const appName = process.env['HEROKU_APP_NAME']

    request.delete(
      {
        url: 'https://api.heroku.com/apps/' + appName + '/dynos/',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.heroku+json; version=3',
          'Authorization': 'Bearer ' + token
        }
      },
      function (error, response, body) {
        if (error) {
          console.error(error);
        } else {
     console.log(response.statusCode);
          console.log(body);
          if (response.statusCode == 202) {
            m.reply('تم إعادة تشغيل جميع dynos بنجاح');
          } else {
            m.reply('حدث خطأ أثناء إعادة تشغيل dynos\nربما بسبب عدم تواجد apikey و appname\nأم انك قمت بفعل هذا الامر مسبقا');
          }
        }
      }
    );

  }
}
handler.command = ["restartdynos"]
handler.help = ['restartdynos']
handler.tags = [ 'owner' ]
handler.owner = true
export default handler