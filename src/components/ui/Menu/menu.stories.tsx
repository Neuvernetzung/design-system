import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import {
  Icon360,
  IconDotsVertical,
  IconDownload,
  IconLogout,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";

import { sizes } from "../../../types";
import { ButtonGroup, IconButton } from "../Button";
import { Menu, MenuItemProps } from "./menu";

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
      type: "group",
      children: "Gruppe 1",
      items: [
        {
          type: "button",
          children: "Option 1",
          icon: Icon360,
          onClick: action("Option-1"),
          color: "primary",
        },
        { type: "anchor", children: "Option 2", icon: IconDownload, href: "#" },
      ],
    },
    { type: "separator" },
    {
      type: "group",
      items: [
        {
          type: "button",
          children: "Option 3",
          onClick: action("Option-3"),
        },
        { type: "anchor", children: "Option 4", href: "#", color: "success" },
      ],
    },
    { type: "separator" },
    {
      type: "button",
      children: "Option 5",
      icon: IconLogout,
      onClick: action("Option-5"),
    },
    {
      type: "anchor",
      children: "Trash",
      icon: IconTrash,
      href: "#",
      color: "danger",
    },
  ];

  return (
    <Container>
      <ButtonGroup>
        <Menu
          items={items}
          buttonProps={{ children: "Menu Button" }}
          size="sm"
          align="start"
          {...args}
        />
        <Menu
          items={items}
          buttonComponent={
            <IconButton icon={IconDotsVertical} ariaLabel="test" />
          }
          size="sm"
          {...args}
        />
      </ButtonGroup>
    </Container>
  );
};

export const Sizes = ({ ...args }) => {
  const items: MenuItemProps[] = [
    {
      type: "group",
      children: "Gruppe 1",
      items: [
        {
          type: "button",
          children: "Option 1",
          icon: Icon360,
          onClick: action("Option-1"),
        },
        { type: "anchor", children: "Option 2", icon: IconDownload, href: "#" },
      ],
    },
    {
      type: "group",
      children: "Gruppe 2",
      items: [
        { type: "button", children: "Option 3", onClick: action("Option-3") },
        { type: "anchor", children: "Option 4", href: "#" },
      ],
    },
    {
      type: "button",
      children: "Option 5",
      icon: IconLogout,
      onClick: action("Option-5"),
    },
    { type: "anchor", children: "Option 6", href: "#" },
  ];

  return (
    <Container>
      <ButtonGroup>
        {sizes.map((size) => (
          <Menu
            items={items}
            key={size}
            size={size}
            buttonProps={{ children: `${size} Button` }}
            {...args}
          />
        ))}
      </ButtonGroup>
    </Container>
  );
};

export const Disabled = ({ ...args }) => {
  const items: MenuItemProps[] = [
    {
      type: "group",
      children: "Gruppe 1",
      items: [
        {
          type: "button",
          children: "Disabled",
          icon: Icon360,
          disabled: true,
          onClick: action("Option-1"),
        },
        { type: "anchor", children: "Option 2", icon: IconDownload, href: "#" },
      ],
    },
    {
      type: "button",
      children: "Option 5",
      disabled: true,
      icon: IconLogout,
      onClick: action("Option-5"),
    },
    { type: "anchor", children: "Option 6", href: "#" },
  ];

  return (
    <Container>
      <ButtonGroup>
        <Menu
          items={items}
          disabled
          buttonProps={{ children: "Komplett disabled" }}
          {...args}
        />
        <Menu
          items={items}
          buttonComponent={
            <IconButton icon={IconDotsVertical} ariaLabel="menu" />
          }
          {...args}
        />
      </ButtonGroup>
    </Container>
  );
};
