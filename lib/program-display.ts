import type { Program } from "@/lib/types";

/**
 * Map masjid.life “Our products/services” English labels to emoji + theme color.
 * Order matters: more specific phrases before generic ones.
 */
export function iconAndColorForProgramEnglishName(
  name: string,
): Pick<Program, "icon" | "color"> {
  const n = name.trim().toLowerCase().replace(/\s+/g, " ");

  if (n.includes("underprivileged")) return { icon: "🎓", color: "teal" };
  if (n.includes("interest") && n.includes("free"))
    return { icon: "🤝", color: "brand" };
  if (n.includes("cow")) return { icon: "🐄", color: "green" };
  if (n.includes("masjid") || n.includes("mosque repair"))
    return { icon: "🕌", color: "amber" };
  if (n.includes("education")) return { icon: "📚", color: "blue" };
  if (n.includes("disabled")) return { icon: "♿", color: "purple" };
  if (n.includes("tubewell") || n.includes("tube well"))
    return { icon: "💧", color: "cyan" };
  if (n.includes("bridging")) return { icon: "🌉", color: "indigo" };

  return { icon: "📌", color: "brand" };
}
