import FieldError from "./FieldError";

export default function TextareaForm({
  label,
  name,
  placeholder = "",
  id,
  register,
  errors,
}) {
  const textareaId = id || name;

  return (
    <div className="flex flex-col relative">
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
        <FieldError
          message={errors?.message}
          className="absolute left-0 top-[108%]"
        />
      )}
    </div>
  );
}
