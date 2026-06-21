import { useScrollFade } from "@/hooks/useScrollFade";
import SectionHeading from "./SectionHeading";
import { educationEntries } from "@/data/education";
import { GraduationCap, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/data/translations";

export default function Education() {
  const { ref, isVisible } = useScrollFade();
  const { lang } = useLanguage();
  const t = translations[lang].education;

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading>{t.heading}</SectionHeading>

      <div
        ref={ref}
        className={`mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {educationEntries.map((entry) => (
          <div
            key={entry.institution}
            className={`p-6 rounded-xl border transition-colors ${
              entry.highlight
                ? "border-amber/50 bg-amber/5 dark:bg-amber/5"
                : "border-border bg-card"
            }`}
          >
            <div className={`inline-flex p-2 rounded-lg mb-4 ${entry.highlight ? "bg-amber/10" : "bg-secondary"}`}>
              <GraduationCap className={`h-5 w-5 ${entry.highlight ? "text-amber" : "text-muted-foreground"}`} />
            </div>

            <h3 className="text-lg font-semibold font-heading mb-1">
              {lang === "de" ? entry.degree_de : entry.degree}
            </h3>
            <p className={`text-base font-medium mb-2 ${entry.highlight ? "text-amber" : "text-muted-foreground"}`}>
              {entry.institution}
            </p>

            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <span className="font-mono text-xs">
                {lang === "de" && entry.period_de ? entry.period_de : entry.period}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {lang === "de" ? entry.location_de : entry.location}
              </span>
            </div>

            {entry.note && (
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                {lang === "de" ? entry.note_de : entry.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}