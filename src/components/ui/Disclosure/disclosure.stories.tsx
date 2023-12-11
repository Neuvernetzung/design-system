import { Meta } from "@storybook/react";
import { useState } from "react";

import { disclosureVariants, sizes } from "../../../types";
import { Disclosure } from ".";

export default {
  title: "UI/Disclosures/Disclosure",
  component: Disclosure,
  argTypes: {
    color: {
      control: { type: "select" },
    },
    variant: {
      control: { type: "select" },
    },
    size: {
      control: { type: "select", default: "md" },
    },
    as: { control: false },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

const disclosureProps = { title: "Disclosure", content: "Content 1" };

export const Default = ({ ...args }) => (
  <Container>
    <Disclosure {...disclosureProps} {...args} />
  </Container>
);

export const Sizes = ({ ...args }) => (
  <Container>
    {sizes.map((size) => (
      <Disclosure key={size} size={size} {...disclosureProps} {...args} />
    ))}
  </Container>
);

export const Variants = ({ ...args }) => (
  <Container>
    {disclosureVariants.map((variant) => (
      <Disclosure
        key={variant}
        variant={variant}
        {...disclosureProps}
        {...args}
      />
    ))}
  </Container>
);

export const ChevronIcon = ({ ...args }) => (
  <Container>
    <Disclosure icon="chevron" {...disclosureProps} {...args} />
  </Container>
);

export const DefaultOpen = ({ ...args }) => {
  const [open, setOpen] = useState(true);

  return (
    <Container>
      <Disclosure {...disclosureProps} defaultOpen {...args} />
      <Disclosure
        {...disclosureProps}
        open={open}
        setOpen={setOpen}
        {...args}
      />
    </Container>
  );
};

export const Controlled = ({ ...args }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Container className="flex flex-col">
      {JSON.stringify(open)}
      <Disclosure
        open={open}
        setOpen={setOpen}
        forceMount
        {...disclosureProps}
        {...args}
      />
    </Container>
  );
};
