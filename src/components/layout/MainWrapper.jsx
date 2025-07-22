import cn from "classnames";

export default function MainWrapper({ children, className }) {
  return (
    <main
      className={cn(
        "flex flex-1 mx-auto max-w-[1000px] w-full gap-x-10 pt-10",
        className
      )}
    >
      {children}
    </main>
  );
}
