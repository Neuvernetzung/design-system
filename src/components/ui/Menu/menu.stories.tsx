import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  ArrowRightOnRectangleIcon,
  EllipsisVerticalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
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
          icon: AcademicCapIcon,
          onClick: action("Option-1"),
          color: "primary",
        },
        { children: "Option 2", icon: ArrowDownTrayIcon, href: "#" },
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
      icon: ArrowRightOnRectangleIcon,
      onClick: action("Option-5"),
    },
    { children: "Trash", icon: TrashIcon, href: "#", color: "danger" },
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
          buttonProps={{ icon: EllipsisVerticalIcon, ariaLabel: "test" }}
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
          icon: AcademicCapIcon,
          onClick: action("Option-1"),
        },
        { children: "Option 2", icon: ArrowDownTrayIcon, href: "#" },
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
      icon: ArrowRightOnRectangleIcon,
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
          icon: AcademicCapIcon,
          disabled: true,
          onClick: action("Option-1"),
        },
        { children: "Option 2", icon: ArrowDownTrayIcon, href: "#" },
      ],
    },
    {
      children: "Option 5",
      disabled: true,
      icon: ArrowRightOnRectangleIcon,
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
          buttonProps={{ icon: EllipsisVerticalIcon, ariaLabel: "test" }}
          {...args}
        />
      </ButtonGroup>
    </Container>
  );
};
