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
        "mx-auto max-w-[730px] pt-5 pb-25 px-3 lg:pb-10 lg:pt-10 lg:max-w-[1040px]",
        className,
        {
          ["lg:grid lg:grid-cols-[minmax(0,730px)_250px] gap-x-[20px]"]:
            isTwoColums,
        }
      )}
    >
      {children}
    </main>
  );
}
