import { Meta } from "@storybook/react";
import React, { useState } from "react";

import { ProgressBar } from ".";
import { Button } from "..";
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
export const Transition = ({ ...args }) => {
  const [progress, setProgress] = useState(33);

  return (
    <Container>
      <ProgressBar progress={progress} />
      <Button onClick={() => setProgress(66)}>66</Button>
      <Button onClick={() => setProgress(33)}>33</Button>
    </Container>
  );
};
