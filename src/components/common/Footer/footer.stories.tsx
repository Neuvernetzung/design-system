import { Meta } from "@storybook/react";
import React from "react";

import { Logo } from "../../../../public/Logo";
import { Icon } from "../../ui/Icon";
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
