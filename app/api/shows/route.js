import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const artistsRes = await fetch('https://api.spotify.com/v1/me/top/artists?limit=20', {
    headers: { 'Authorization': 'Bearer ' + session.accessToken }
  });

  const artistsData = await artistsRes.json();
  const artists = artistsData.items || [];

  const shows = [];

  await Promise.all(artists.slice(0, 10).map(async (artist) => {
    const res = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encodeURIComponent(artist.name)}&classificationName=music&size=3&apikey=${process.env.TICKETMASTER_API_KEY}`
    );
    const data = await res.json();
    const events = data._embedded?.events || [];

    events.forEach(event => {
      shows.push({
        artist: artist.name,
        event: event.name,
        venue: event._embedded?.venues?.[0]?.name || 'TBA',
        city: event._embedded?.venues?.[0]?.city?.name || 'TBA',
        date: event.dates?.start?.localDate || 'TBA',
        status: event.dates?.status?.code || 'unknown',
        url: event.url
      });
    });
  }));

  shows.sort((a, b) => new Date(a.date) - new Date(b.date));

  return Response.json({ shows });
}
