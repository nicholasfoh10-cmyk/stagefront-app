export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = 'https://localhost:3000/api/auth/callback';  
  const scopes = [
    'user-top-read',
    'user-follow-read',
  ].join(' ');

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri,
  });

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  
  return Response.redirect(spotifyAuthUrl);
}