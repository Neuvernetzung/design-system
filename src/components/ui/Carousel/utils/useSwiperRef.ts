import { Ref, useEffect, useRef, useState } from "react";

const useSwiperRef = <T extends HTMLElement>(): [
  T | undefined | null,
  Ref<T>
] => {
  const [wrapper, setWrapper] = useState<T | null>(null);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      setWrapper(ref.current);
    }
  }, []);

  return [wrapper, ref];
};

export default useSwiperRef;
