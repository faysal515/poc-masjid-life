import { NextResponse } from "next/server";
import { scrapeBorrowersForJson } from "@/lib/masjid-borrowers-scrape";

export const dynamic = "force-dynamic";

/** Full BorrowerList payload (~large upstream HTML). Client applies search/filters. */
export async function GET() {
  try {
    const data = await scrapeBorrowersForJson();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "private, no-store",
      },
    });
  } catch (e) {
    console.error("[api/scrape/borrowers]", e);
    return NextResponse.json(
      {
        error: e instanceof Error ? e.message : "Borrower scrape failed",
      },
      { status: 502 },
    );
  }
}
