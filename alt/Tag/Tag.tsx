import {
  type TagProps as ChakraTagProps,
  Tag as ChakraTag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";

export interface TagProps extends ChakraTagProps {
  label?: ReactNode;
  rightIcon?: FC;
  leftIcon?: FC;
}

export const Tag = ({ label, rightIcon, leftIcon, ...props }: TagProps) => (
  <ChakraTag {...props}>
    {leftIcon && <TagLeftIcon as={leftIcon} />}
    <TagLabel>{label}</TagLabel>
    {rightIcon && <TagRightIcon as={rightIcon} />}
  </ChakraTag>
);

Tag.defaultProps = {
  label: undefined,
  rightIcon: undefined,
  leftIcon: undefined,
};
