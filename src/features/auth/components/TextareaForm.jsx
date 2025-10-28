import cn from "classnames";
import FieldError from "./FieldError.js";

export default function TextareaForm({
  label,
  name,
  placeholder = "",
  id,
  register,
  errors,
  className,
}) {
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

      {errors && (
        <FieldError message={errors?.message} className="mt-5 self-start" />
      )}
    </div>
  );
}
