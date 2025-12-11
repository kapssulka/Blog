import Cropper, { type Area, type Point } from "react-easy-crop";
import type { SetState } from "../../types/utils.types.js";

interface ImageCropperProps {
  image: string;
  crop: Point;
  setCrop: SetState<Point>;
  zoom: number;
  setZoom: SetState<number>;
  handleCropComplete: (croppedPixels: Area) => void;
}

export default function ImageCropper({
  image,
  crop,
  setCrop,
  zoom,
  setZoom,
  handleCropComplete,
}: ImageCropperProps) {
  return (
    <div className="relative w-full h-[300px] aspect-square bg-zinc-900 rounded-2xl overflow-hidden">
      {/* @ts-ignore  - тут проблема с пакетом, TS считает его именовонным, хотя он дефолтный*/}
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        cropShape="round"
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={(_: Area, croppedAreaPixels: Area) => {
          handleCropComplete(croppedAreaPixels);
        }}
      />
    </div>
  );
}
