import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/data/translations";

const socialLinks = [
  { label: "GitHub", url: "https://github.com/normandy17", Icon: Github },
  { label: "LinkedIn", url: "https://linkedin.com/in/charlz1717", Icon: Linkedin },
  { label: "Email", url: "mailto:charlesondavis@gmail.com", Icon: Mail },
];

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-16"
    >
      <div className="animate-fade-in-up">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-light text-amber-hover dark:text-amber text-xs font-mono tracking-wide mb-8 border border-amber/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
          {t.eyebrow}
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[96px] font-extrabold font-display leading-[1.05] tracking-tight mb-6">
          <span className="text-amber">{t.headline1}</span> &
          <br />
          {t.headline2}
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10" style={{ lineHeight: "1.7" }}>
          {t.sub}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <Button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-amber hover:bg-amber-hover text-white px-6 py-2.5 rounded-full font-medium text-base h-auto"
          >
            {t.viewProjects}
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
          <a
            href="/assets/resume/charleson_davis_resume.pdf"
            download
            className="inline-flex items-center px-6 py-2.5 rounded-full font-medium text-base border border-border hover:border-amber hover:text-amber transition-colors"
          >
            {t.downloadCV}
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          {socialLinks.map(({ label, url, Icon }) => (
            <a
              key={label}
              href={url}
              target={url.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}