import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import { Colors as ColorTypes } from "../../../types";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "../Button";
import { ConfirmationModal } from "./confirmation";

export default {
  title: "UI/Overlay/Confirmation",
  component: ConfirmationModal,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = ({ ...args }) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Button onClick={() => setOpen(true)}>Bestätigung öffnen</Button>

      <ConfirmationModal
        icon={InformationCircleIcon}
        heading="Bestätigung erforderlich"
        content="Wollen Sie die Bestätigung wirklich bestätigen?"
        cancelButton={{ children: "Abbrechen", onClick: action("cancel") }}
        confirmButton={{ children: "Bestätigen", onClick: action("confirm") }}
        open={open}
        setOpen={setOpen}
        {...args}
      />
    </Container>
  );
};

export const Colors = ({ ...args }) => {
  const colors: (keyof ColorTypes)[] = [
    "primary",
    "accent",
    "success",
    "warn",
    "danger",
  ];

  return (
    <Container>
      {colors.map((color) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [open, setOpen] = useState(false);

        return (
          <>
            <Button color={color} onClick={() => setOpen(true)}>
              {color}
            </Button>

            <ConfirmationModal
              icon={InformationCircleIcon}
              heading={`${color} - Bestätigung`}
              content="Wollen Sie die Bestätigung wirklich bestätigen?"
              cancelButton={{
                children: "Abbrechen",
                onClick: action("cancel"),
              }}
              confirmButton={{
                children: "Bestätigen",
                onClick: action("confirm"),
              }}
              open={open}
              setOpen={setOpen}
              color={color}
              {...args}
            />
          </>
        );
      })}
    </Container>
  );
};

Colors.parameters = {
  controls: { exclude: "color" },
  a11y: {
    disable: true,
  },
};
