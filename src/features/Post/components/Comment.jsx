import { FiMessageCircle } from "react-icons/fi";
import { toast } from "sonner";

export default function Comment() {
  return (
    <div>
      <FiMessageCircle
        onClick={() => toast.info("Комментарии находятся на этапе разработки")}
        cursor="pointer"
        opacity={0.8}
        size={28}
      />
    </div>
  );
}
