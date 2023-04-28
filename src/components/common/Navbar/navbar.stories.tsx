import {
  AcademicCapIcon,
  ArrowLeftOnRectangleIcon,
  ArrowPathRoundedSquareIcon,
  BoltIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

import { Logo } from "../../../../public/Logo";
import { PageContainer } from "../Container";
import { Icon } from "../../ui/Icon";
import { Select } from "../../ui/Select";
import { Heading } from "../../ui/Typography/Heading";
import { Navbar, NavbarProps, SideNavbar } from "./navbar";
import { Menu } from "../../ui";
import { borders } from "../../../styles";
import cn from "classnames";

export default {
  title: "COMMON/Navbar",
  component: Navbar,
  argTypes: {},
} as Meta;

const baseProps: NavbarProps = {
  justifyDesktopNav: "center",
  navItems: [
    {
      label: "Item 1",
      defaultOpen: true,
      children: [
        {
          label: "Sub Item 1",
          href: "#",
          subLabel: {
            children: "Hier steht eine Beschreibung.",
            hideOnMobile: true,
          },
          icon: AcademicCapIcon,
        },
        {
          label: "Sub Item 2",
          href: "#",
          subLabel: { children: "Hier steht eine Beschreibung." },
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
          subLabel: { children: "Hier steht eine Beschreibung." },
        },
        {
          label: "Disabled Item",
          href: "#",
          subLabel: { children: "Dieses Item ist disabled." },
          disabled: true,
          icon: TrashIcon,
        },
      ],
    },
    {
      label: "Full",
      fullWidthPopover: true,
      tag: { label: "width", variant: "outline" },
      child: "Test",
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
  ],
  logo: (
    <>
      <Icon size="lg" icon={Logo} className="fill-brand-500" color="inherit" />
      <Heading color="inherit" size="xl" className="hidden sm:block">
        Desing System
      </Heading>
    </>
  ),
  footer: (
    <Menu
      items={[
        {
          children: "Logout",
          icon: ArrowLeftOnRectangleIcon,
          onClick: () => {},
        },
      ]}
      placement="top"
      size="xl"
      buttonType="button"
      buttonProps={{
        variant: "ghost",
        children: "Benutzer",
        className: "w-full",
        leftIcon: UserIcon,
      }}
    />
  ),
  footerClassName: cn("border-t !p-0", borders.accent),
};

export const Default = ({ ...args }) => <Navbar {...baseProps} {...args} />;

export const Size = ({ ...args }) => {
  const navbarRef = useRef(null);
  const { control, watch } = useForm();
  const size = watch("size");

  return (
    <>
      <Navbar ref={navbarRef} size={size} {...baseProps} {...args} />
      <PageContainer navbarRef={navbarRef}>
        <Select
          control={control}
          label="Größe"
          name="size"
          options={[
            { children: "xs", value: "xs" },
            { children: "sm", value: "sm" },
            { children: "md", value: "md" },
            { children: "lg", value: "lg" },
            { children: "xl", value: "xl" },
          ]}
        />
      </PageContainer>
    </>
  );
};

export const Sidenav = ({ ...args }) => {
  const navbarRef = useRef(null);
  const sidenavRef = useRef<HTMLDivElement>(null);
  const { control, watch } = useForm();
  const size = watch("size");

  return (
    <>
      <SideNavbar
        sidenavRef={sidenavRef}
        ref={navbarRef}
        size={size}
        {...baseProps}
        {...args}
      />
      <PageContainer sidenavRef={sidenavRef} navbarRef={navbarRef}>
        <Select
          control={control}
          label="Größe"
          name="size"
          options={[
            { children: "xs", value: "xs" },
            { children: "sm", value: "sm" },
            { children: "md", value: "md" },
            { children: "lg", value: "lg" },
            { children: "xl", value: "xl" },
          ]}
        />
      </PageContainer>
    </>
  );
};
