import { PencilIcon } from "@heroicons/react/24/outline";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { IconButton } from "../Button";
import { DataTable, SimpleTable } from ".";

export default {
  title: "UI/Data Display/Table",
  component: DataTable,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} as Meta;

const items = [
  {
    _id: "_1",
    id: "1",
    name: "Test 1",
    title: "Titel",
    image: "Bild",
    options: (
      <IconButton
        ariaLabel="Edit"
        size="sm"
        variant="ghost"
        color="primary"
        icon={PencilIcon}
      />
    ),
    createdAt: new Date().toDateString(),
  },
  {
    _id: "_2",
    id: "2",
    title: { test: "undefined" }["23"],
    name: 2,
    createdAt: new Date().toDateString(),
  },
  {
    _id: "_3",
    id: "3",
    name: "Test 3",
    image: "Bild",
    options: (
      <IconButton
        ariaLabel="Edit"
        size="sm"
        variant="ghost"
        color="primary"
        icon={PencilIcon}
      />
    ),
    createdAt: new Date().toDateString(),
  },
];

export const Simple = ({ ...args }) => (
  <SimpleTable
    cols={[
      { id: "id", title: "Id", shrink: true },
      { id: "name", title: "Name", grow: true },
      { id: "title", title: "Titel", grow: true },
      { id: "image", title: "Bild" },
      { id: "createdAt", title: "Erstellung" },
      { id: "options", title: "", shrink: true },
    ]}
    divideX
    items={items}
  />
);

export const Data = ({ ...args }) => (
  <DataTable
    cols={[
      { id: "id", title: "Id", sortable: true, shrink: true },
      { id: "name", title: "Name", grow: true },
      { id: "title", title: "Titel", grow: true },
      { id: "image", title: "Bild" },
      { id: "createdAt", title: "Erstellung", sortable: true },
      { id: "options", title: "", shrink: true },
    ]}
    checkable
    checkedValue="_id"
    divideX
    items={items}
  />
);
