import { useScrollFade } from "@/hooks/useScrollFade";
import SectionHeading from "./SectionHeading";
import { experienceEntries } from "@/data/experience";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/data/translations";

function TimelineEntry({ entry, lang }) {
  const { ref, isVisible } = useScrollFade(0.2);

  const role = lang === "de" ? entry.role_de : entry.role;
  const location = lang === "de" ? entry.location_de : entry.location;
  const highlights = lang === "de" ? entry.highlights_de : entry.highlights;

  return (
    <div
      ref={ref}
      className={`relative pl-8 pb-12 last:pb-0 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="absolute left-[7px] top-3 bottom-0 w-[2px] bg-amber/20 last:hidden" />
      <div
        className={`absolute left-0 top-2.5 w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
          isVisible ? "border-amber bg-amber/20" : "border-border bg-background"
        }`}
      >
        <div className={`absolute inset-1 rounded-full transition-colors duration-300 ${isVisible ? "bg-amber" : "bg-border"}`} />
      </div>

      <div className="ml-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
          <h3 className="text-xl font-semibold font-heading">{role}</h3>
          <span className="text-sm font-mono text-amber">{entry.period}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
          <p className="text-base font-medium text-muted-foreground">{entry.company}</p>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {location}
          </span>
        </div>
        <ul className="space-y-2">
          {highlights.map((h, i) => (
            <li key={i} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
              <span className="shrink-0 w-1 h-1 rounded-full bg-amber mt-2" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  const { lang } = useLanguage();
  const t = translations[lang].experience;

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading>{t.heading}</SectionHeading>
      <div className="mt-12 max-w-3xl">
        {experienceEntries.map((entry) => (
          <TimelineEntry key={entry.company} entry={entry} lang={lang} />
        ))}
      </div>
    </section>
  );
}