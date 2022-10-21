import { ToastProps, useToast } from "@chakra-ui/react";

export const Notify = () => {
  const toast = useToast();

  const notify = ({
    title,
    description,
    status = "success",
    position = "bottom-right",
    duration = 5000,
    isClosable = true,
    colorScheme = "gray",
    ...props
  }: ToastProps) =>
    toast({
      title,
      description,
      status,
      position,
      duration,
      isClosable,
      colorScheme,
      ...props,
    });

  return { notify };
};
