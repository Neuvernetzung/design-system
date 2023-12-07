import { DraggableAttributes, UniqueIdentifier } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Slot } from "@radix-ui/react-slot";
import isFunction from "lodash/isFunction";
import { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from "react";

import { cn } from "@/utils";

import { mergeRefs } from "../../../utils/internal";
import { DragIndicator } from "./Indicator";

type FunctionChildrenProps<THandle extends boolean> = {
  handle: THandle extends true
    ? SyntheticListenerMap & DraggableAttributes
    : undefined;
};

export type SortableItemProps<THandle extends boolean> = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  id: UniqueIdentifier;
  handle?: THandle;
  indicator?: boolean;
  asChild?: boolean;
  children:
    | ReactNode
    | (({ handle }: FunctionChildrenProps<THandle>) => ReactNode);
};

export const SortableItemInner = <THandle extends boolean = false>(
  {
    id,
    handle,
    indicator,
    asChild,
    children,
    className,
    ...props
  }: SortableItemProps<THandle>,
  ref: ForwardedRef<HTMLDivElement>
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

  const Component = asChild ? Slot : "div";

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

export const SortableItem = forwardRef(SortableItemInner) as <
  THandle extends boolean = false
>(
  props: SortableItemProps<THandle> & {
    ref?: ForwardedRef<HTMLButtonElement>;
  }
) => ReturnType<typeof SortableItemInner>;
