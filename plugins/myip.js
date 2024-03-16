import http from 'http'
let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
    
                http.get({
                    'host': 'api.ipify.org',
                    'port': 80,
                    'path': '/'
                }, function(resp) {
                    resp.on('data', function(ip) {
                        m.reply("🔎 My public IP address is: " + ip);
                    })
                })
}
handler.help = ['myip']
handler.tags = ['owner']
handler.command = /^(myip)$/i
handler.owner= true
export default handler
