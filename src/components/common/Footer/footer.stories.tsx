import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Logo } from "../../../../public/Logo";
import { Icon } from "../../ui/Icon";
import { Heading } from "../../ui/Typography/Heading";
import { Footer } from "./footer";

export default {
  title: "COMMON/Footer",
  component: Footer,
  argTypes: {},
} as Meta;

export const Default = ({ ...args }) => (
  <Footer
    className="bg-accent-100 dark:bg-accent-800"
    logo={<Icon size="lg" icon={Logo} className="fill-primary-500" />}
    copyright="Copyright by Neuvernetzung UG"
    cols={[
      {
        label: "Rechtliches",
        links: [
          { label: "Impressum", href: "/" },
          { label: "Datenschutz", href: "/" },
        ],
      },
      {
        label: "Rechtliches",
        links: [
          { label: "Impressum", href: "/" },
          { label: "Datenschutz", href: "/" },
        ],
      },
      {
        label: "Rechtliches",
        links: [
          { label: "Impressum", href: "/" },
          { label: "Datenschutz", href: "/" },
        ],
      },
      {
        label: "Rechtliches",
        links: [
          { label: "Impressum", href: "/" },
          { label: "Datenschutz", href: "/" },
        ],
      },
    ]}
    {...args}
  />
);

Default.parameters = {
  a11y: {
    disable: true,
  },
};
