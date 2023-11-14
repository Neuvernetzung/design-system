import { Meta } from "@storybook/react";

import { ThemeProvider } from "../../../theme";
import { Button } from "../Button";
import { loading } from "../Loading";
import { Notify, notify } from ".";

export default {
  title: "UI/Overlay/Notify",
  component: Notify,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = () => (
  <ThemeProvider config={{ allowNotification: true }}>
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
          notify({ message: "Dies ist ein Erfolg!", color: "success" })
        }
      >
        Notify Success
      </Button>
      <Button
        color="danger"
        variant="outline"
        onClick={() =>
          notify({ message: "Dies ist ein Fehler!", color: "danger" })
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
            color: "success",
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
            color: "danger",
            variant: "solid",
          })
        }
      >
        Notify Error
      </Button>
    </Container>
  </ThemeProvider>
);

export const CancelLoading = () => {
  const load = () => {
    loading(true);
    setTimeout(() => {
      notify({ message: "Nicht mehr laden." });
    }, 2000);
  };

  return (
    <ThemeProvider
      config={{ allowNotification: true, allowGlobalLoading: true }}
    >
      <Container>
        <Button variant="outline" onClick={() => load()}>
          Global
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export const Duration = () => (
  <ThemeProvider config={{ allowNotification: true, allowGlobalLoading: true }}>
    <Container>
      <Button
        variant="outline"
        onClick={() =>
          notify({
            message: "Verschwindet in einer statt 5 Sekunden.",
            duration: 1000,
          })
        }
      >
        1 Sekunde
      </Button>
    </Container>
  </ThemeProvider>
);
