import cn from "classnames";
import FieldError from "./FieldError.js";
import type {
  FieldValues,
  Path,
  FieldError as RHFFieldError,
  UseFormRegister,
} from "react-hook-form";

interface TextareaFormProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  placeholder?: string;
  id?: string;
  register: UseFormRegister<T>;
  errors?: RHFFieldError | undefined;
  className?: string;
}

export default function TextareaForm<T extends FieldValues>({
  label,
  name,
  placeholder = "",
  id,
  register,
  errors,
  className,
}: TextareaFormProps<T>) {
  const textareaId = id || name;

  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={textareaId} className="text-2xl mb-2">
        {label}
      </label>
      <textarea
        {...register(name)}
        name={name}
        id={textareaId}
        placeholder={placeholder}
        className="border border-gray-600 p-3 rounded-[5px] resize-none"
      />

      {errors?.message && (
        <FieldError message={errors?.message} className="mt-5 self-start" />
      )}
    </div>
  );
}
