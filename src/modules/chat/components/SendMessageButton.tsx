import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button.js";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks.js";
import { getOrCreateChat } from "../store/chatSlice.js";
import { toast } from "sonner";
import { useState } from "react";

interface SendMessageButtonProps {
  curentUserProfile: string;
}

export default function SendMessageButton({
  curentUserProfile,
}: SendMessageButtonProps) {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const [isLoading, setLoading] = useState(false);

  const { user_uid } = useAppSelector((state) => state.user);

  const hendleClick = async () => {
    if (user_uid && curentUserProfile) {
      try {
        setLoading(true);
        const chatId = await dispatch(
          getOrCreateChat({
            user_a: user_uid,
            user_b: curentUserProfile,
          }),
        ).unwrap();

        navigation(`/messages/${chatId}`);
      } catch (error) {
        toast.error("Ошибка при открытии чата");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Button
      isLoading={isLoading}
      onClick={hendleClick}
      className="self-center w-full"
      text="Отправить сообщение"
    />
  );
}
