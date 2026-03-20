/**
 * Scrapes https://masjid.life/AdminPage/BorrowerList (ASP.NET WebForms).
 * Single GET: page filter dropdown options + borrower grid. Search/filters are for the client UI.
 */

import { fetchMasjidHtml } from "@/lib/masjid-home-scrape";

export const BORROWER_LIST_PATH = "/AdminPage/BorrowerList";

export type BorrowerFilterOption = {
  value: string;
  label: string;
};

export type ScrapedBorrowerRow = {
  /** ASP.NET __EVENTTARGET for the row’s Details link (detail scrape later). */
  detailsEventTarget: string;
  branchCode: string;
  borrowerCode: string;
  borrowerName: string;
  disbursed: number;
  recovered: number;
  balance: number;
};

export type MasjidBorrowersJson = {
  source: "masjid.life";
  fetchedAt: string;
  filterOptions: {
    loanTypes: BorrowerFilterOption[];
    branches: BorrowerFilterOption[];
    religions: BorrowerFilterOption[];
  };
  borrowers: ScrapedBorrowerRow[];
};

function stripTags(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function parseMoney(s: string): number {
  const n = parseInt(s.replace(/[, ]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

export function parseBorrowerFilterSelects(
  html: string,
): MasjidBorrowersJson["filterOptions"] {
  const loanTypes = parseSelectOptions(html, "MainContent_loanTypeDropDownList");
  const branches = parseSelectOptions(html, "MainContent_branchDropDownList");
  const religions = parseSelectOptions(
    html,
    "MainContent_religionDropDownList",
  );
  return { loanTypes, branches, religions };
}

function parseSelectOptions(
  html: string,
  elementId: string,
): BorrowerFilterOption[] {
  const reBlock = new RegExp(
    `id="${elementId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>([\\s\\S]*?)<\\/select>`,
    "i",
  );
  const block = html.match(reBlock);
  if (!block) return [];
  const inner = block[1];
  const out: BorrowerFilterOption[] = [];
  const optRe =
    /<option\b[^>]*value="([^"]*)"[^>]*>([\s\S]*?)<\/option>/gi;
  let m: RegExpExecArray | null;
  while ((m = optRe.exec(inner)) !== null) {
    out.push({
      value: m[1],
      label: stripTags(m[2]),
    });
  }
  return out;
}

function parseDetailsEventTarget(detailsCellHtml: string): string | null {
  const dec = detailsCellHtml
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
  const m = dec.match(/__doPostBack\(\s*'([^']*)'/i);
  return m ? m[1] : null;
}

export function parseBorrowerGrid(html: string): ScrapedBorrowerRow[] {
  const tableMatch = html.match(
    /id="MainContent_GridView1"[^>]*>([\s\S]*?)<\/table>/i,
  );
  if (!tableMatch) return [];

  const out: ScrapedBorrowerRow[] = [];
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let rm: RegExpExecArray | null;
  while ((rm = rowRe.exec(tableMatch[1])) !== null) {
    const row = rm[1];
    if (/<th\b/i.test(row)) continue;

    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(
      (c) => c[1],
    );
    if (cells.length < 6) continue;

    const detailsTarget = parseDetailsEventTarget(cells[0]);
    if (!detailsTarget) continue;

    const branchCode = stripTags(cells[1]);
    const codeNameRaw = stripTags(cells[2]);
    const pipe = codeNameRaw.indexOf("|");
    const borrowerCode =
      pipe === -1 ? codeNameRaw.trim() : codeNameRaw.slice(0, pipe).trim();
    const borrowerName =
      pipe === -1 ? "" : codeNameRaw.slice(pipe + 1).trim();

    out.push({
      detailsEventTarget: detailsTarget,
      branchCode,
      borrowerCode,
      borrowerName,
      disbursed: parseMoney(stripTags(cells[3])),
      recovered: parseMoney(stripTags(cells[4])),
      balance: parseMoney(stripTags(cells[5])),
    });
  }
  return out;
}

export async function scrapeBorrowersForJson(): Promise<MasjidBorrowersJson> {
  const html = await fetchMasjidHtml(BORROWER_LIST_PATH);
  return {
    source: "masjid.life",
    fetchedAt: new Date().toISOString(),
    filterOptions: parseBorrowerFilterSelects(html),
    borrowers: parseBorrowerGrid(html),
  };
}
