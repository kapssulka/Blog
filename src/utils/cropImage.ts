import type { Area } from "react-easy-crop";

export const getCroppedImage = (imageSrc: string, cropPixels: Area) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropPixels.width;
      canvas.height = cropPixels.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.drawImage(
        image,
        cropPixels.x,
        cropPixels.y,
        cropPixels.width,
        cropPixels.height,
        0,
        0,
        cropPixels.width,
        cropPixels.height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Ошибка при создании кропа");
          // сразу преобразуем в File (чтобы можно было грузить на сервер)
          const file = new File([blob], "avatar.webp", { type: "image/webp" });
          resolve(file);
        },
        "image/webp",
        0.9 // качество (0.0–1.0, 0.9 обычно норм)
      );
    };
    image.onerror = (err) => reject(err);
  });
};
