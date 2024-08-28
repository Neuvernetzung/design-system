import { action } from "@storybook/addon-actions";

import {
  Icon360,
  IconDotsVertical,
  IconDownload,
  IconLogout,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

import { sizes } from "../../../types";
import { ButtonGroup, IconButton } from "../Button";
import { Menu, MenuItemProps } from "./menu";
import { Text } from "../Typography/Text";

export default {
  title: "UI/Overlay/Menu",
  component: Menu,
};

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = {
  render: ({ ...args }) => {
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
          {
            type: "anchor",
            children: "Option 2",
            icon: IconDownload,
            href: "#",
            anchorProps: { target: "_blank" },
          },
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
  },
};

export const Sizes = {
  render: ({ ...args }) => {
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
          {
            type: "anchor",
            children: "Option 2",
            icon: IconDownload,
            href: "#",
          },
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
  },
};

export const Disabled = {
  render: ({ ...args }) => {
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
          {
            type: "anchor",
            children: "Option 2",
            icon: IconDownload,
            href: "#",
          },
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
  },
};

export const Checkbox = {
  render: function Render({ ...args }) {
    const [bookmarksChecked, setBookmarksChecked] = useState(false);
    const [urlsChecked, setUrlsChecked] = useState(false);

    const items: MenuItemProps[] = [
      {
        children: "Normales Item",
        onClick: () => {},
      },
      { type: "separator" },
      {
        type: "group",
        children: "Optionen",
        items: [
          {
            type: "checkbox",
            children: "Bookmarks",
            checked: bookmarksChecked,
            setChecked: setBookmarksChecked,
          },
          {
            type: "checkbox",
            children: "Urls",
            checked: urlsChecked,
            setChecked: setUrlsChecked,
          },
        ],
      },
      { type: "separator" },
      { type: "anchor", children: "Option 6", href: "#" },
    ];

    return (
      <Container>
        <div className="flex flex-col gap-4">
          <Text>Bookmarks: {String(bookmarksChecked)}</Text>
          <Text>Urls: {String(urlsChecked)}</Text>
          <ButtonGroup>
            <Menu
              items={items}
              buttonProps={{ children: "Checkbox" }}
              {...args}
            />
          </ButtonGroup>
        </div>
      </Container>
    );
  },
};

export const Radio = {
  render: function Render({ ...args }) {
    const [radio, setRadio] = useState<string>();

    const items: MenuItemProps[] = [
      {
        children: "Normales Item",
        onClick: () => {},
      },
      { type: "separator" },
      {
        type: "group",
        children: "Radio",
        items: [
          {
            type: "radio",
            value: radio,
            setValue: setRadio,
            options: [
              { value: "booksmarks", children: "Bookmarks" },
              { value: "urls", children: "Urls" },
            ],
          },
        ],
      },
      { type: "separator" },
      { type: "anchor", children: "Option 6", href: "#" },
    ];

    return (
      <Container>
        <div className="flex flex-col gap-4">
          <Text>Value: {String(radio)}</Text>
          <ButtonGroup>
            <Menu
              items={items}
              buttonProps={{ children: "Checkbox" }}
              {...args}
            />
          </ButtonGroup>
        </div>
      </Container>
    );
  },
};

export const BeforeAndAfterChildren = {
  render: ({ ...args }) => {
    const items: MenuItemProps[] = [
      {
        children: "Normales Item",
        onClick: () => {},
      },
      { type: "separator" },
      { type: "anchor", children: "Option 6", href: "#" },
    ];

    return (
      <Container>
        <div className="flex flex-col gap-4">
          <ButtonGroup>
            <Menu
              beforeChildren="Before"
              afterChildren="After"
              items={items}
              buttonProps={{ children: "BeforeAndAfterChildren" }}
              {...args}
            />
          </ButtonGroup>
        </div>
      </Container>
    );
  },
};

export const NoDoubleSeparator = {
  render: ({ ...args }) => {
    const items: MenuItemProps[] = [
      {
        type: "separator",
      },
      {
        children: "Option 1",
        onClick: () => {},
      },
      {
        children: "Option 2",
        onClick: () => {},
      },
      {
        type: "separator",
      },
      {
        type: "separator",
      },
      {
        children: "Option 3",
        onClick: () => {},
      },
      {
        type: "separator",
      },
      {
        type: "group",
        children: "Test",
        items: [
          {
            type: "separator",
          },
          {
            children: "Option 5",
            onClick: () => {},
          },
          {
            type: "separator",
          },
          {
            type: "separator",
          },
          {
            children: "Option 4",
            onClick: () => {},
          },
          {
            type: "separator",
          },
        ],
      },
      {
        type: "separator",
      },
      {
        children: "Option 7",
        onClick: () => {},
      },
      {
        type: "separator",
      },
    ];

    return (
      <Menu
        beforeChildren={<Text>Test</Text>}
        afterChildren={<Text>Test</Text>}
        buttonComponent={
          <IconButton icon={IconDotsVertical} ariaLabel="menu" />
        }
        items={items}
        {...args}
      />
    );
  },
};
