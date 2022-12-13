import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import { IconButton } from "../Button";
import { PencilIcon } from "@heroicons/react/24/outline";

import { DataGrid } from ".";

export default {
  title: "UI/Data Display/DataGrid",
  component: DataGrid,
  parameters: {
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
    viewMode: "canvas",
  },
} as Meta;

export const Default = ({ ...args }) => (
  <DataGrid
    cols={["id", "name", "title", "image", "options"]}
    items={[
      {
        id: "1",
        name: "Test",
        title: "null",
        image: "Bild",
        options: <IconButton icon={PencilIcon} />,
      },
      {
        id: "2",
        name: "Test 2",
        options: "Später",
      },
    ]}
  />
);
