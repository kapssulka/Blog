import StatsPanelItem from "./components/StatsPanelItem";
import cn from "classnames";

export default function StatsPanel({ className }) {
  return (
    <div className={cn("flex gap-x-10", className)}>
      <StatsPanelItem count={0} text="Публикации" />
      <StatsPanelItem count={0} text="Подписчики" />
      <StatsPanelItem count={0} text="Подписки" />
    </div>
  );
}
