import cn from "classnames";

interface MainWrapperProps {
  children: React.ReactNode;
  className?: string;
  isTwoColums?: boolean;
}

export default function MainWrapper({
  children,
  className,
  isTwoColums,
}: MainWrapperProps) {
  return (
    <main
      className={cn(
        "mx-auto max-w-[1040px] pt-5 pb-25 px-5 md:pb-10 md:pt-10",
        className,
        {
          ["md:grid md:grid-cols-[minmax(0,730px)_250px] gap-x-[20px] "]:
            isTwoColums,
        }
      )}
    >
      {children}
    </main>
  );
}
