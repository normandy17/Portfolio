import { useEffect } from "react";
import { X, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import MediaCarousel from "./MediaCarousel";

export default function ProjectModal({ project, thumbnail, onClose, lang }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-background rounded-xl border border-border shadow-2xl z-10">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white border-0"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Media carousel */}
        <MediaCarousel
          media={project.media || []}
          projectTitle={project.title}
          fallbackThumbnail={thumbnail}
        />

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-heading">{project.title}</h2>
              <p className="text-muted-foreground mt-1">{lang === "de" ? (project.tagline_de || project.tagline) : project.tagline}</p>
            </div>
            <span className="text-sm font-mono text-muted-foreground shrink-0 mt-1">
              {project.year}
            </span>
          </div>

          <p className="text-base text-muted-foreground leading-relaxed mb-6" style={{ lineHeight: "1.7" }}>
            {lang === "de" ? (project.description_de || project.description) : project.description}
          </p>

          {/* Tech stack */}
          <div className="mb-6">
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
              Tech Stack
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-mono rounded-full border border-amber/40 text-amber-hover dark:text-amber bg-amber/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-amber hover:bg-amber-hover text-white rounded-full transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {lang === "de" ? "Live-Website" : "Live Site"}
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border hover:border-foreground rounded-full transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}