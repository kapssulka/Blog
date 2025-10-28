interface GridPostsItem {
  src: string;
  lengthImages?: number;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function GridPostsItem({
  src,
  lengthImages,
  onClick,
}: GridPostsItem) {
  return (
    <div
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden border border-zinc-600 aspect-square cursor-pointer 
                    transition-transform transform  duration-500"
    >
      <img src={src} className="w-full h-full object-cover rounded-2xl" />

      {lengthImages && lengthImages > 1 && (
        <div className="absolute top-2 right-2 bg-black/60  text-white text-xs px-2 py-1 rounded">
          1/{lengthImages}
        </div>
      )}

      <div className="absolute inset-0 bg-black bg-opacity-20 duration-400 opacity-0 hover:opacity-70 transition-opacity flex items-center justify-center">
        <span className="text-white text-lg font-semibold">Перейти</span>
      </div>
    </div>
  );
}
