import { NextResponse } from "next/server";
import { scrapeBranchesForJson } from "@/lib/masjid-branches-scrape";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await scrapeBranchesForJson();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
      },
    });
  } catch (e) {
    console.error("[api/scrape/branches]", e);
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Failed to fetch branches",
      },
      { status: 502 },
    );
  }
}
