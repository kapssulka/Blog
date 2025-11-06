import cn from "classnames";
import FieldError from "./FieldError.js";
import type {
  Path,
  FieldError as RHFFieldError,
  UseFormRegister,
} from "react-hook-form";
import type { NewPostFormData } from "../../../utils/validation.js";

interface TextareaFormProps {
  label?: string;
  name: Path<NewPostFormData>;
  placeholder: string;
  id?: string;
  register: UseFormRegister<NewPostFormData>;
  errors: RHFFieldError | undefined;
  className: string;
}

export default function TextareaForm({
  label,
  name,
  placeholder = "",
  id,
  register,
  errors,
  className,
}: TextareaFormProps) {
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
