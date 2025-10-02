import cn from "classnames";

export default function MainWrapper({ children, className, isTwoColums }) {
  return (
    <main
      className={cn("mx-auto max-w-[1000px] pt-10", className, {
        ["grid grid-cols-[minmax(0,730px)_250px] gap-x-[20px] "]: isTwoColums,
      })}
    >
      {children}
    </main>
  );
}
