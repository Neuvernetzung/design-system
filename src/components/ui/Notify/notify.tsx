import {
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoSquareRounded,
} from "@tabler/icons-react";
import cn from "classnames";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { create } from "zustand";

import { zIndexes } from "../../../styles";
import type { Color, SvgType, ToastVariant } from "../../../types";
import { typedMemo } from "../../../utils/internal";
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
  message: string;
  icon?: SvgType;
  duration?: number;
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

      if (isLoading()) loading(false);

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

  return (
    <div
      className={cn(
        "visible fixed bottom-5 right-5 flex max-h-screen flex-col-reverse flex-wrap-reverse gap-5",
        zIndexes.notify
      )}
    >
      {notificationArray.map(
        ({ id, message, color = "accent", icon, variant }) => (
          <Toast
            key={id}
            message={message}
            color={color}
            handleClose={() =>
              setNotificationArray((oldArray) =>
                oldArray.filter((item) => item.id !== id)
              )
            }
            variant={variant}
            icon={icon || icons[color]}
          />
        )
      )}
    </div>
  );
};

export default typedMemo(Notify);
