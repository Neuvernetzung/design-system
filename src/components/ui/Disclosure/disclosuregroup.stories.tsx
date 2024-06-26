import { useState } from "react";

import { disclosureVariants, sizes } from "../../../types";
import { DisclosureGroup } from ".";

export default {
  title: "UI/Disclosures/DisclosureGroup",
  component: DisclosureGroup,
};

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = {
  render: ({ ...args }) => (
    <Container>
      <DisclosureGroup
        items={[
          { title: "Disclosure 1", content: "Content 1" },
          { title: "Disclosure 2", content: "Content 2" },
          { title: "Disclosure 3", content: "Content 3" },
        ]}
        {...args}
      />
    </Container>
  ),
};

export const Sizes = {
  render: ({ ...args }) => (
    <Container>
      {sizes.map((size) => (
        <DisclosureGroup
          key={size}
          size={size}
          items={[
            { title: `${size} 1`, content: "Content 1" },
            { title: `${size} 2`, content: "Content 2" },
            { title: `${size} 3`, content: "Content 3" },
          ]}
          {...args}
        />
      ))}
    </Container>
  ),
};

export const Variants = {
  render: ({ ...args }) => (
    <Container>
      {disclosureVariants.map((variant) => (
        <DisclosureGroup
          key={variant}
          variant={variant}
          items={[
            { title: `${variant} 1`, content: "Content 1" },
            { title: `${variant} 2`, content: "Content 2" },
            { title: `${variant} 3`, content: "Content 3" },
          ]}
          {...args}
        />
      ))}
    </Container>
  ),
};

export const ChevronIcon = {
  render: ({ ...args }) => (
    <Container>
      <DisclosureGroup
        icon="chevron"
        items={[
          { title: `1`, content: "Content 1" },
          { title: `2`, content: "Content 2" },
          { title: `3`, content: "Content 3" },
        ]}
        {...args}
      />
    </Container>
  ),
};

export const DefaultOpen = {
  render: ({ ...args }) => (
    <Container>
      <DisclosureGroup
        items={[
          { title: `1`, content: "Content 1", defaultOpen: true },
          { title: `2`, content: "Content 2" },
          { title: `3`, content: "Content 3" },
        ]}
        {...args}
      />
    </Container>
  ),
};

export const Controlled = {
  render: ({ ...args }) => {
    const [value, setValue] = useState<number[]>([]);

    return (
      <Container className="flex flex-col">
        {JSON.stringify(value)}
        <DisclosureGroup
          value={value}
          setValue={setValue}
          items={[
            { title: `1`, content: "Content 1", defaultOpen: true },
            { title: `2`, content: "Content 2" },
            { title: `3`, content: "Content 3", forceMount: true },
          ]}
          {...args}
        />
      </Container>
    );
  },
};
