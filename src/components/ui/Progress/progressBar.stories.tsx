import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { ProgressBar } from ".";
import { colors, sizes } from "../../../types";

export default {
  title: "UI/Data Display/ProgressBar",
  component: ProgressBar,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5 w-full justify-between" {...props} />
);
export const Colors = ({ ...args }) => (
  <Container>
    {colors.map((color) => (
      <ProgressBar key={color} progress={33} color={color} />
    ))}
  </Container>
);
export const Sizes = ({ ...args }) => (
  <Container>
    {sizes.map((size) => (
      <ProgressBar key={size} progress={33} size={size} />
    ))}
  </Container>
);
