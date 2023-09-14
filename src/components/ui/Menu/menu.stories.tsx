import {
  IconDownload,
  IconLogout,
  IconDotsVertical,
  IconTrash,
  Icon360,
} from "@tabler/icons-react";

import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import React from "react";

import { sizes } from "../../../types";
import { ButtonGroup } from "../Button";
import { MenuItemProps, Menu } from "./menu";

export default {
  title: "UI/Overlay/Menu",
  component: Menu,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = ({ ...args }) => {
  const items: MenuItemProps[] = [
    {
      children: "Gruppe 1",
      items: [
        {
          children: "Option 1",
          icon: Icon360,
          onClick: action("Option-1"),
          color: "primary",
        },
        { children: "Option 2", icon: IconDownload, href: "#" },
      ],
    },
    {
      items: [
        {
          children: "Option 3",
          onClick: action("Option-3"),
        },
        { children: "Option 4", href: "#", color: "success" },
      ],
    },
    {
      children: "Option 5",
      icon: IconLogout,
      onClick: action("Option-5"),
    },
    { children: "Trash", icon: IconTrash, href: "#", color: "danger" },
  ];

  return (
    <Container>
      <ButtonGroup>
        <Menu
          items={items}
          buttonType="button"
          buttonProps={{ children: "Menu Button" }}
          {...args}
        />
        <Menu
          items={items}
          buttonType="icon"
          buttonProps={{ icon: IconDotsVertical, ariaLabel: "test" }}
          {...args}
        />
      </ButtonGroup>
    </Container>
  );
};

export const Sizes = ({ ...args }) => {
  const items = [
    {
      children: "Gruppe 1",
      items: [
        {
          children: "Option 1",
          icon: Icon360,
          onClick: action("Option-1"),
        },
        { children: "Option 2", icon: IconDownload, href: "#" },
      ],
    },
    {
      children: "Gruppe 2",
      items: [
        {
          children: "Option 3",
          onClick: action("Option-3"),
        },
        { children: "Option 4", href: "#" },
      ],
    },
    {
      children: "Option 5",
      icon: IconLogout,
      onClick: action("Option-5"),
    },
    { children: "Option 6", href: "#" },
  ];

  return (
    <Container>
      <ButtonGroup>
        {sizes.map((size) => (
          <Menu
            items={items}
            key={size}
            size={size}
            buttonType="button"
            buttonProps={{ children: `${size} Button` }}
            {...args}
          />
        ))}
      </ButtonGroup>
    </Container>
  );
};

export const Disabled = ({ ...args }) => {
  const items = [
    {
      children: "Gruppe 1",
      items: [
        {
          children: "Disabled",
          icon: Icon360,
          disabled: true,
          onClick: action("Option-1"),
        },
        { children: "Option 2", icon: IconDownload, href: "#" },
      ],
    },
    {
      children: "Option 5",
      disabled: true,
      icon: IconLogout,
      onClick: action("Option-5"),
    },
    { children: "Option 6", href: "#" },
  ];

  return (
    <Container>
      <ButtonGroup>
        <Menu
          items={items}
          disabled
          buttonType="button"
          buttonProps={{ children: "Komplett disabled" }}
          {...args}
        />
        <Menu
          items={items}
          buttonType="icon"
          buttonProps={{ icon: IconDotsVertical, ariaLabel: "test" }}
          {...args}
        />
      </ButtonGroup>
    </Container>
  );
};
