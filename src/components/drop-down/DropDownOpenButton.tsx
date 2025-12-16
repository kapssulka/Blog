import { forwardRef } from "react";
import type { SetState } from "../../types/utils.types.js";
interface DropDownOpenButton {
  openDropDown: boolean;
  setOpenDropDown: SetState<boolean>;
  icon: React.ReactNode;
}
type RefType = React.ForwardedRef<HTMLButtonElement>;

export default forwardRef(function DropDownOpenButton(
  props: DropDownOpenButton,
  ref: RefType
) {
  const { openDropDown, setOpenDropDown, icon } = props;

  return (
    <button
      ref={ref}
      onClick={() => setOpenDropDown((prev) => !prev)}
      className={`cursor-pointer p-2 rounded-[10px] hover:bg-accent-grey duration-300 focus:outline-none focus:ring-0 ${
        openDropDown && "bg-accent-grey"
      }`}
    >
      {icon}
    </button>
  );
});
