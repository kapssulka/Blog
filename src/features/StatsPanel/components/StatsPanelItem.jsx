export default function StatsPanelItem({ count = 0, text = "" }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold">{count}</div>
      <div className="text-zinc-400">{text}</div>
    </div>
  );
}
