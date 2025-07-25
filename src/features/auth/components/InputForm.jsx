import FieldError from "./FieldError";

export default function InputForm({
  label,
  name,
  type = "text",
  placeholder = "",
  id,
  register,
  errors,
}) {
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

      {errors && (
        <FieldError
          message={errors?.message}
          className="absolute left-0 top-[108%] "
        />
      )}
    </div>
  );
}
