import { Meta } from "@storybook/react";
import React from "react";

import { Logo } from "../../../../public/Logo";
import { Icon } from "../../ui/Icon";
import { Footer } from "./footer";
import { IconBeach } from "@tabler/icons-react";

export default {
  title: "COMMON/Footer",
  component: Footer,
  argTypes: {},
} as Meta;

export const Default = ({ ...args }) => (
  <Footer
    logo={<Icon size="lg" icon={Logo} className="fill-primary-500" />}
    copyright="Copyright by Neuvernetzung UG"
    cols={[
      {
        label: "Rechtliches",
        icon: IconBeach,
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
