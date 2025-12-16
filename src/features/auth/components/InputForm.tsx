import { useState } from "react";
import FieldError from "./FieldError.js";
import type {
  FieldValues,
  Path,
  FieldError as RHFFieldError,
  UseFormRegister,
} from "react-hook-form";
import ShowPassword from "../../showPassword/ShowPassword.js";

interface InputFormProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  placeholder: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  id?: string;
  errors: RHFFieldError | undefined;
  register: UseFormRegister<T>;
}

export default function InputForm<T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  id,
  register,
  errors,
}: InputFormProps<T>) {
  const inputId = id || name;

  const [showPassword, setShowPassword] = useState<"password" | "text">(
    "password"
  );

  return (
    <div className="flex flex-col relative">
      <label htmlFor={inputId} className="text-xl mb-2 xs:text-2xl ">
        {label}
      </label>
      <input
        {...register(name)}
        name={name}
        id={inputId}
        type={type === "password" ? showPassword : type}
        placeholder={placeholder}
        className="border border-gray-600 p-3 rounded-[5px] outline-none focus:outline-none "
      />
      {type === "password" && (
        <ShowPassword
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          className="absolute right-2 bottom-2"
        />
      )}

      {errors?.message && (
        <FieldError
          message={errors?.message}
          className="absolute left-0 top-[108%] "
        />
      )}
    </div>
  );
}
