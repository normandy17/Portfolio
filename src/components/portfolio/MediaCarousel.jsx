import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

function YoutubeSlide({ videoId }) {
  return (
    <iframe
      className="w-full h-full"
      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
      title="YouTube video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

function VimeoSlide({ videoId }) {
  return (
    <iframe
      className="w-full h-full"
      src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`}
      title="Vimeo video"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    />
  );
}

function SlideContent({ slide, projectTitle }) {
  if (slide.type === "youtube") return <YoutubeSlide videoId={slide.videoId} />;
  if (slide.type === "vimeo") return <VimeoSlide videoId={slide.videoId} />;
  return (
    <img
      src={slide.url}
      alt={`${projectTitle} screenshot`}
      className="w-full h-full object-cover"
    />
  );
}

function ThumbnailIcon({ slide, isActive }) {
  const base = `w-12 h-8 rounded overflow-hidden border-2 flex-shrink-0 transition-all duration-150 ${
    isActive ? "border-amber scale-105" : "border-transparent opacity-60 hover:opacity-100"
  }`;

  if (slide.type === "youtube" || slide.type === "vimeo") {
    return (
      <div className={`${base} bg-secondary flex items-center justify-center`}>
        <Play className="h-3 w-3 text-amber" />
      </div>
    );
  }
  return (
    <div className={base}>
      <img src={slide.url} alt="" className="w-full h-full object-cover" />
    </div>
  );
}

export default function MediaCarousel({ media, projectTitle, fallbackThumbnail }) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + media.length) % media.length), [media.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % media.length), [media.length]);

  // Keyboard nav is handled by the parent modal (Escape). Arrow keys here:
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // No media — fall back to thumbnail or placeholder
  if (!media || media.length === 0) {
    return (
      <div className="aspect-video bg-secondary relative overflow-hidden rounded-t-xl">
        {fallbackThumbnail ? (
          <img
            src={fallbackThumbnail}
            alt={`${projectTitle} screenshot`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <span className="text-5xl font-display font-bold text-muted-foreground/30">
              {projectTitle.split(" ").map((w) => w[0]).join("")}
            </span>
          </div>
        )}
      </div>
    );
  }

  const isSingle = media.length === 1;
  const isVideo = media[current]?.type === "youtube" || media[current]?.type === "vimeo";

  return (
    <div className="rounded-t-xl overflow-hidden bg-black">
      {/* Main slide */}
      <div
        className="aspect-video relative focus:outline-none"
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Media carousel"
      >
        <SlideContent slide={media[current]} projectTitle={projectTitle} />

        {/* Prev / Next arrows */}
        {!isSingle && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 hover:bg-black/70 text-white border-0"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/50 hover:bg-black/70 text-white border-0"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Slide counter badge */}
            <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-xs font-mono">
              {current + 1} / {media.length}
            </div>
          </>
        )}
      </div>

      {/* Dot indicators + thumbnails row */}
      {!isSingle && (
        <div className="flex items-center justify-center gap-2 py-2 px-4 bg-black/70">
          {media.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <ThumbnailIcon slide={slide} isActive={idx === current} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}