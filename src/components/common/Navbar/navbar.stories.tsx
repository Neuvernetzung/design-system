import { Meta } from "@storybook/react";
import {
  Icon360,
  IconArrowWaveRightUp,
  IconBolt,
  IconColorSwatch,
  IconLogout,
  IconRoute,
  IconShoppingCart,
  IconTrash,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/utils";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Logo } from "../../../../public/Logo";
import { borders } from "../../../styles";
import { Button, Drawer, IconButton, Menu, Modal, Tooltip } from "../../ui";
import { Icon } from "../../ui/Icon";
import { Loading, loading } from "../../ui/Loading";
import { Select } from "../../ui/Select";
import { Heading } from "../../ui/Typography/Heading";
import { PageContainer } from "../Container";
import { Navbar, NavbarProps, SideNavbar } from "./navbar";
import { colors, sizes } from "../../../types";

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
          icon: Icon360,
        },
        {
          label: "Sub Item 2",
          href: "2",
          subLabel: { children: "Hier steht eine Beschreibung." },
          tag: {
            children: "Neu",
            color: "success",
            size: "xs",
          },
          icon: IconRoute,
        },
      ],
      child: (
        <div className="flex flex-row w-full bg-red-100">
          <div className="h-2 bg-red-200 w-96" />
          <div className="h-2 bg-green-200 w-96" />
          <div className="h-2 bg-blue-200 w-96" />
        </div>
      ),
      icon: IconBolt,
    },
    {
      label: "Item 2",
      tag: { children: "bald", color: "warn", size: "sm", variant: "outline" },
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
          icon: IconTrash,
        },
      ],
    },
    {
      label: "Full",
      fullWidthPopover: true,
      tag: { children: "width", variant: "outline" },
      children: [
        {
          label: "Sub Item 1",
          href: "1",
          subLabel: {
            children: "Hier steht eine Beschreibung.",
            hideOnMobile: true,
          },
          icon: Icon360,
        },
        {
          label: "Sub Item 2",
          href: "2",
          subLabel: { children: "Hier steht eine Beschreibung." },
          tag: {
            children: "Neu",
            color: "success",
            size: "xs",
          },
          icon: IconRoute,
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
          icon: IconTrash,
        },
        {
          label: "Extern",
          href: "5",
          external: true,
          icon: IconArrowWaveRightUp,
          subLabel: {
            children: "Dies ist ein externes Item",
          },
        },
        {
          label: "Disabled Item",
          href: "6",
          subLabel: { children: "Dieses Item ist disabled." },
          disabled: true,
          icon: IconTrash,
        },
      ],
      child: (
        <div className="w-full">
          <Button variant="ghost">Test</Button>
        </div>
      ),
    },
    {
      label: "Extern",
      href: "https://www.google.de",
      external: true,
      icon: IconArrowWaveRightUp,
    },
    {
      label: "Disabled",
      tag: { children: "nie", color: "danger", size: "sm", variant: "subtile" },
      disabled: true,
      icon: IconX,
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
          icon: IconLogout,
          onClick: () => {},
        },
      ]}
      side="top"
      size="xl"
      buttonProps={{
        variant: "ghost",
        children: "Benutzer",
        className: "w-full",
        leftIcon: IconUser,
      }}
    />
  ),
  startItems: [
    <Tooltip key="Tooltip" label="zIndex Test">
      <Icon icon={IconColorSwatch} />
    </Tooltip>,
  ],
  allowDarkMode: "desktop",
  footerClassName: cn("border-t !p-0", borders.accent),
};

export const Default = ({ ...args }) => <Navbar {...baseProps} {...args} />;

export const ZIndexTest = ({ ...args }) => {
  const [openSide, setOpenSide] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
            icon={IconShoppingCart}
          />,
        ]}
      />
      <Drawer open={openSide} setOpen={setOpenSide} />
      <Button
        className="mt-5"
        onClick={() => {
          loading(true);
          setTimeout(() => loading(false), 1500);
        }}
      >
        Loading
      </Button>
      <Button
        className="mt-5"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Modal
      </Button>
      <Loading />
      <Modal open={openModal} setOpen={setOpenModal} content="Ok" />
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
          options={sizes.map((size) => ({ value: size, children: size }))}
        />
      </PageContainer>
    </>
  );
};

export const Color = ({ ...args }) => {
  const navbarRef = useRef(null);
  const { control, watch } = useForm();
  const color = watch("color");

  return (
    <>
      <Navbar ref={navbarRef} color={color} {...baseProps} {...args} />

      <PageContainer navbarRef={navbarRef}>
        <Select
          control={control}
          label="Größe"
          name="color"
          options={colors.map((color) => ({ value: color, children: color }))}
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
        sideNavStartItems="Start"
        sideNavEndItems="End"
        {...baseProps}
        {...args}
      />
      <PageContainer sidenavRef={sidenavRef} navbarRef={navbarRef}>
        <Select
          control={control}
          label="Größe"
          name="size"
          options={sizes.map((size) => ({ value: size, children: size }))}
        />
      </PageContainer>
    </>
  );
};
