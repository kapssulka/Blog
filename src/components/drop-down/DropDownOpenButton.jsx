import { forwardRef } from "react";

export default forwardRef(function DropDownOpenButton(props, ref) {
  const { setOpen, open, icon } = props;
  return (
    <button
      ref={ref}
      onClick={() => setOpen((prev) => !prev)}
      className={`cursor-pointer p-2 rounded-[10px] hover:bg-zinc-700 duration-300 ${
        open && "bg-zinc-700"
      }`}
    >
      {icon}
    </button>
  );
});
