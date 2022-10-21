import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/navigation";
import "swiper/css/keyboard";
import "swiper/css/thumbs";
// import "./CarouselStyle.css";
import "swiper/css/pagination";

import { AspectRatio } from "@chakra-ui/react";
import { useState } from "react";
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

import { ChevronLeftIcon, ChevronRightIcon } from "../../lib/components/icons";
import { type BoxProps, Box, Flex } from "../Containers";
import { Icon } from "../Icon";
import { ImageContainer } from "../ImageContainer";
import useSwiperRef from "./utils/useSwiperRef";

type CarouselProps = {
  images: ImageProps[];
  withThumbs?: boolean;
  withPagination?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  containerProps?: BoxProps;
  aspectRatio?: number;
  thumbsProps?: BoxProps;
};

type ImageProps = {
  src: string;
  alt: string;
  fromPublic?: boolean;
};

export const Carousel = ({
  images = [],
  withThumbs = false,
  withPagination = false,
  loop = false,
  autoplay = false,
  containerProps,
  aspectRatio = 4 / 3,
  thumbsProps,
}: CarouselProps) => {
  const [thumbsSwiper, setThumbsSwiper]: any = useState(null);
  const [nextEl, nextElRef] = useSwiperRef();
  const [prevEl, prevElRef] = useSwiperRef();
  const [nextElThumb, nextElRefThumb] = useSwiperRef();
  const [prevElThumb, prevElRefThumb] = useSwiperRef();

  return (
    <>
      <AspectRatio ratio={aspectRatio} rounded="md" overflow="hidden">
        <Box {...containerProps}>
          <Swiper
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
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }} // Workaround - cannot convert undefined or null to object - thumbs={{ swiper: thumbsSwiper }}
          >
            {images?.map(({ src, alt, ...imageProps }, i) => (
              <SwiperSlide key={`Carousel Item ${i}`}>
                <ImageContainer src={src} alt={alt} {...imageProps} />
              </SwiperSlide>
            ))}
            <Box
              visibility={
                withThumbs ? { base: "visible", lg: "hidden" } : "visible"
              }
              transition="all .2s"
              left="0"
              top="0"
              bottom="0"
              position="absolute"
              height="full"
              display="flex"
              alignItems="center"
              zIndex="1"
              cursor="pointer"
              _hover={{ bg: "blackAlpha.200" }}
              ref={prevElRef}
            >
              <Icon icon={ChevronLeftIcon} color="primary.500" />
            </Box>
            <Box
              visibility={
                withThumbs ? { base: "visible", lg: "hidden" } : "visible"
              }
              transition="all .2s"
              right="0"
              top="0"
              bottom="0"
              position="absolute"
              height="full"
              display="flex"
              alignItems="center"
              zIndex="1"
              cursor="pointer"
              _hover={{ bg: "blackAlpha.200" }}
              ref={nextElRef}
            >
              <Icon icon={ChevronRightIcon} color="primary.500" />
            </Box>
          </Swiper>
        </Box>
      </AspectRatio>
      {withThumbs && images?.length > 1 && (
        <Box
          h="24"
          mt="2.5"
          rounded="md"
          display={{ base: "none", lg: "block" }}
          {...thumbsProps}
        >
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
          >
            {images?.map(({ src, alt, ...imageProps }, i) => (
              <SwiperSlide key={`Carousel Item ${i}`}>
                <Flex
                  h="24"
                  bg="gray.100"
                  overflow="hidden"
                  rounded="md"
                  cursor="pointer"
                >
                  <ImageContainer src={src} alt={alt} {...imageProps} />
                </Flex>
              </SwiperSlide>
            ))}
            <Box
              transition="all .2s"
              left="0"
              top="0"
              bottom="0"
              position="absolute"
              height="full"
              display="flex"
              alignItems="center"
              zIndex="1"
              cursor="pointer"
              _hover={{ bg: "blackAlpha.200" }}
              ref={prevElRefThumb}
            >
              <Icon icon={ChevronLeftIcon} color="primary.500" />
            </Box>
            <Box
              transition="all .2s"
              right="0"
              top="0"
              bottom="0"
              position="absolute"
              height="full"
              display="flex"
              alignItems="center"
              zIndex="1"
              cursor="pointer"
              _hover={{ bg: "blackAlpha.200" }}
              ref={nextElRefThumb}
            >
              <Icon icon={ChevronRightIcon} color="primary.500" />
            </Box>
          </Swiper>
        </Box>
      )}
    </>
  );
};

Carousel.defaultProps = {
  withThumbs: false,
  withPagination: false,
  loop: false,
  autoplay: false,
  containerProps: undefined,
  aspectRatio: 4 / 3,
  thumbsProps: undefined,
};
