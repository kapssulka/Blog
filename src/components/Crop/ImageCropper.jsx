import Cropper from "react-easy-crop";

export default function ImageCropper({
  image,
  crop,
  setCrop,
  zoom,
  setZoom,
  handleCropComplete,
}) {
  return (
    <div className="relative w-full h-[600px] bg-zinc-900 rounded-2xl overflow-hidden">
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        cropShape="round"
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={(_, croppedAreaPixels) => {
          handleCropComplete(croppedAreaPixels);
        }}
      />
    </div>
  );
}
