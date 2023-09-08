import { Meta } from "@storybook/react";
import React from "react";

import { Button } from "../Button";
import { Link } from "./link";

export default {
  title: "UI/Buttons/Link",
  component: Link,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <Link {...args} href="/test">
      Link
    </Link>
  </Container>
);

export const AsButton = ({ ...args }) => (
  <Container>
    <Link href="/" passHref legacyBehavior>
      <Button as="a">Link</Button>
    </Link>
  </Container>
);

export const Disabled = ({ ...args }) => (
  <Container>
    <Link href="/" disabled>
      Link
    </Link>
  </Container>
);
