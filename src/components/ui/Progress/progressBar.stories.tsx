
import { useState } from "react";

import { ProgressBar } from ".";
import { Button } from "..";
import { colors, sizes } from "../../../types";

export default {
  title: "UI/Data Display/ProgressBar",
  component: ProgressBar,
} ;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5 w-full justify-between" {...props} />
);
export const Colors = {
  render: ({ ...args }) => (
    <Container>
      {colors.map((color) => (
        <ProgressBar key={color} progress={33} color={color} {...args} />
      ))}
    </Container>
  ),
};
export const Sizes = {
  render: ({ ...args }) => (
    <Container>
      {sizes.map((size) => (
        <ProgressBar key={size} progress={33} size={size} {...args} />
      ))}
    </Container>
  ),
};
export const Transition = {
  render: ({ ...args }) => {
    const [progress, setProgress] = useState(33);

    return (
      <Container>
        <ProgressBar progress={progress} {...args} />
        <Button onClick={() => setProgress(66)}>66</Button>
        <Button onClick={() => setProgress(33)}>33</Button>
      </Container>
    );
  },
};
