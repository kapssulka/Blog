import StatsPanelItem from "./components/StatsPanelItem.js";
import cn from "classnames";
interface StatsPanelProps {
  className?: string;
}

export default function StatsPanel({ className }: StatsPanelProps) {
  return (
    <div className={cn("flex gap-x-10", className)}>
      <StatsPanelItem count={0} text="Публикации" />
      <StatsPanelItem count={0} text="Подписчики" />
      <StatsPanelItem count={0} text="Подписки" />
    </div>
  );
}
