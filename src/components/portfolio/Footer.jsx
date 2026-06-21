import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/data/translations";

const socialLinks = [
  { label: "GitHub", url: "https://github.com/normandy17", Icon: Github },
  { label: "LinkedIn", url: "https://linkedin.com/in/charlz1717", Icon: Linkedin },
  { label: "Email", url: "mailto:charlesondavis@gmail.com", Icon: Mail },
];

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  return (
    <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Charleson Davis. {t.built}
        </p>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ label, url, Icon }) => (
            <a
              key={label}
              href={url}
              target={url.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}