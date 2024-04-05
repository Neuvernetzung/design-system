

import { Button } from "../Button";
import { Link } from "./link";

export default {
  title: "UI/Buttons/Link",
  component: Link,
} ;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = {
  render: ({ ...args }) => (
    <Container>
      <Link {...args} href="/test">
        Link
      </Link>
    </Container>
  ),
};

export const AsButton = {
  render: ({ ...args }) => (
    <Container>
      <Link href="/" {...args}>
        <Button>Link</Button>
      </Link>
    </Container>
  ),
};

export const Disabled = {
  render: ({ ...args }) => (
    <Container>
      <Link href="/" disabled {...args}>
        Link
      </Link>
    </Container>
  ),
};
