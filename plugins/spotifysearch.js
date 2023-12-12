import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'البحث في منصة سبوتيفاي 🌟\n\nالرجاء إدخال الكلمات الرئيسية للبحث عن الأغاني على Spotify.\n\nمثال :\n*.spotifysearch* salade coco';
  try {
    let json = await searchSpotifyTracks(text);
    if (json.length < 1) throw '❌ *Spotify Search* \n\nلم يتم العثور على نتائج.';
    let ini_txt = '✨ *البحث في منصة سبوتيفاي* ✨';
    for (const x of json) {
      ini_txt += `

🎵 *الاسم:* ${x.name}
👥 *الفنان:* ${x.artists.map(v => v.name).join(', ')}
👥 *صاحب الالبوم:* ${x.album.artists.map(v => v.name).join(', ')}
🆔 *رقم:* ${x.id}
📅 *تاريخ اصداره:* ${x.album.release_date}
🆔 *بطاقة التعريف:* ${x.album.id}
🎵 *عدد مسارات الألبوم:* ${x.album.total_tracks}
🔢 *رقم الطراك:* ${x.album.track_number}
⏳ *مدته:* ${x.duration_ms} ms
🔗 *رابطه:* ${x.uri}
🎵 *رابط البومه*: ${x.album.external_urls.spotify}
🔗 *رابط:* ${x.external_urls.spotify}
${x.preview_url ? `🎧 *رابط مباشر:* ${x.preview_url}` : ''}
───────────────────`;
    }
    m.reply(ini_txt);
  } catch (e) {
    throw '❌ *Spotify Search* ❌\n\nحدث خطأ، حاول مرة أخرى لاحقًا.';
  }
};

handler.help = ['spotifysearch'];
handler.tags = ['downloader'];
handler.command = /^spotifysearch$/i;
handler.limit = false;
export default handler;

async function searchSpotifyTracks(query) {
  const clientId = 'acc6302297e040aeb6e4ac1fbdfd62c3';
  const clientSecret = '0e8439a1280a43aba9a5bc0a16f3f009';
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      timeout: 60000, // 60 seconds
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
      headers: { Authorization: `Basic ${auth}` },
    });
    return (await response.json()).access_token;
  };

  const accessToken = await getToken();
  const offset = 10;
  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&offset=${offset}`;
  const response = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();
  return data.tracks.items;
}
