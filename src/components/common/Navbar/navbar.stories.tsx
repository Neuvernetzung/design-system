import {
  AcademicCapIcon,
  ArrowPathRoundedSquareIcon,
  BoltIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Logo } from "../../../../public/Logo";
import { Icon } from "../../ui/Icon";
import { Heading } from "../../ui/Typography/Heading";
import { Navbar } from "./navbar";

export default {
  title: "COMMON/Navbar",
  component: Navbar,
  argTypes: {},
} as Meta;

export const Default = ({ ...args }) => (
  <Navbar
    justifyDesktopNav="center"
    navItems={[
      {
        label: "Item 1",
        children: [
          {
            label: "Sub Item 1",
            href: "#",
            subLabel: "Hier steht eine Beschreibung.",
            icon: AcademicCapIcon,
          },
          {
            label: "Sub Item 2",
            href: "#",
            subLabel: "Hier steht eine Beschreibung.",
            tag: {
              label: "Neu",
              color: "success",
              size: "xs",
            },
            icon: ArrowPathRoundedSquareIcon,
          },
        ],
        icon: BoltIcon,
      },
      {
        label: "Item 2",
        tag: { label: "bald", color: "warn", size: "sm", variant: "outline" },
        children: [
          {
            label: "Sub Item 1",
            href: "#",
            subLabel: "Hier steht eine Beschreibung.",
          },
          {
            label: "Disabled Item",
            href: "#",
            subLabel: "Dieses Item ist disabled.",
            disabled: true,
            icon: TrashIcon,
          },
        ],
      },
      {
        label: "Item 3",
        href: "#",
      },
      {
        label: "Disabled",
        tag: { label: "nie", color: "danger", size: "sm", variant: "subtile" },
        disabled: true,
      },
    ]}
    logo={
      <>
        <Icon size="lg" icon={Logo} className="fill-primary-500" />
        <Heading size="xl" className="hidden sm:block">
          Desing System
        </Heading>
      </>
    }
    {...args}
  />
);

Default.parameters = {
  a11y: {
    disable: true,
  },
};
