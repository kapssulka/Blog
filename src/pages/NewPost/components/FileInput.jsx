import cn from "classnames";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useController } from "react-hook-form";
import FieldError from "../../../features/auth/components/FieldError";

export default function FileInput({ control, name, errors }) {
  const [files, setFiles] = useState([]);

  const {
    field: { onChange },
  } = useController({ name, control });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const onDrop = (acceptedFiles) => {
    console.log(errors);

    if (acceptedFiles.length > 0) {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setFiles(newFiles);
      onChange(newFiles);
    }
  };

  const { isDragActive, getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });

  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(files[index].preview);
    const filteredFiles = files.filter((_, i) => i !== index);
    setFiles(filteredFiles);
    onChange(filteredFiles);
  };

  return (
    <div className="mb-5 flex flex-col">
      <div
        {...getRootProps({
          className: cn(
            `w-full h-48 border-2 border-dashed rounded-lg 
            flex items-center justify-center transition-colors cursor-pointer bg-zinc-900 `,
            {
              "border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-500":
                !isDragActive,
              "border-blue-400 text-blue-500": isDragActive,
            }
          ),
        })}
      >
        <input {...getInputProps()} />
        <p className="text-center px-4">
          {isDragActive
            ? "Отпустите файл здесь"
            : "Перетащите изображение сюда или кликните, чтобы выбрать файл"}
        </p>
      </div>

      {files.length > 0 && (
        <div className="flex flex-wrap justify-center mt-5">
          <div className="grid grid-cols-4 gap-3 ">
            {files.map((file, index) => {
              const id = crypto.randomUUID();
              return (
                <div
                  key={id}
                  className="relative group cursor-pointer"
                  onClick={() => handleRemoveImage(index)}
                >
                  <img
                    src={file.preview}
                    alt={`preview-${index}`}
                    className="w-32 h-32 object-cover rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-bl-lg opacity-0 group-hover:opacity-100 transition">
                    Удалить
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {errors && (
        <FieldError className="self-start mt-5" message={errors?.message} />
      )}
    </div>
  );
}
