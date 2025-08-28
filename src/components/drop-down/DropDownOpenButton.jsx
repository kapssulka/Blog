import { forwardRef } from "react";

export default forwardRef(function DropDownOpenButton(props, ref) {
  const { openDropDown, setOpenDropDown, icon } = props;
  return (
    <button
      ref={ref}
      onClick={() => setOpenDropDown((prev) => !prev)}
      className={`cursor-pointer p-2 rounded-[10px] hover:bg-zinc-700 duration-300 focus:outline-none focus:ring-0 ${
        openDropDown && "bg-zinc-700"
      }`}
    >
      {icon}
    </button>
  );
});
