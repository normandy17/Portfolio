import { useScrollFade } from "@/hooks/useScrollFade";
import SectionHeading from "./SectionHeading";
import { skillTracks } from "@/data/skills";
import { skillIconMap } from "./skillIcons";
import { Brain, Code2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/data/translations";

export default function Skills() {
  const { ref, isVisible } = useScrollFade();
  const { lang } = useLanguage();
  const t = translations[lang].skills;

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading>{t.heading}</SectionHeading>

      <div
        ref={ref}
        className={`mt-12 grid md:grid-cols-2 gap-8 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {skillTracks.map((track, idx) => (
          <div
            key={track.track_label}
            className={`p-6 md:p-8 rounded-xl border transition-colors ${
              track.track_accent
                ? "border-amber/30 bg-amber/5 dark:bg-amber/5"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-lg ${track.track_accent ? "bg-amber/10" : "bg-secondary"}`}>
                {idx === 0 ? (
                  <Brain className={`h-5 w-5 ${track.track_accent ? "text-amber" : "text-muted-foreground"}`} />
                ) : (
                  <Code2 className={`h-5 w-5 ${track.track_accent ? "text-amber" : "text-muted-foreground"}`} />
                )}
              </div>
              <h3 className="text-xl font-semibold font-heading">{t.tracks[idx]}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {track.skills.map((skill) => (
                <span
                  key={skill}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium border transition-colors ${
                    track.track_accent
                      ? "border-amber/40 text-amber-hover dark:text-amber bg-amber/5 hover:bg-amber/10"
                      : "border-border text-muted-foreground bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  {skillIconMap[skill] && (
                    <img src={skillIconMap[skill]} alt={skill} className="w-3.5 h-3.5 object-contain" />
                  )}
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}