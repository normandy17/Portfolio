import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/data/translations";

export default function Navbar({ theme, toggleTheme }) {
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang].nav;

  const NAV_KEYS = ["about", "skills", "projects", "experience", "education", "contact"];

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_KEYS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-heading font-bold text-lg tracking-tight hover:text-amber transition-colors"
          >
            CD<span className="text-amber">.</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_KEYS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                  activeSection === id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t[id]}
                {activeSection === id && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="hidden md:inline-flex items-center px-2.5 py-1 text-xs font-mono font-semibold rounded-md border border-border hover:border-amber hover:text-amber transition-colors"
              aria-label="Toggle language"
            >
              {lang === "en" ? "DE" : "EN"}
            </button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="h-9 w-9"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <a
              href="/assets/resume/charleson_davis_resume.pdf"
              download
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-amber text-amber rounded-full hover:bg-amber hover:text-white transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              {t.downloadCV}
            </a>

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-lg z-40">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {NAV_KEYS.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-2xl font-heading font-semibold transition-colors ${
                  activeSection === id ? "text-amber" : "text-foreground hover:text-amber"
                }`}
              >
                {t[id]}
              </button>
            ))}
            <button
              onClick={toggleLang}
              className="text-base font-mono font-semibold border border-border rounded-full px-4 py-2 hover:border-amber hover:text-amber transition-colors"
            >
              {lang === "en" ? "Deutsch" : "English"}
            </button>
            <a
              href="/assets/resume/charleson_davis_resume.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-medium border border-amber text-amber rounded-full hover:bg-amber hover:text-white transition-colors"
            >
              <Download className="h-4 w-4" />
              {t.downloadCVMobile}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}