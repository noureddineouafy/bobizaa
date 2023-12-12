let handler = async (m, { conn, text }) => {
    if (!text) throw 'هذا الامر يمكنك من كتابة تغريدة مزورة في تويتر مثال: اكتب هكذا \n*.tweet salam noureddine*';
  
    const avatar = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
    const displayName = conn.getName(m.sender);
    const username = conn.user.jid.split('@')[0];
    const replies = '1M'; // Replace with the desired value
    const retweets = '99'; // Replace with the desired value
    const theme = 'dark'; // Replace with the desired value
  
    const url = `https://some-random-api.com/canvas/misc/tweet?displayname=${encodeURIComponent(displayName)}&username=${encodeURIComponent(username)}&avatar=${encodeURIComponent(avatar)}&comment=${encodeURIComponent(text)}&replies=${encodeURIComponent(replies)}&retweets=${encodeURIComponent(retweets)}&theme=${encodeURIComponent(theme)}`;
  
    conn.sendFile(m.chat, url, 'tweet.png', 'تابعني في الانستغرام يا عزيزي \ninstagram.com/noureddine_ouafy', m);
  };
  
  handler.help = ['tweet <comment>'];
  handler.tags = ['maker'];
  handler.command = /^(tweet)$/i;
  
  export default handler;
