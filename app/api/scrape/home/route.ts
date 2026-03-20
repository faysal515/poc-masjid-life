import { NextResponse } from "next/server";
import { scrapeMasjidHomeForJson } from "@/lib/masjid-home-scrape";

/** Always scrape on demand (BorrowerList uses no-store fetch). */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await scrapeMasjidHomeForJson();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch (e) {
    console.error("[api/scrape/home]", e);
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Failed to fetch masjid.life",
      },
      { status: 502 },
    );
  }
}
