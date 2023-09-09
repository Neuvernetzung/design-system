import { Dialog, Transition } from "@headlessui/react";
import cn from "classnames";
import { Backdrop } from "../Backdrop";
import { paddingsY, pagePaddings, zIndexes } from "../../../styles";
import { Fragment, MutableRefObject, useState } from "react";
import { Carousel, CarouselController, CarouselProps } from "./carousel";
import { IconButton } from "../Button";
import { CrossIcon } from "../../../theme/icons";
import { Swiper as SwiperType } from "swiper/types";
import { useThemeStateValue } from "../../../theme";

export type CarouselModalController = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialSlide: number;
} & CarouselController;

export type CarouselModalProps = {
  initialFocus?: MutableRefObject<HTMLElement | null>;
  onClose?: () => void;
  controller: CarouselModalController;
} & CarouselProps;

export type UseCarouselProps = {
  initialState?: boolean;
  initialSlide?: number;
};

export const useCarousel = ({
  initialState,
  initialSlide,
}: UseCarouselProps) => {
  const [open, setOpen] = useState<boolean>(initialState || false);
  const [slide, setSlide] = useState<number>(initialSlide || 0);
  const [swiperModal, setSwiperModal] = useState<SwiperType>();

  const setSlideAndOpen = (slide: number) => {
    setSlide(slide);
    setOpen(true);
  };

  const swiperModalController: CarouselModalController = {
    initialSlide: slide,
    open,
    setOpen,
    setSwiper: undefined,
    // undefined, denn das normale Carousel muss das Modal nicht kontrollieren, es reicht die initialSlide.
    // wenn das Carousel das Modal kontrolliert, kommt es zu Fehlern, da swiper immer destroyed wird und initialSlide nicht respektiert wird
    swiper: swiperModal,
  };

  const swiperController: CarouselController = {
    setSwiper: setSwiperModal,
    swiper: undefined,
  };

  return {
    open,
    setOpen,
    slide,
    setSlide,
    setSlideAndOpen,
    swiperController,
    swiperModalController,
  };
};

export const CarouselModal = ({
  slides = [],
  initialFocus,
  onClose,
  withThumbs = true,
  controller,
  ...restCarouselProps
}: CarouselModalProps) => {
  const handleClose = () => {
    onClose?.();
    controller?.setOpen(false);
  };

  const pagePadding = useThemeStateValue((state) => state.pagePadding);

  return (
    <Transition appear show={controller?.open} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={initialFocus}
        className={cn("relative", zIndexes.modal)}
        onClose={handleClose}
      >
        <Backdrop />

        <div className="fixed inset-x-0 bottom-0 top-12">
          <div
            className={cn(
              "h-full items-center justify-center",
              pagePaddings[pagePadding],
              paddingsY.lg
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  "relative flex justify-end h-full max-h-full w-full"
                )}
              >
                <IconButton
                  onClick={handleClose}
                  icon={CrossIcon}
                  ariaLabel="close_carousel_modal"
                  className="h-min -translate-y-12"
                  variant="ghost"
                />
                <Carousel
                  className="absolute top-0 bottom-12 lg:bottom-32"
                  slides={slides}
                  withThumbs={withThumbs}
                  thumbsClassName="absolute bottom-4"
                  thumbsProps={{
                    slidesPerView: 4,
                    breakpoints: {
                      1024: { slidesPerView: 10 },
                    },
                    ...restCarouselProps.thumbsProps,
                  }}
                  controller={controller}
                  swiperProps={{
                    initialSlide: controller?.initialSlide,

                    ...restCarouselProps.swiperProps,
                  }}
                  {...restCarouselProps}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
