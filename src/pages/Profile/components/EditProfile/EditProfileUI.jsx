import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React from "react";
import InputForm from "../../../../features/auth/components/InputForm";
import TextareaForm from "../../../../features/auth/components/TextareaForm";
import ButtonOrange from "../../../../components/ButtonOrange";

export default function EditProfileUI({
  register,
  onSubmit,
  errors,
  isOpen,
  setIsOpen,
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 "
    >
      <DialogBackdrop className="fixed inset-0 bg-zinc-900/70" />
      <DialogPanel className="fixed inset-0 h-max m-auto max-w-lg w-full border-4 border-amber-50 rounded-2xl text-amber-50 bg-zinc-900 p-10">
        <form onSubmit={onSubmit} className="flex flex-col gap-y-10">
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
      </DialogPanel>
    </Dialog>
  );
}
