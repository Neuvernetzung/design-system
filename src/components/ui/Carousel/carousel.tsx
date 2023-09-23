import cn from "classnames";
import { ReactNode, useState } from "react";
import {
  A11y,
  Autoplay,
  FreeMode,
  Keyboard,
  Navigation,
  Pagination,
  Thumbs,
  Controller,
} from "swiper/modules";
import { Swiper, type SwiperProps, SwiperSlide } from "swiper/react";
import { AutoplayOptions, Swiper as SwiperType } from "swiper/types";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { margins } from "../../../styles";
import { typedMemo } from "../../../utils/internal";
import { IconButton } from "../Button";
import useSwiperRef from "./utils/useSwiperRef";

export type CarouselAutoPlayOptions = AutoplayOptions;

export type SlideProps = {
  children: ReactNode;
};

export type CarouselController = {
  swiper: SwiperType | undefined;
  setSwiper: ((swiper: SwiperType) => void) | undefined;
};

export type CarouselProps = {
  slides: SlideProps[];
  withThumbs?: boolean;
  withPagination?: boolean;
  loop?: boolean;
  autoplay?: boolean | AutoplayOptions;
  className?: string;
  thumbsClassName?: string;
  swiperProps?: SwiperProps;
  thumbsProps?: SwiperProps;
  previousButtonClassName?: string;
  nextButtonClassName?: string;
  previousThumbButtonClassName?: string;
  nextThumbButtonClassName?: string;
  slideClassName?: string;
  controller?: CarouselController;
};

export const Carousel = ({
  slides = [],
  withThumbs = false,
  withPagination = false,
  loop = false,
  autoplay = false,
  className,
  thumbsClassName,
  swiperProps,
  thumbsProps,
  previousButtonClassName,
  nextButtonClassName,
  previousThumbButtonClassName,
  nextThumbButtonClassName,
  slideClassName,
  controller,
}: CarouselProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();
  const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();
  const [nextElThumb, nextElRefThumb] = useSwiperRef<HTMLButtonElement>();
  const [prevElThumb, prevElRefThumb] = useSwiperRef<HTMLButtonElement>();

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
          Pagination,
          ...(controller ? [Controller] : []),
        ]}
        spaceBetween={0}
        slidesPerView={1}
        keyboard
        autoplay={autoplay}
        loop={loop}
        onSwiper={controller ? controller.setSwiper : undefined}
        controller={controller ? { control: controller?.swiper } : undefined}
        pagination={{
          enabled: withPagination,
          clickable: true,
        }}
        navigation={{
          prevEl,
          nextEl,
          disabledClass: "opacity-50",
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }} // Workaround - cannot convert undefined or null to object - thumbs={{ swiper: thumbsSwiper }}
        {...swiperProps}
      >
        {slides?.map(({ children }, i) => (
          <SwiperSlide
            key={`Carousel Item ${i}`}
            className={cn("overflow-hidden", slideClassName)}
          >
            {children}
          </SwiperSlide>
        ))}
        <IconButton
          variant="ghost"
          ariaLabel="previous Element"
          className={cn(
            withThumbs && "lg:hidden",
            "absolute inset-y-0 left-0 z-[1] my-auto flex justify-center h-min",
            margins.md,
            previousButtonClassName
          )}
          ref={prevElRef}
          icon={IconChevronLeft}
        />
        <IconButton
          variant="ghost"
          ariaLabel="next Element"
          className={cn(
            withThumbs && "lg:hidden",
            "absolute inset-y-0 right-0 z-[1] my-auto flex justify-center h-min",
            margins.md,
            nextButtonClassName
          )}
          ref={nextElRef}
          icon={IconChevronRight}
        />
      </Swiper>
      {withThumbs && slides?.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          navigation={{
            prevEl: prevElThumb,
            nextEl: nextElThumb,
            disabledClass: "opacity-50",
          }}
          className={cn(
            "mt-2.5 hidden h-24 w-full rounded lg:block",
            thumbsClassName
          )}
          {...thumbsProps}
        >
          {slides?.map(({ children }, i) => (
            <SwiperSlide
              key={`Carousel Item ${i}`}
              className="bg-accent-1 aspect-video cursor-pointer overflow-hidden rounded"
            >
              {children}
            </SwiperSlide>
          ))}
          <IconButton
            variant="ghost"
            ariaLabel="previous Thumb Element"
            icon={IconChevronLeft}
            className={cn(
              "absolute inset-y-0 my-auto left-0 z-[1] h-min",
              previousThumbButtonClassName
            )}
            ref={prevElRefThumb}
          />
          <IconButton
            variant="ghost"
            ariaLabel="next Thumb Element"
            className={cn(
              "absolute inset-y-0 my-auto right-0 z-[1] h-min",
              nextThumbButtonClassName
            )}
            ref={nextElRefThumb}
            icon={IconChevronRight}
          />
        </Swiper>
      )}
    </>
  );
};

export default typedMemo(Carousel);
