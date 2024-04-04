

import { ListItem, OrderedList, UnorderedList } from ".";

export default {
  title: "UI/Data Display/List",
  component: OrderedList,
} ;

export const Ordered = {
  render: ({ ...args }) => (
    <OrderedList {...args}>
      <ListItem>Dies ist eine geordnete Liste.</ListItem>
      <ListItem>Dies ist eine geordnete Liste.</ListItem>
      <ListItem>Dies ist eine geordnete Liste.</ListItem>
    </OrderedList>
  ),
};

export const Unordered = {
  render: ({ ...args }) => (
    <UnorderedList {...args}>
      <ListItem>Dies ist eine ungeordnete Liste.</ListItem>
      <ListItem>Dies ist eine ungeordnete Liste.</ListItem>
      <ListItem>Dies ist eine ungeordnete Liste.</ListItem>
    </UnorderedList>
  ),
};

export const Nested = {
  render: ({ ...args }) => (
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
  ),
};
