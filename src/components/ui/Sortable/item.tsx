import { UniqueIdentifier, DraggableAttributes } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import isFunction from "lodash/isFunction";
import { ElementType, ForwardedRef, forwardRef, ReactNode } from "react";
import type { PolymorphicPropsWithoutRef } from "../../../utils/internal/polymorphic";

import { mergeRefs, typedMemo } from "../../../utils/internal";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { DragIndicator } from "./Indicator";
import { cn } from "@/utils";

type FunctionChildrenProps<THandle extends boolean> = {
  handle: THandle extends true
    ? SyntheticListenerMap & DraggableAttributes
    : undefined;
};

export type SortableItemProps<THandle extends boolean> = {
  id: UniqueIdentifier;
  handle?: THandle;
  indicator?: boolean;
  children:
    | ReactNode
    | (({ handle }: FunctionChildrenProps<THandle>) => ReactNode);
};

const SortableItemDefaultElement = "div";

const SortableItemInner = <
  THandle extends boolean = false,
  T extends ElementType = typeof SortableItemDefaultElement
>(
  {
    id,
    handle,
    indicator,
    as,
    children,
    className,
    ...props
  }: PolymorphicPropsWithoutRef<SortableItemProps<THandle>, T>,
  ref: ForwardedRef<HTMLElement>
) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const Component: ElementType = as || SortableItemDefaultElement;

  if (isDragging && indicator)
    return <DragIndicator setNodeRef={setNodeRef} style={style} />;

  return (
    <Component
      ref={mergeRefs([ref, setNodeRef])}
      style={style}
      {...(handle ? {} : attributes)}
      {...(handle ? {} : listeners)}
      className={cn(isDragging && "opacity-50", className)}
      {...props}
    >
      {isFunction(children)
        ? children({
            handle: (handle === true
              ? {
                  ...(handle ? listeners : {}),
                  ...(handle ? attributes : {}),
                }
              : undefined) as FunctionChildrenProps<THandle>["handle"],
          })
        : children}
    </Component>
  );
};

const SortableItem = forwardRef(SortableItemInner) as <
  THandle extends boolean = false,
  T extends ElementType = typeof SortableItemDefaultElement
>(
  props: PolymorphicPropsWithoutRef<SortableItemProps<THandle>, T> & {
    ref?: ForwardedRef<HTMLElement>;
  }
) => ReturnType<typeof SortableItemInner>;

export default typedMemo(SortableItem);
