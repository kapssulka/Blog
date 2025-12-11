import InputForm from "../../../../features/auth/components/InputForm.js";
import TextareaForm from "../../../../features/auth/components/TextareaForm.js";
import DialogModal from "../../../../components/DialogModal.js";
import type { EditProfileFormData } from "../../../../utils/validation.js";
import ButtonOrange from "../../../../components/orangeButton/ButtonOrange.js";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { SetState } from "../../../../types/utils.types.js";

interface EditProfileUIProps {
  register: UseFormRegister<EditProfileFormData>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<EditProfileFormData>;
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
}

export default function EditProfileUI({
  register,
  onSubmit,
  errors,
  isOpen,
  setIsOpen,
}: EditProfileUIProps) {
  return (
    <DialogModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-y-10 px-5 py-10 xs:p-10"
      >
        <InputForm<EditProfileFormData>
          register={register}
          label="Имя"
          placeholder="Введите ваше имя..."
          name="name"
          errors={errors?.name}
        />
        <TextareaForm<EditProfileFormData>
          register={register}
          label="Описание профиля"
          placeholder="Введите ваше описание профиля..."
          name="bio"
        />
        <div className="flex justify-center  w-full">
          <ButtonOrange
            typeButton="submit"
            text="Изменить"
            className="justify-self-center w-max-[500px] w-full"
          />
        </div>
      </form>
    </DialogModal>
  );
}
