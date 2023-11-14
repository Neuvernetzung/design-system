import { type RefObject, useEffect } from "react";
import { useRefDimensions } from "@/hooks";
import { getHours, getMinutes } from "date-fns";

export type UseScrollToTimeProps = {
  gridContainerRef: RefObject<HTMLDivElement>;
  gridInnerRef: RefObject<HTMLDivElement>;
};

export const useScrollToTime = ({
  gridContainerRef,
  gridInnerRef,
}: UseScrollToTimeProps) => {
  const { height: containerHeight } = useRefDimensions(gridContainerRef);

  const { height } = useRefDimensions(gridInnerRef);

  useEffect(() => {
    const time = new Date();

    gridContainerRef.current?.scrollTo({
      top:
        height * ((1 / 24) * (getHours(time) + getMinutes(time) / 60)) -
        containerHeight / 2,
    });
  }, [height !== 0 && containerHeight !== 0]); // Automatisch zu aktueller Uhrzeit Scrollen bei Init. Jedoch ist bei [] height noch nicht geladen, deswegen scroll wenn Height sich das erste mal verändert.
};
