/**
 * Scrapes https://masjid.life branch listing:
 * - BranchListDistrictWise: all-branch dropdown (detailId + display code + name) + district summary grid
 * - BranchList?distId=X: per-district rows (code, location columns)
 */

import { fetchMasjidHtml } from "@/lib/masjid-home-scrape";

export type ScrapedDistrictSummary = {
  name: string;
  branchCount: number;
};

export type ScrapedBranchRow = {
  /** PK for BranchDetails?id= */
  detailId: string | null;
  /** Public branch code (shown in listings) */
  code: string;
  name: string;
  district: string;
  thana: string;
  union: string;
  village: string;
};

export type MasjidBranchesJson = {
  source: "masjid.life";
  fetchedAt: string;
  headline: string;
  summary: {
    branchCount: number;
    districtCount: number;
  };
  districts: ScrapedDistrictSummary[];
  branches: ScrapedBranchRow[];
};

/** option value="-1" | number, text "CODE | Name" */
export function parseBranchMegaDropdown(
  districtWiseHtml: string,
): Map<string, { detailId: string; name: string }> {
  const byCode = new Map<string, { detailId: string; name: string }>();
  const block = districtWiseHtml.match(
    /id="branchDropDownList"[^>]*>([\s\S]*?)<\/select>/i,
  );
  if (!block) return byCode;
  const optRe =
    /<option[^>]*value="(-?\d+)"[^>]*>\s*([\s\S]*?)<\/option>/gi;
  let m: RegExpExecArray | null;
  while ((m = optRe.exec(block[1])) !== null) {
    const vid = m[1];
    if (vid === "-1") continue;
    const raw = m[2].replace(/<[^>]+>/g, "").trim();
    const pipe = raw.indexOf("|");
    if (pipe === -1) continue;
    const code = raw.slice(0, pipe).trim();
    const name = raw.slice(pipe + 1).trim();
    if (!/^\d+$/.test(code)) continue;
    byCode.set(code, { detailId: vid, name });
  }
  return byCode;
}

export function parseDistrictSummaryGrid(
  districtWiseHtml: string,
): ScrapedDistrictSummary[] {
  const tableMatch = districtWiseHtml.match(
    /id="MainContent_GridView1"[^>]*>([\s\S]*?)<\/table>/i,
  );
  if (!tableMatch) return [];
  const chunk = tableMatch[1];
  if (!/<th[^>]*>\s*No of Branches\s*<\/th>/i.test(chunk)) return [];

  const out: ScrapedDistrictSummary[] = [];
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let rm: RegExpExecArray | null;
  while ((rm = rowRe.exec(chunk)) !== null) {
    const row = rm[1];
    if (/Sl\.?\s*No/i.test(row) && /District/i.test(row)) continue;
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((c) =>
      c[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
    );
    if (cells.length < 3) continue;
    const district = cells[1];
    const countRaw = cells[2].replace(/[, ]/g, "");
    const n = parseInt(countRaw, 10);
    if (!district || !Number.isFinite(n)) continue;
    out.push({ name: district, branchCount: n });
  }
  return out;
}

export function parseHeadlineDistrictWise(html: string): string {
  const m = html.match(
    /<span id="MainContent_displayText"[^>]*>([\s\S]*?)<\/span>/i,
  );
  return m ? m[1].replace(/<[^>]+>/g, "").trim() : "";
}

export function parseDistrictDropdown(
  branchListHtml: string,
): { distId: string; name: string }[] {
  const block = branchListHtml.match(
    /id="MainContent_DistrictDropDownList"[^>]*>([\s\S]*?)<\/select>/i,
  );
  if (!block) return [];
  const out: { distId: string; name: string }[] = [];
  const optRe = /<option[^>]*value="(-?\d+)"[^>]*>([\s\S]*?)<\/option>/gi;
  let m: RegExpExecArray | null;
  while ((m = optRe.exec(block[1])) !== null) {
    if (m[1] === "-1") continue;
    out.push({
      distId: m[1],
      name: m[2].replace(/<[^>]+>/g, "").trim(),
    });
  }
  return out;
}

/** Branch list grid: Code, Branch Name, District, Thana, Union, Village */
export function parseBranchListGrid(branchListHtml: string): Omit<
  ScrapedBranchRow,
  "detailId"
>[] {
  const tableMatch = branchListHtml.match(
    /id="MainContent_GridView1"[^>]*>([\s\S]*?)<\/table>/i,
  );
  if (!tableMatch) return [];
  const chunk = tableMatch[1];
  if (!/<th[^>]*>\s*Thana\s*<\/th>/i.test(chunk)) return [];

  const out: Omit<ScrapedBranchRow, "detailId">[] = [];
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let rm: RegExpExecArray | null;
  while ((rm = rowRe.exec(chunk)) !== null) {
    const row = rm[1];
    if (/Code/i.test(row) && /Branch Name/i.test(row)) continue;
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((c) =>
      c[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
    );
    if (cells.length < 7) continue;
    const code = cells[1];
    const name = cells[2];
    const district = cells[3];
    const thana = cells[4];
    const union = cells[5];
    const village = cells[6];
    if (!code || !/^\d+$/.test(code)) continue;
    if (!name || name === "\u00a0") continue;
    out.push({ code, name, district, thana, union, village });
  }
  return out;
}

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, idx: number) => Promise<R>,
): Promise<R[]> {
  const ret: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    for (;;) {
      const i = next++;
      if (i >= items.length) break;
      ret[i] = await fn(items[i], i);
    }
  }
  const n = Math.max(1, Math.min(concurrency, items.length || 1));
  await Promise.all(Array.from({ length: n }, () => worker()));
  return ret;
}

export async function scrapeBranchesForJson(): Promise<MasjidBranchesJson> {
  const districtWise = await fetchMasjidHtml("/AdminPage/BranchListDistrictWise");

  const headline = parseHeadlineDistrictWise(districtWise);
  const districts = parseDistrictSummaryGrid(districtWise);
  const byCode = parseBranchMegaDropdown(districtWise);

  const seedList = await fetchMasjidHtml(
    "/AdminPage/BranchList?distId=14",
  );
  const distOpts = parseDistrictDropdown(seedList);
  const distIds = distOpts.map((d) => d.distId);

  const perDistrict = await mapPool(distIds, 6, async (distId) => {
    const html = await fetchMasjidHtml(
      `/AdminPage/BranchList?distId=${encodeURIComponent(distId)}`,
    );
    return parseBranchListGrid(html);
  });

  const merged = new Map<string, ScrapedBranchRow>();
  for (const rows of perDistrict) {
    for (const r of rows) {
      const meta = byCode.get(r.code);
      merged.set(r.code, {
        detailId: meta?.detailId ?? null,
        code: r.code,
        name: meta?.name ?? r.name,
        district: r.district,
        thana: r.thana,
        union: r.union,
        village: r.village,
      });
    }
  }

  for (const [code, { detailId, name }] of byCode) {
    if (merged.has(code)) {
      const row = merged.get(code)!;
      row.detailId = detailId;
      row.name = name;
      continue;
    }
    merged.set(code, {
      detailId,
      code,
      name,
      district: "",
      thana: "",
      union: "",
      village: "",
    });
  }

  const branches = [...merged.values()].sort((a, b) =>
    a.code.localeCompare(b.code, undefined, { numeric: true }),
  );

  const branchCount = branches.length;
  const districtCount = districts.length;

  return {
    source: "masjid.life",
    fetchedAt: new Date().toISOString(),
    headline,
    summary: {
      branchCount,
      districtCount,
    },
    districts,
    branches,
  };
}
