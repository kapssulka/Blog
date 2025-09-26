import cn from "classnames";

export default function MainWrapper({ children, className }) {
  return (
    <main
      className={cn(
        "grid grid-cols-[minmax(0,730px)_250px] gap-x-[20px]  mx-auto max-w-[1000px] pt-10",
        className
      )}
    >
      {children}
    </main>
  );
}
