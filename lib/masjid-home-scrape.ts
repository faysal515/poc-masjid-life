/** Types + pure parse helpers for https://masjid.life homepage scraper */

import type { StatData } from "@/lib/types";

export const MASJID_LIVE_ORIGIN = "https://masjid.life";

export type ScrapedProgramRow = {
  slug: string;
  titleEn: string;
  href: string;
  issues?: number;
  issuedTaka?: number;
  collectedTaka?: number;
};

export type MasjidHomeJson = {
  source: "masjid.life";
  fetchedAt: string;
  impact: {
    /** Total loan issued (BDT), raw integer */
    loanIssuedTaka: number;
    /** One decimal for ৳X কোটি style display */
    loanCroreMajor: string;
    /** Shown on live site overview as donor count (matches prior demo card). */
    donors: number;
    branches: number;
  };
  live: {
    branches: number;
    districtsCovered: number;
    donors: number;
    totalDonation: number;
    lenders: number;
    lendersBalance: number;
    disabledPeopleHelped: number;
    donationToDisabled: number;
    noOfTubewell: number;
    tubewellDonation: number;
    availableFundToBranches: number;
    availableFundToMDL: number;
    totalLoanIssued: number;
    loanRecovery: number;
    outstandingLoan: number;
    overdueLoan: number;
    overduePercent: number;
    borrowerCount: number;
    nonMuslimBorrowers: number;
    loanIssuedToNonMuslim: number;
    dataAsOfEn: string;
    /** Admin fee is not scraped; remains symbolic in UI */
    adminFeeDisplay: string;
  };
  programs: ScrapedProgramRow[];
};

const COOKIE = "AspxAutoDetectCookieSupport=1";

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (compatible; MasjidLifeDemo/1.0; +https://masjid.life)",
  Accept: "text/html,application/xhtml+xml",
  Cookie: COOKIE,
} as const;

export function loanCroreMajorFromTaka(loanIssued: number): string {
  const crore = loanIssued / 10_000_000;
  return (Math.round(crore * 10) / 10).toLocaleString("en-BD", {
    minimumFractionDigits: crore >= 10 ? 0 : 1,
    maximumFractionDigits: 1,
  });
}

export function liveToStatData(live: MasjidHomeJson["live"]): StatData {
  return {
    branches: live.branches,
    districtsCovered: live.districtsCovered,
    donors: live.donors,
    totalDonation: live.totalDonation,
    totalLoanIssued: live.totalLoanIssued,
    loanRecovery: live.loanRecovery,
    outstandingLoan: live.outstandingLoan,
    overdueLoan: live.overdueLoan,
    overduePercent: live.overduePercent,
    borrowerCount: live.borrowerCount,
    disabledPeopleHelped: live.disabledPeopleHelped,
    nonMuslimBorrowers: live.nonMuslimBorrowers,
    dataAsOf: live.dataAsOfEn,
  };
}

export async function fetchMasjidHtml(path: string): Promise<string> {
  const url = new URL(path, MASJID_LIVE_ORIGIN).toString();
  /** BorrowerList HTML is several MB; do not store in Next data cache (2MB cap). */
  const isBorrowerList = path.includes("BorrowerList");
  const res = await fetch(url, {
    headers: FETCH_HEADERS,
    ...(isBorrowerList
      ? { cache: "no-store" as RequestCache }
      : { next: { revalidate: 120 } }),
  });
  if (!res.ok) throw new Error(`Masjid fetch ${path}: ${res.status}`);
  return res.text();
}

function spanInner(html: string, id: string): string | null {
  const esc = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `<span[^>]*id="${esc}"[^>]*>([\\s\\S]*?)</span>`,
    "i",
  );
  const m = html.match(re);
  if (!m) return null;
  return m[1].replace(/<[^>]+>/g, "").trim();
}

function parseMoney(s: string): number {
  const n = parseInt(String(s).replace(/[, ]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

function parseIntSafe(s: string): number {
  const n = parseInt(String(s).replace(/[, ]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

function parsePercent(s: string): number {
  const m = String(s).match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function hrefToSlug(href: string): string | null {
  const raw = decodeURIComponent(href.trim());
  const h = raw.toLowerCase();
  const [pathPart, query = ""] = h.split("?");
  const q = query.toLowerCase();

  if (pathPart.includes("borrowerlistall")) {
    if (q.includes("project loan_cow")) return "cow-loan";
    if (q.includes("project loan_education")) return "education-loan";
    if (q.includes("project loan_masjid")) return "masjid-repair";
    return null;
  }

  if (
    /borrowerlist(\.aspx)?$/i.test(pathPart.split("/").pop() ?? "") &&
    !pathPart.includes("borrowerview")
  ) {
    return "interest-free-loan";
  }

  if (q.includes("beneficiarytypeid=2")) return "help-disabled";
  if (q.includes("beneficiarytypeid=3")) return "tubewell";
  if (pathPart.includes("educationforunprivileged")) return "education-unprivileged";
  if (pathPart.includes("bridgingpeople")) return "bridging";
  return null;
}

/** Borrower count and optional sync from BorrowerList hero line */
export function parseBorrowerListHtml(html: string): { borrowerCount: number } {
  const text =
    spanInner(html, "MainContent_displayText") ??
    html.match(
      /interest free loan served to\s*([\d,]+)\s*borrowers/i,
    )?.[0] ??
    "";
  const m = text.match(/([\d,]+)\s*borrowers/i);
  return { borrowerCount: m ? parseIntSafe(m[1]) : 0 };
}

function parseProductLinks(html: string): ScrapedProgramRow[] {
  const start = html.indexOf(">Our products/services<");
  if (start === -1) return [];
  const slice = html.slice(start, start + 12000);
  const linkRe =
    /<a\b[^>]*\bhref="([^"]+)"[^>]*>\s*([^<]+?)\s*<\/a>/gi;
  const seen = new Set<string>();
  const out: ScrapedProgramRow[] = [];
  let m: RegExpExecArray | null;
  while ((m = linkRe.exec(slice)) !== null) {
    const href = m[1].replace(/^\.\./, "");
    const titleEn = m[2].trim();
    const slug = hrefToSlug(href);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    out.push({ slug, titleEn, href });
  }
  return out;
}

function parseLoanTypeGrid(html: string): Map<
  string,
  { issues: number; issuedTaka: number; collectedTaka: number }
> {
  const map = new Map<
    string,
    { issues: number; issuedTaka: number; collectedTaka: number }
  >();
  const block = html.match(
    /id="MainContent_loanTypeGridView"[^>]*>([\s\S]*?)<\/table>/i,
  );
  if (!block) return map;
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let rm: RegExpExecArray | null;
  let header = true;
  while ((rm = rowRe.exec(block[1])) !== null) {
    const row = rm[1];
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((x) =>
      x[1].replace(/<[^>]+>/g, "").trim(),
    );
    if (cells.length < 4) continue;
    if (header && /project name/i.test(cells[0])) {
      header = false;
      continue;
    }
    header = false;
    const [name, issues, issued, collected] = cells;
    const slug =
      /^cow/i.test(name)
        ? "cow-loan"
        : /^education/i.test(name)
          ? "education-loan"
          : /^masjid/i.test(name)
            ? "masjid-repair"
            : null;
    if (!slug) continue;
    map.set(slug, {
      issues: parseIntSafe(issues),
      issuedTaka: parseMoney(issued),
      collectedTaka: parseMoney(collected),
    });
  }
  return map;
}

export function parseHomeHtml(
  homeHtml: string,
  borrowerCount: number,
): MasjidHomeJson {
  const grid = parseLoanTypeGrid(homeHtml);
  let programs = parseProductLinks(homeHtml);
  programs = programs.map((p) => {
    const g = grid.get(p.slug);
    if (!g) return p;
    return {
      ...p,
      issues: g.issues,
      issuedTaka: g.issuedTaka,
      collectedTaka: g.collectedTaka,
    };
  });

  const loanIssued = parseMoney(
    spanInner(homeHtml, "MainContent_loanIssuedLabel") ?? "0",
  );
  const loanCroreMajor = loanCroreMajorFromTaka(loanIssued);

  const dataAsOfEn =
    spanInner(homeHtml, "MainContent_transactionDateLabel")?.replace(
      /^Data as on\s*/i,
      "",
    ) ?? "";

  return {
    source: "masjid.life",
    fetchedAt: new Date().toISOString(),
    impact: {
      loanIssuedTaka: loanIssued,
      loanCroreMajor,
      donors: parseIntSafe(spanInner(homeHtml, "MainContent_noOfDonorsLabel") ?? "0"),
      branches: parseIntSafe(
        spanInner(homeHtml, "MainContent_noOfBranchesLabel") ?? "0",
      ),
    },
    live: {
      branches: parseIntSafe(
        spanInner(homeHtml, "MainContent_noOfBranchesLabel") ?? "0",
      ),
      districtsCovered: parseIntSafe(
        spanInner(homeHtml, "MainContent_districtCoveredLabel") ?? "0",
      ),
      donors: parseIntSafe(
        spanInner(homeHtml, "MainContent_noOfDonorsLabel") ?? "0",
      ),
      totalDonation: parseMoney(
        spanInner(homeHtml, "MainContent_donationReceivedLabel") ?? "0",
      ),
      lenders: parseIntSafe(
        spanInner(homeHtml, "MainContent_noOfLendersLabel") ?? "0",
      ),
      lendersBalance: parseMoney(
        spanInner(homeHtml, "MainContent_LendersBalanceLabel") ?? "0",
      ),
      disabledPeopleHelped: parseIntSafe(
        spanInner(homeHtml, "MainContent_noOfDisabledLabel1") ??
          spanInner(homeHtml, "MainContent_noOfDisabledLabel") ??
          "0",
      ),
      donationToDisabled: parseMoney(
        spanInner(homeHtml, "MainContent_donationToDisabledLabel") ?? "0",
      ),
      noOfTubewell: parseIntSafe(
        spanInner(homeHtml, "MainContent_noOfTubewellLabel") ?? "0",
      ),
      tubewellDonation: parseMoney(
        spanInner(homeHtml, "MainContent_tubewellDonationLabel") ?? "0",
      ),
      availableFundToBranches: parseMoney(
        spanInner(homeHtml, "MainContent_availableFundToBranchesLabel") ?? "0",
      ),
      availableFundToMDL: parseMoney(
        spanInner(homeHtml, "MainContent_availableFundToMDLLabel") ?? "0",
      ),
      totalLoanIssued: loanIssued,
      loanRecovery: parseMoney(
        spanInner(homeHtml, "MainContent_loanRecoveryLabel") ?? "0",
      ),
      outstandingLoan: parseMoney(
        spanInner(homeHtml, "MainContent_outstandingLoanLabel") ?? "0",
      ),
      overdueLoan: parseMoney(
        spanInner(homeHtml, "MainContent_overdueLoanLabel") ?? "0",
      ),
      overduePercent: parsePercent(
        spanInner(homeHtml, "MainContent_percentOfOverdueLoanLabel") ?? "0",
      ),
      borrowerCount,
      nonMuslimBorrowers: parseIntSafe(
        spanInner(homeHtml, "MainContent_noOfNonMuslimLabel") ?? "0",
      ),
      loanIssuedToNonMuslim: parseMoney(
        spanInner(homeHtml, "MainContent_loanIssuedToNonMuslimLabel") ?? "0",
      ),
      dataAsOfEn,
      adminFeeDisplay: "0%",
    },
    programs,
  };
}

export async function scrapeMasjidHomeForJson(): Promise<MasjidHomeJson> {
  const [homeHtml, borrowerHtml] = await Promise.all([
    fetchMasjidHtml("/Default"),
    fetchMasjidHtml("/AdminPage/BorrowerList"),
  ]);
  const { borrowerCount } = parseBorrowerListHtml(borrowerHtml);
  return parseHomeHtml(homeHtml, borrowerCount);
}
