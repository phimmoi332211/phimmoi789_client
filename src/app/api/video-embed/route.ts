import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const embedUrl = searchParams.get('url');

  if (!embedUrl) {
    return NextResponse.json({ error: 'Missing embed URL' }, { status: 400 });
  }

  try {
    const response = await fetch(embedUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch embed URL: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Extract script content using regex
    const scriptMatch = html.match(/<script>\s*const\s+vid\s*=\s*"([^"]+)";\s*const\s+url\s*=\s*"([^"]+)";\s*const\s+pic\s*=\s*"([^"]+)";\s*const\s+resumeKey\s*=\s*"([^"]+)";\s*<\/script>/);
    
    if (!scriptMatch) {
      throw new Error('Could not find video data in embed URL');
    }
    
    const [, vid, url, pic, resumeKey] = scriptMatch;
    
    return NextResponse.json({
      vid,
      url,
      pic,
      resumeKey
    });
  } catch (error) {
    console.error('Error parsing video embed URL:', error);
    return NextResponse.json({ error: 'Failed to parse video data' }, { status: 500 });
  }
} 