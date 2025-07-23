export default function InputForm({
  label,
  name,
  type = "text",
  placeholder = "",
  id,
}) {
  const inputId = id || name;

  return (
    <div className="flex flex-col">
      <label htmlFor={inputId} className="text-2xl mb-2">
        {label}
      </label>
      <input
        name={name}
        id={inputId}
        type={type}
        placeholder={placeholder}
        className="border border-gray-600 p-3 rounded-[5px]"
      />
    </div>
  );
}
