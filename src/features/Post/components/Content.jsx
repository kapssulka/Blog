import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";

export default function Content({
  className = "",
  images = [],
  description = "Описание",
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className={className}>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className=" aspect-[4/3]"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img
              src={image.url}
              alt={image.text}
              className="w-full h-full max-w-full object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}

        {/* Кнопки навигации */}
        <button
          ref={prevRef}
          className="cursor-pointer absolute top-1/2 left-2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
        >
          ‹
        </button>
        <button
          ref={nextRef}
          className="cursor-pointer absolute top-1/2 right-2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
        >
          ›
        </button>
      </Swiper>

      <div className="p-4">
        <p className="text-base whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );
}
