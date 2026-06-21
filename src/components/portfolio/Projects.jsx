import { useState } from "react";
import { useScrollFade } from "@/hooks/useScrollFade";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects } from "@/data/projects";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/data/translations";

const TAB_KEYS = ["AI", "Web"];

export default function Projects({ thumbnails }) {
  const [activeTab, setActiveTab] = useState("AI");
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref, isVisible } = useScrollFade();
  const { lang } = useLanguage();
  const t = translations[lang].projects;

  const filtered = projects.filter((p) => p.era === activeTab);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionHeading>{t.heading}</SectionHeading>

      {/* Tab toggle */}
      <div className="mt-8 inline-flex rounded-full border border-border p-1 bg-secondary/50">
        {TAB_KEYS.map((key, i) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
              activeTab === key
                ? "bg-amber text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.tabs[i]}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div
        ref={ref}
        className={`mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {filtered.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            thumbnail={thumbnails?.[project.title]}
            onClick={() => setSelectedProject(project)}
            lang={lang}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          thumbnail={thumbnails?.[selectedProject.title]}
          onClose={() => setSelectedProject(null)}
          lang={lang}
        />
      )}
    </section>
  );
}