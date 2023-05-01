import { UniqueIdentifier, DraggableAttributes } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import isFunction from "lodash/isFunction";
import { ElementType, ForwardedRef, forwardRef, ReactNode } from "react";
import { PolymorphicPropsWithoutRef } from "react-polymorphic-types";

import { mergeRefs, typedMemo } from "../../../utils/internal";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

type FunctionChildrenProps<THandle extends boolean> = {
  handle: THandle extends true
    ? SyntheticListenerMap & DraggableAttributes
    : undefined;
};

export type SortableItemProps<THandle extends boolean> = {
  id: UniqueIdentifier;
  handle?: THandle;
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
    as,
    children,
    ...props
  }: PolymorphicPropsWithoutRef<SortableItemProps<THandle>, T>,
  ref: ForwardedRef<HTMLElement>
) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Component: ElementType = as || SortableItemDefaultElement;

  return (
    <Component
      ref={mergeRefs([ref, setNodeRef])}
      style={style}
      {...(handle ? {} : attributes)}
      {...(handle ? {} : listeners)}
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
