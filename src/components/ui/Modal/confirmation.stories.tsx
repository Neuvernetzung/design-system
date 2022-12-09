import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react/types-6-0";

import { ThemeProvider } from "../../../theme";
import { colors } from "../../../types";
import { Button } from "../Button";
import { ConfirmationModal, confirmation } from ".";

export default {
  title: "UI/Overlay/Confirmation",
  component: ConfirmationModal,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = ({ ...args }) => (
  <ThemeProvider allowConfirmation>
    <Container>
      <Button
        onClick={() =>
          confirmation({
            icon: InformationCircleIcon,
            heading: "Bestätigung erforderlich",
            content: "Wollen Sie die Bestätigung wirklich bestätigen?",
            cancel: action("cancel"),
            confirm: action("confirm"),
          })
        }
      >
        Bestätigung öffnen
      </Button>
    </Container>
  </ThemeProvider>
);

export const Colors = ({ ...args }) => (
  <ThemeProvider allowConfirmation>
    <Container>
      {colors.map((color) => (
        <Button
          key={color}
          color={color}
          onClick={() =>
            confirmation({
              icon: InformationCircleIcon,
              heading: `${color} - Bestätigung`,
              content: "Wollen Sie die Bestätigung wirklich bestätigen?",
              cancel: action("cancel"),
              confirm: action("confirm"),
              cancelButton: "Abbrechen",
              confirmButton: "Bestätigen",
              color,
              ...args,
            })
          }
        >
          {color}
        </Button>
      ))}
    </Container>
  </ThemeProvider>
);

Colors.parameters = {
  controls: { exclude: "color" },
  a11y: {
    disable: true,
  },
};
