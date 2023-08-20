import {
  AcademicCapIcon,
  ArrowLeftOnRectangleIcon,
  ArrowPathRoundedSquareIcon,
  BoltIcon,
  ShoppingCartIcon,
  SwatchIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Meta } from "@storybook/react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Logo } from "../../../../public/Logo";
import { PageContainer } from "../Container";
import { Icon } from "../../ui/Icon";
import { Select } from "../../ui/Select";
import { Heading } from "../../ui/Typography/Heading";
import { Navbar, NavbarProps, SideNavbar } from "./navbar";
import { Button, Drawer, Menu, Tooltip, IconButton } from "../../ui";
import { borders } from "../../../styles";
import cn from "classnames";
import { loading, Loading } from "../../ui/Loading";

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
          href: "1",
          subLabel: {
            children: "Hier steht eine Beschreibung.",
            hideOnMobile: true,
          },
          icon: AcademicCapIcon,
        },
        {
          label: "Sub Item 2",
          href: "2",
          subLabel: { children: "Hier steht eine Beschreibung." },
          tag: {
            label: "Neu",
            color: "success",
            size: "xs",
          },
          icon: ArrowPathRoundedSquareIcon,
        },
      ],
      child: <div className="w-full bg-red-100">Test</div>,
      icon: BoltIcon,
    },
    {
      label: "Item 2",
      tag: { label: "bald", color: "warn", size: "sm", variant: "outline" },
      children: [
        {
          label: "Sub Item 1",
          href: "3",
          subLabel: {
            children: "Hier steht eine Beschreibung. Mit etwas längerem Text.",
          },
        },
        {
          label: "Disabled Item",
          href: "4",
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
      children: [
        {
          label: "Sub Item 1",
          href: "1",
          subLabel: {
            children: "Hier steht eine Beschreibung.",
            hideOnMobile: true,
          },
          icon: AcademicCapIcon,
        },
        {
          label: "Sub Item 2",
          href: "2",
          subLabel: { children: "Hier steht eine Beschreibung." },
          tag: {
            label: "Neu",
            color: "success",
            size: "xs",
          },
          icon: ArrowPathRoundedSquareIcon,
        },
        {
          label: "Sub Item 1",
          href: "3",
          subLabel: {
            children: "Hier steht eine Beschreibung. Mit etwas längerem Text.",
          },
        },
        {
          label: "Disabled Item",
          href: "4",
          subLabel: { children: "Dieses Item ist disabled." },
          disabled: true,
          icon: TrashIcon,
        },
        {
          label: "Sub Item 1",
          href: "5",
          subLabel: {
            children: "Hier steht eine Beschreibung. Mit etwas längerem Text.",
          },
        },
        {
          label: "Disabled Item",
          href: "6",
          subLabel: { children: "Dieses Item ist disabled." },
          disabled: true,
          icon: TrashIcon,
        },
      ],
      child: (
        <div className="w-full">
          <Button variant="ghost">Test</Button>
        </div>
      ),
    },
    {
      label: "Item 3",
      href: "5",
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
  startItems: [
    <Tooltip key="Tooltip" label="zIndex Test">
      <Icon icon={SwatchIcon} />
    </Tooltip>,
  ],
  allowDarkMode: "desktop",
  footerClassName: cn("border-t !p-0", borders.accent),
};

export const Default = ({ ...args }) => <Navbar {...baseProps} {...args} />;

export const ZIndexTest = ({ ...args }) => {
  const [openSide, setOpenSide] = useState(false);

  return (
    <>
      <Navbar
        {...baseProps}
        {...args}
        endItems={[
          <IconButton
            ariaLabel="cart"
            key="cart"
            onClick={() => setOpenSide(true)}
            icon={ShoppingCartIcon}
          />,
        ]}
      />
      <Drawer open={openSide} setOpen={setOpenSide} />
      <Button
        className="mt-5"
        onClick={() => {
          loading(true);
          console.log("loading");
          setTimeout(() => loading(false), 1500);
        }}
      >
        Loading
      </Button>
      <Loading />
    </>
  );
};

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
