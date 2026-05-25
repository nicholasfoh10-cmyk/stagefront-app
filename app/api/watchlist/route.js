import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function POST(request) {
  const body = await request.json();
  const { error } = await supabase.from('watchlist').insert([body]);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id');
  const { data, error } = await supabase
    .from('watchlist')
    .select('*')
    .eq('user_id', user_id)
    .order('event_date', { ascending: true });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ watchlist: data });
}

export async function POST(request) {
  const body = await request.json();
  const key = process.env.SUPABASE_SERVICE_KEY;
  console.log('Using key:', key ? key.substring(0, 20) : 'MISSING');
  const { error } = await supabase.from('watchlist').insert([body]);
  if (error) return Response.json({ error: error.message, key_present: !!key }, { status: 500 });
  return Response.json({ success: true });
}
