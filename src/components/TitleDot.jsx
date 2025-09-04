export default function TitleDot({
  title = "Заголовок",
  dotColor = "bg-purple-500",
}) {
  return (
    <h1 className="text-xl font-semibold text-zinc-100  flex items-center gap-2">
      <span
        className={`inline-block w-2 h-2  rounded-full animate-pulse ${dotColor}`}
      ></span>
      {title}
    </h1>
  );
}
