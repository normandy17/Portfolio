import { useScrollFade } from "@/hooks/useScrollFade";
import SectionHeading from "./SectionHeading";
import { MapPin, Briefcase, Globe, Target } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/data/translations";

const FACT_ICONS = [MapPin, Briefcase, Globe, Target];
const FACT_KEYS = ["location", "workAuth", "languages", "openTo"];

export default function About() {
  const { ref, isVisible } = useScrollFade();
  const { lang } = useLanguage();
  const t = translations[lang].about;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading>{t.heading}</SectionHeading>

      <div
        ref={ref}
        className={`mt-12 grid md:grid-cols-5 gap-12 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Bio */}
        <div className="md:col-span-3">
          <p className="text-lg leading-relaxed text-muted-foreground" style={{ lineHeight: "1.7" }}>
            {t.bio}
          </p>
        </div>

        {/* Quick Facts */}
        <div className="md:col-span-2 space-y-4">
          {FACT_KEYS.map((key, i) => {
            const Icon = FACT_ICONS[i];
            return (
              <div key={key} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-light dark:bg-secondary shrink-0">
                  <Icon className="h-4 w-4 text-amber" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-0.5">
                    {t.facts[key]}
                  </p>
                  <p className="text-sm font-medium">{t.facts[`${key}Value`]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}