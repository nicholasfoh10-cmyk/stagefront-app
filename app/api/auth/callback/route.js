export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return Response.json({ error: 'No code provided' }, { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = 'https://localhost:3000/api/auth/callback';

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    })
  });

  const tokens = await response.json();

  if (!tokens.access_token) {
    return Response.json({ error: 'Failed to get token' }, { status: 400 });
  }

  const userResponse = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50', {
    headers: { 'Authorization': 'Bearer ' + tokens.access_token }
  });

  const userData = await userResponse.json();
  const artists = userData.items?.map(a => ({ id: a.id, name: a.name })) || [];

  return Response.redirect(`http://localhost:3000/dashboard?artists=${encodeURIComponent(JSON.stringify(artists))}`);
}