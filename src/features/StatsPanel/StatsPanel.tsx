import StatsPanelItem from "./components/StatsPanelItem.js";
import cn from "classnames";
interface StatsPanelProps {
  className?: string;
  countPosts: number;
}

export default function StatsPanel({ className, countPosts }: StatsPanelProps) {
  return (
    <div className={cn("flex gap-x-5 sm:gap-x-10 ", className)}>
      <StatsPanelItem count={countPosts ?? 0} text="Публикации" />
      <StatsPanelItem count={0} text="Подписчики" />
      <StatsPanelItem count={0} text="Подписки" />
    </div>
  );
}
