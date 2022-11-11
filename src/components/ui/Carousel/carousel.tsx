import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/navigation";
import "swiper/css/keyboard";
import "swiper/css/thumbs";
import "./carouselStyle.css";
import "swiper/css/pagination";

import cn from "classnames";
import { memo, useState } from "react";
import {
  A11y,
  Autoplay,
  FreeMode,
  Keyboard,
  Lazy,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { ChevronLeftIcon, ChevronRightIcon } from "../../../theme/icons";
import { Icon } from "../Icon";
import type { ImageProps } from "../Image";
import { Image } from "../Image";
import useSwiperRef from "./utils/useSwiperRef";

export type CarouselProps = {
  images: ImageProps[];
  withThumbs?: boolean;
  withPagination?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  thumbsClassName?: string;
};

export const Carousel = ({
  images = [],
  withThumbs = false,
  withPagination = false,
  loop = false,
  autoplay = false,
  className,
  thumbsClassName,
}: CarouselProps) => {
  const [thumbsSwiper, setThumbsSwiper]: any = useState(null);
  const [nextEl, nextElRef] = useSwiperRef();
  const [prevEl, prevElRef] = useSwiperRef();
  const [nextElThumb, nextElRefThumb] = useSwiperRef();
  const [prevElThumb, prevElRefThumb] = useSwiperRef();

  return (
    <>
      <Swiper
        className={cn("w-full rounded-lg", className)}
        modules={[
          Navigation,
          Autoplay,
          A11y,
          Thumbs,
          Keyboard,
          Lazy,
          Pagination,
        ]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={autoplay}
        loop={loop}
        pagination={{
          enabled: withPagination,
          bulletActiveClass: "swiper-pagination-bullet-active",
          bulletClass: "swiper-pagination-bullet",
          clickable: true,
        }}
        navigation={{
          prevEl,
          nextEl,
          disabledClass: "swiper-button-disabled",
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }} // Workaround - cannot convert undefined or null to object - thumbs={{ swiper: thumbsSwiper }}
      >
        {images?.map(({ src, alt, ...imageProps }, i) => (
          <SwiperSlide
            key={`Carousel Item ${i}`}
            className="bg-accent-1 overflow-hidden"
          >
            <Image src={src} alt={alt} {...imageProps} />
          </SwiperSlide>
        ))}
        <div
          className={`${
            withThumbs ? "lg:hidden" : ""
          } text-accent-10 absolute inset-y-0 left-0 z-[1] flex h-full cursor-pointer items-center transition duration-200 hover:bg-black/10`}
          ref={prevElRef}
        >
          <Icon icon={ChevronLeftIcon} size="md" color="primary" />
        </div>
        <div
          className={`${
            withThumbs ? "lg:hidden" : ""
          } text-accent-10 absolute inset-y-0 right-0 z-[1] flex h-full cursor-pointer items-center transition duration-200 hover:bg-black/10`}
          ref={nextElRef}
        >
          <Icon icon={ChevronRightIcon} size="md" color="primary" />
        </div>
      </Swiper>
      {withThumbs && images?.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs, Lazy]}
          navigation={{
            prevEl: prevElThumb,
            nextEl: nextElThumb,
            disabledClass: "swiper-button-disabled",
          }}
          className={cn(
            "mt-2.5 hidden h-24 w-full rounded lg:block",
            thumbsClassName
          )}
        >
          {images?.map(({ src, alt, ...imageProps }, i) => (
            <SwiperSlide
              key={`Carousel Item ${i}`}
              className="bg-accent-1 aspect-video cursor-pointer overflow-hidden rounded"
            >
              <Image src={src} alt={alt} {...imageProps} />
            </SwiperSlide>
          ))}
          <div
            className="text-accent-10 absolute inset-y-0 left-0 z-[1] flex h-full transform cursor-pointer items-center transition duration-200 hover:bg-black/10"
            ref={prevElRefThumb}
          >
            <Icon icon={ChevronLeftIcon} size="md" color="primary" />
          </div>
          <div
            className="text-accent-10 absolute inset-y-0 right-0 z-[1] flex h-full cursor-pointer items-center transition duration-200 hover:bg-black/10"
            ref={nextElRefThumb}
          >
            <Icon icon={ChevronRightIcon} size="md" color="primary" />
          </div>
        </Swiper>
      )}
    </>
  );
};

export default memo(Carousel);

Carousel.defaultProps = {
  withThumbs: false,
  withPagination: false,
  loop: false,
  autoplay: false,
  className: undefined,
  thumbsClassName: undefined,
};
