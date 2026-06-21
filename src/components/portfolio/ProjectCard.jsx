import { ExternalLink, Github } from "lucide-react";

export default function ProjectCard({ project, thumbnail, onClick, lang }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-border bg-card overflow-hidden hover:border-amber/50 transition-all duration-200 hover:shadow-lg hover:shadow-amber/5"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-secondary relative overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <span className="text-3xl font-display font-bold text-muted-foreground/40">
              {project.title.split(" ").map(w => w[0]).join("")}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-semibold font-heading group-hover:text-amber transition-colors">
            {project.title}
          </h3>
          <span className="text-xs font-mono text-muted-foreground shrink-0 mt-1">
            {project.year}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {lang === "de" ? (project.tagline_de || project.tagline) : project.tagline}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech_stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-mono rounded-full bg-secondary text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 4 && (
            <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-secondary text-muted-foreground">
              +{project.tech_stack.length - 4}
            </span>
          )}
        </div>

        {/* CTA links */}
        <div className="flex items-center gap-3">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-medium text-amber hover:text-amber-hover transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              Live Site
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-3 w-3" />
              GitHub
            </a>
          )}
          <span className="text-xs text-muted-foreground ml-auto group-hover:text-amber transition-colors">
            {lang === "de" ? "Details →" : "View details →"}
          </span>
        </div>
      </div>
    </div>
  );
}