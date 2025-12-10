interface StatsPanelItemProps {
  count?: number;
  text: string;
}

export default function StatsPanelItem({
  count = 0,
  text = "",
}: StatsPanelItemProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold">{count}</div>
      <div className="text-zinc-400 text-[14px] sm:text-[16px]">{text}</div>
    </div>
  );
}
