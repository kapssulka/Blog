type EmptyStateProps = {
  title?: string;
  description?: string;
};

export default function EmptyState({
  title = "Нет чатов",
  description = "Начните первый диалог",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="mb-4 w-14 h-14 flex items-center justify-center rounded-2xl bg-bg-secondary/50 border border-white/5">
        <svg
          className="w-6 h-6 text-zinc-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M21 11.5a8.5 8.5 0 01-8.5 8.5 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 018.5-8.5h.5a8.5 8.5 0 018 8z" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-white mb-1">{title}</h3>

      {/* Description */}
      <p className="text-sm text-zinc-400 max-w-[250px]">{description}</p>
    </div>
  );
}
