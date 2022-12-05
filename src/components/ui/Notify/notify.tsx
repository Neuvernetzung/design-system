import cn from "classnames";
import { ElementType, memo, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import create from "zustand";

import { zIndexes } from "../../../styles";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "../../../theme/icons";
import { Colors } from "../../../types";
import { loading, isLoading } from "../Loading/loading";
import { Toast } from "../Toast";
import { ToastVariants } from "../Toast/toast";

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
  status?: keyof Colors;
  variant?: keyof ToastVariants;
  message: string;
  icon?: ElementType<SVGElement>;
};

interface NotifyWithId extends NotifyProps {
  id: string;
}

export const Notify = () => {
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
          status: notification.status,
          variant: notification.variant,
          id,
        },
      ]);

      if (isLoading()) loading(false);

      setTimeout(() => {
        setNotificationArray((oldArray) =>
          oldArray.filter((item) => item.id !== id)
        );
      }, 5000);
    }
  }, [notification]);

  const icons: Colors = {
    primary: CheckCircleIcon,
    accent: InformationCircleIcon,
    success: CheckCircleIcon,
    warn: ExclamationCircleIcon,
    danger: ExclamationCircleIcon,
  };

  return (
    <div
      className={cn(
        "visible fixed bottom-5 right-5 flex max-h-screen flex-col-reverse flex-wrap-reverse gap-5",
        zIndexes.notify
      )}
    >
      {notificationArray.map(
        ({ id, message, status = "accent", icon, variant }) => (
          <Toast
            key={id}
            message={message}
            color={status}
            handleClose={() =>
              setNotificationArray((oldArray) =>
                oldArray.filter((item) => item.id !== id)
              )
            }
            variant={variant}
            icon={icon || icons[status]}
          />
        )
      )}
    </div>
  );
};

export default memo(Notify);
