import { RotateLoader } from "react-spinners";

interface LoaderProps {
  size?: number;
  margin?: number;
  color?: string;
}

export default function Loader({
  size = 30,
  margin = 20,
  color = "#1abc9c",
}: LoaderProps) {
  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center h-screen  bg-[rgba(24,24,27,0.5)]">
      <RotateLoader size={size} margin={margin} color={color} />
    </div>
  );
}
