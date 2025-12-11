import FieldError from "./FieldError.js";
import type {
  FieldValues,
  Path,
  FieldError as RHFFieldError,
  UseFormRegister,
} from "react-hook-form";

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

  return (
    <div className="flex flex-col relative">
      <label htmlFor={inputId} className="text-xl mb-2 xs:text-2xl ">
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
