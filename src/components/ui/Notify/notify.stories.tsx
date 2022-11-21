import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { ThemeProvider } from "../../../theme";
import { Button } from "../Button";
import { Notify, notify } from ".";

export default {
  title: "UI/Overlay/Notify",
  component: Notify,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = () => (
  <ThemeProvider allowNotification>
    <Container>
      <Button
        variant="outline"
        onClick={() => notify({ message: "Dies ist eine Benachrichtigung" })}
      >
        Notify
      </Button>
      <Button
        color="success"
        variant="outline"
        onClick={() =>
          notify({ message: "Dies ist ein Erfolg!", status: "success" })
        }
      >
        Notify Success
      </Button>
      <Button
        color="danger"
        variant="outline"
        onClick={() =>
          notify({ message: "Dies ist ein Fehler!", status: "danger" })
        }
      >
        Notify Error
      </Button>
      <Button
        onClick={() =>
          notify({
            message: "Dies ist eine Benachrichtigung",
            variant: "solid",
          })
        }
      >
        Notify
      </Button>
      <Button
        color="success"
        onClick={() =>
          notify({
            message: "Dies ist ein Erfolg!",
            status: "success",
            variant: "solid",
          })
        }
      >
        Notify Success
      </Button>
      <Button
        color="danger"
        onClick={() =>
          notify({
            message: "Dies ist ein Fehler!",
            status: "danger",
            variant: "solid",
          })
        }
      >
        Notify Error
      </Button>
    </Container>
  </ThemeProvider>
);

Default.parameters = {
  a11y: {
    disable: true,
  },
};
