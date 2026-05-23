import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://internshala.com/hiring/search', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36',
        Accept: 'application/json, text/plain, */*',
        Referer: 'https://internshala.com/internships/',
      },
      next: { revalidate: 300 }, // cache for 5 minutes
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
