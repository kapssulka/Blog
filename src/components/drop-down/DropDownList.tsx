import { forwardRef } from "react";

interface DropDownListProps {
  children: React.ReactNode;
}

type RefType = React.ForwardedRef<HTMLUListElement>;

export default forwardRef(function DropDownList(
  props: DropDownListProps,
  ref: RefType
) {
  const { children } = props;

  return (
    <ul
      ref={ref}
      className="absolute w-40 p-3 right-0 top-[120%] bg-zinc-900 rounded-[10px]
                   border border-zinc-700 shadow-[0_4px_12px_rgba(255,255,255,0.05)]
                   flex flex-col gap-2
                   animate-fadeIn
                   transform origin-top-right"
    >
      {children}
    </ul>
  );
});
