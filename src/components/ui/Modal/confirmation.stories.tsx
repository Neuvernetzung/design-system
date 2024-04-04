import { IconInfoCircle } from "@tabler/icons-react";
import { action } from "@storybook/addon-actions";


import { ThemeProvider } from "../../../theme";
import { colors } from "../../../types";
import { Button } from "../Button";
import { confirmation, ConfirmationModal } from ".";

export default {
  title: "UI/Overlay/Confirmation",
  component: ConfirmationModal,
} ;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = {
  render: ({ ...args }) => (
    <ThemeProvider config={{ allowConfirmation: true }}>
      <Container>
        <Button
          onClick={() =>
            confirmation({
              icon: IconInfoCircle,
              heading: "Bestätigung erforderlich",
              content: "Wollen Sie die Bestätigung wirklich bestätigen?",
              cancel: action("cancel"),
              confirm: action("confirm"),
              ...args,
            })
          }
        >
          Bestätigung öffnen
        </Button>
      </Container>
    </ThemeProvider>
  ),
};

export const Colors = {
  render: ({ ...args }) => (
    <ThemeProvider config={{ allowConfirmation: true }}>
      <Container>
        {colors.map((color) => (
          <Button
            key={color}
            color={color}
            onClick={() =>
              confirmation({
                icon: IconInfoCircle,
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
  ),

  parameters: {
    controls: { exclude: "color" },
  },
};

export const ForbidCancellation = {
  render: ({ ...args }) => (
    <ThemeProvider config={{ allowConfirmation: true }}>
      <Container>
        <Button
          onClick={() =>
            confirmation({
              icon: IconInfoCircle,
              forbidCancellation: true,
              cancel: action("cancel"),
              confirm: action("confirm"),
              cancelButton: "Ablehnen",
              confirmButton: "Bestätigen",
              heading: "Wollen sie wirklich?",
              ...args,
            })
          }
        >
          Öffnen
        </Button>
      </Container>
    </ThemeProvider>
  ),
};
