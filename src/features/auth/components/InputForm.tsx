import type { LoginFormInput } from "../../../utils/validation.js";
import FieldError from "./FieldError.js";
import type {
  FieldError as RHFFieldError,
  UseFormRegister,
} from "react-hook-form";

interface InputFormProps {
  label: string;
  name: "email" | "password";
  placeholder: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  id?: string;
  errors: RHFFieldError | undefined;
  register: UseFormRegister<LoginFormInput>;
}

export default function InputForm({
  label,
  name,
  type = "text",
  placeholder,
  id,
  register,
  errors,
}: InputFormProps) {
  const inputId = id || name;

  return (
    <div className="flex flex-col relative">
      <label htmlFor={inputId} className="text-2xl mb-2">
        {label}
      </label>
      <input
        {...register(name)}
        name={name}
        id={inputId}
        type={type}
        placeholder={placeholder}
        className="border border-gray-600 p-3 rounded-[5px]"
      />

      {errors?.message && (
        <FieldError
          message={errors?.message}
          className="absolute left-0 top-[108%] "
        />
      )}
    </div>
  );
}
