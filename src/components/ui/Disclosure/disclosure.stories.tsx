import { useState } from "react";

import { disclosureVariants, sizes } from "../../../types";
import { Disclosure } from ".";

export default {
  title: "UI/Disclosures/Disclosure",
  component: Disclosure,
};

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

const disclosureProps = { title: "Disclosure", content: "Content 1" };

export const Default = {
  render: ({ ...args }) => (
    <Container>
      <Disclosure {...disclosureProps} {...args} />
    </Container>
  ),
};

export const Sizes = {
  render: ({ ...args }) => (
    <Container>
      {sizes.map((size) => (
        <Disclosure key={size} size={size} {...disclosureProps} {...args} />
      ))}
    </Container>
  ),
};

export const Variants = {
  render: ({ ...args }) => (
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
  ),
};

export const ChevronIcon = {
  render: ({ ...args }) => (
    <Container>
      <Disclosure icon="chevron" {...disclosureProps} {...args} />
    </Container>
  ),
};

export const DefaultOpen = {
  render: ({ ...args }) => {
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
  },
};

export const Controlled = {
  render: ({ ...args }) => {
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
  },
};
