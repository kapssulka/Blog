import { RotateLoader } from "react-spinners";

export default function Loader({ size = 30, margin = 20, color = "#f59e0b" }) {
  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center h-screen  bg-[rgba(24,24,27,0.5)]">
      <RotateLoader size={size} margin={margin} color={color} />
    </div>
  );
}
