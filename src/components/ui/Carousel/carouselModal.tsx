import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  Root as DialogRoot,
} from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/utils";
import { MutableRefObject, useState } from "react";
import { Swiper as SwiperType } from "swiper/types";

import {
  modalAnimation,
  pagePaddings,
  transition,
  zIndexes,
} from "../../../styles";
import { useThemeStateValue } from "../../../theme";
import { Backdrop } from "../Backdrop";
import { IconButton } from "../Button";
import { Carousel, CarouselController, type CarouselProps } from "./carousel";

export type CarouselModalController = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialSlide: number;
} & CarouselController;

export type CarouselModalProps = {
  initialFocus?: MutableRefObject<HTMLElement>;
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
  const { open, setOpen } = controller;

  const pagePadding = useThemeStateValue((state) => state.pagePadding);

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogPortal>
        <DialogOverlay asChild className={cn(zIndexes.modal)}>
          <Backdrop isOpen={controller?.open} />
        </DialogOverlay>
        <DialogContent
          onOpenAutoFocus={
            initialFocus
              ? (e) => {
                  e.preventDefault();
                  initialFocus.current.focus();
                }
              : undefined
          }
          className={cn(
            "fixed inset-x-0 bottom-0 top-12 will-change-[transform,opacity]",
            zIndexes.modal,
            modalAnimation,
            transition
          )}
        >
          <div
            className={cn(
              "h-full items-center justify-center",
              pagePaddings[pagePadding]
            )}
          >
            <div
              className={cn(
                "relative flex justify-end h-full max-h-full w-full"
              )}
            >
              <DialogClose asChild>
                <IconButton
                  onClick={handleClose}
                  icon={IconX}
                  ariaLabel="close_carousel_modal"
                  className="h-min -translate-y-12"
                  variant="ghost"
                />
              </DialogClose>
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
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};
