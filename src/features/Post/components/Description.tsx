import { useEffect, useRef, useState } from "react";

interface DescriptionProps {
  description: string;
}

export default function Description({ description }: DescriptionProps) {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [isClamped, setisClamped] = useState(false);

  const MAX_HEIGHT = 150;

  useEffect(() => {
    if (!textRef.current) return;
    const textHeight = textRef.current.scrollHeight;

    if (textHeight > MAX_HEIGHT) {
      setisClamped(true);
    }
  }, []);

  return (
    <div
      className={`relative pt-6 pb-10 px-1  ${isClamped ? "max-h-[150px] overflow-hidden" : ""}`}
    >
      <p ref={textRef} className="text-base whitespace-pre-wrap">
        {description}
      </p>

      {isClamped && (
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-15
        bg-gradient-to-t from-bg-secondary via-bg-secondary to-transparent"
        />
      )}

      {isClamped && (
        <button
          onClick={() => setisClamped(false)}
          type="button"
          className="cursor-pointer absolute bottom-0 left-3
        text-sm font-medium text-accent
        transition-all px-1 rounded border-b border-accent/50
       hover:text-accent-hover hover:border-accent-hover/50
        "
        >
          <span>Читать дальше</span>
        </button>
      )}
    </div>
  );
}
