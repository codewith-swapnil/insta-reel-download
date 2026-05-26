import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  const response = await fetch(
    `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi?url=${encodeURIComponent(url)}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 502 });
  }

  const data = await response.json();
  return NextResponse.json(data);
}