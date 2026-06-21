import { useScrollFade } from "@/hooks/useScrollFade";

export default function SectionHeading({ children }) {
  const { ref, isVisible } = useScrollFade(0.3);

  return (
    <h2
      ref={ref}
      className={`text-3xl md:text-4xl font-bold font-heading tracking-tight amber-underline ${isVisible ? "visible" : ""}`}
    >
      {children}
    </h2>
  );
}