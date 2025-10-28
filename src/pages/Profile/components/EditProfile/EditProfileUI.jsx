import InputForm from "../../../../features/auth/components/InputForm.js";
import TextareaForm from "../../../../features/auth/components/TextareaForm";
import ButtonOrange from "../../../../components/ButtonOrange.js";
import DialogModal from "../../../../components/DialogModal";

export default function EditProfileUI({
  register,
  onSubmit,
  errors,
  isOpen,
  setIsOpen,
}) {
  return (
    <DialogModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-10 p-10">
        <InputForm
          register={register}
          label="Имя"
          placeholder="Введите ваше имя..."
          name="name"
          errors={errors?.name}
        />
        <TextareaForm
          register={register}
          label="Описание профиля"
          placeholder="Введите ваше описание профиля..."
          name="bio"
        />

        <div className="flex justify-center  w-full">
          <ButtonOrange
            isButton
            typeButton="submit"
            text="Изменить"
            className="justify-self-center w-max-[500px] w-full"
          />
        </div>
      </form>
    </DialogModal>
  );
}
