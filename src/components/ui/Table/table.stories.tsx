import { PencilIcon } from "@heroicons/react/24/outline";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { IconButton } from "../Button";
import { DataTable, SimpleTable } from ".";

export default {
  title: "UI/Data Display/DataTable",
  component: DataTable,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} as Meta;

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
    items={[
      {
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
        id: "2",
        name: "Test 2",
        createdAt: new Date().toDateString(),
      },
      {
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
    ]}
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
    items={[
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
        name: "Test 2",
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
    ]}
  />
);
