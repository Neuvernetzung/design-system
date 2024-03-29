import { Meta } from "@storybook/react";

import { ListItem, OrderedList, UnorderedList } from ".";

export default {
  title: "UI/Data Display/List",
  component: OrderedList,
} as Meta;

export const Ordered = ({ ...args }) => (
  <OrderedList {...args}>
    <ListItem>Dies ist eine geordnete Liste.</ListItem>
    <ListItem>Dies ist eine geordnete Liste.</ListItem>
    <ListItem>Dies ist eine geordnete Liste.</ListItem>
  </OrderedList>
);

export const Unordered = ({ ...args }) => (
  <UnorderedList {...args}>
    <ListItem>Dies ist eine ungeordnete Liste.</ListItem>
    <ListItem>Dies ist eine ungeordnete Liste.</ListItem>
    <ListItem>Dies ist eine ungeordnete Liste.</ListItem>
  </UnorderedList>
);

export const Nested = ({ ...args }) => (
  <UnorderedList {...args}>
    <ListItem>
      Dies ist eine ungeordnete Liste.
      <OrderedList {...args}>
        <ListItem>
          Dies ist eine geordnete Liste.
          <br />
          Neue Zeile
        </ListItem>
        <ListItem>Dies ist eine geordnete Liste.</ListItem>
        <ListItem>Dies ist eine geordnete Liste.</ListItem>
      </OrderedList>
    </ListItem>
    <ListItem>Dies ist eine ungeordnete Liste.</ListItem>
    <ListItem>Dies ist eine ungeordnete Liste.</ListItem>
  </UnorderedList>
);
