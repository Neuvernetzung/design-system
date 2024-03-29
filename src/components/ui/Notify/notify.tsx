import { ToastProvider, ToastViewport } from "@radix-ui/react-toast";
import {
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoSquareRounded,
} from "@tabler/icons-react";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { create } from "zustand";

import { zIndexes } from "../../../styles";
import type { Color, SvgType, ToastVariant } from "../../../types";
import { isLoading, loading } from "../Loading/loading";
import { Toast } from "../Toast";

type NotifyState = {
  notification?: NotifyProps;
};

const useNotifyState = create<NotifyState>(() => ({
  notification: undefined,
}));

export const notify = (notification: NotifyProps) => {
  useNotifyState.setState({ notification });
};

export type NotifyProps = {
  color?: Color;
  variant?: ToastVariant;
  title?: string;
  message: string;
  icon?: SvgType;
  duration?: number;
  loadingId?: string;
};

export type GeneralNotifyProps = Pick<NotifyProps, "variant">;

type NotifyWithId = NotifyProps & {
  id: string;
};

export const Notify = ({ variant }: GeneralNotifyProps) => {
  const notification = useNotifyState((state) => state.notification);

  const [notificationArray, setNotificationArray] = useState<NotifyWithId[]>(
    []
  );

  useEffect(() => {
    if (notification) {
      const id = uuid();
      setNotificationArray((oldArray) => [
        ...oldArray,
        {
          message: notification.message,
          color: notification.color,
          variant: notification.variant || variant,
          id,
        },
      ]);

      if (notification.loadingId) {
        if (isLoading(notification.loadingId))
          loading(false, notification.loadingId);
      } else if (isLoading()) loading(false);

      setTimeout(() => {
        setNotificationArray((oldArray) =>
          oldArray.filter((item) => item.id !== id)
        );
      }, notification.duration || 5000);
    }
  }, [notification]);

  const icons: Record<Color, SvgType> = {
    brand: IconCircleCheck,
    primary: IconCircleCheck,
    accent: IconInfoSquareRounded,
    success: IconCircleCheck,
    warn: IconAlertTriangle,
    danger: IconAlertTriangle,
    black: IconInfoSquareRounded,
    white: IconInfoSquareRounded,
  };

  if (!notificationArray || notificationArray.length === 0) return null;

  return (
    <ToastProvider swipeDirection="right">
      <div className={cn("visible fixed bottom-5 right-5", zIndexes.notify)}>
        {notificationArray.map(
          ({ id, message, color = "accent", icon, variant, title }) => (
            <Toast
              key={id}
              title={title}
              message={message}
              color={color}
              open
              setOpen={() =>
                setNotificationArray((oldArray) =>
                  oldArray.filter((item) => item.id !== id)
                )
              }
              variant={variant}
              icon={icon || icons[color]}
            />
          )
        )}
        <ToastViewport className="max-h-screen flex flex-col-reverse flex-wrap-reverse gap-5" />
      </div>
    </ToastProvider>
  );
};
