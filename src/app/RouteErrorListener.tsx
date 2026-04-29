import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function RouteErrorListener() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as any;

    if (!state?.error) return;

    switch (state.error) {
      case "CHAT_NOT_FOUND":
        toast.info("Такого чата не существует");
        break;

      case "FORBIDDEN":
        toast.info("Доступ запрещён");
        break;
    }

    navigate(location.pathname, { replace: true, state: {} });
  }, [location]);

  return null;
}
