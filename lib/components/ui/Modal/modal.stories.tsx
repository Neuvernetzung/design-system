import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import { Sizes as SizesType } from "../../../types";
import { CheckIcon } from "../../icons";
import { Button, ButtonGroup, IconButton } from "../Button";
import { Heading } from "../Typography";
import { Modal } from "./modal";

export default {
  title: "UI/Overlay/Modal",
  component: Modal,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = ({ ...args }) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Button onClick={() => setOpen(true)}>Modal öffnen</Button>

      <Modal
        header={
          <div className="flex flex-row w-full justify-between items-center">
            <Heading>Ein Modal</Heading>
            <Button size="sm" variant="ghost">
              Mehr
            </Button>
          </div>
        }
        content="Hier steht der Content."
        footer={
          <ButtonGroup className="w-full">
            <Button
              onClick={() => {
                action("click");
                setOpen(false);
              }}
              fullWidth
            >
              Bestätigen
            </Button>
            <IconButton
              icon={CheckIcon}
              onClick={() => {
                action("click-icon");
                setOpen(false);
              }}
            />
          </ButtonGroup>
        }
        open={open}
        setOpen={setOpen}
        {...args}
      />
    </Container>
  );
};

export const Sizes = ({ ...args }) => {
  const sizes: (keyof SizesType)[] = ["xs", "sm", "md", "lg", "xl"];

  return (
    <Container>
      {sizes.map((size) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [open, setOpen] = useState(false);

        return (
          <>
            <Button size={size} onClick={() => setOpen(true)}>
              {size} öffnen
            </Button>

            <Modal
              header="Ein Modal"
              size={size}
              content="Hier steht der Content."
              footer={
                <ButtonGroup className="w-full">
                  <Button
                    onClick={() => {
                      action("click");
                      setOpen(false);
                    }}
                    fullWidth
                  >
                    Bestätigen
                  </Button>
                  <IconButton
                    icon={CheckIcon}
                    onClick={() => {
                      action("click-icon");
                      setOpen(false);
                    }}
                  />
                </ButtonGroup>
              }
              open={open}
              setOpen={setOpen}
              {...args}
            />
          </>
        );
      })}
    </Container>
  );
};

export const LargeContainer = ({ ...args }) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Button onClick={() => setOpen(true)}>Modal öffnen</Button>

      <Modal
        header="Ein sehr großes Modal"
        content={
          <div>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
            dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in
            vulputate velit esse molestie consequat, vel illum dolore eu feugiat
            nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
            blandit praesent luptatum zzril delenit augue duis dolore te feugait
            nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing
            elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
            magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
            nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip
            ex ea commodo consequat. Duis autem vel eum iriure dolor in
            hendrerit in vulputate velit esse molestie consequat, vel illum
            dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
            odio dignissim qui blandit praesent luptatum zzril delenit augue
            duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta
            nobis eleifend option congue nihil imperdiet doming id quod mazim
            placerat facer possim assum. Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod
            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
            enim ad minim veniam, quis nostrud exerci tation ullamcorper
            suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis
            autem vel eum iriure dolor in hendrerit in vulputate velit esse
            molestie consequat, vel illum dolore eu feugiat nulla facilisis. At
            vero eos et accusam et justo duo dolores et ea rebum. Stet clita
            kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
            duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, At accusam aliquyam diam diam dolore
            dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt
            justo labore Stet clita ea et gubergren, kasd magna no rebum.
            sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit
            amet. Lorem ipsum dolor sit amet, consetetur
          </div>
        }
        footer={
          <ButtonGroup className="w-full">
            <Button
              onClick={() => {
                action("click");
                setOpen(false);
              }}
              fullWidth
            >
              Bestätigen
            </Button>
            <IconButton
              icon={CheckIcon}
              onClick={() => {
                action("click-icon");
                setOpen(false);
              }}
            />
          </ButtonGroup>
        }
        open={open}
        setOpen={setOpen}
        {...args}
      />
    </Container>
  );
};

export const Nested = ({ ...args }) => {
  const [open, setOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false);

  return (
    <Container>
      <Button onClick={() => setOpen(true)}>Modal öffnen</Button>

      <Modal
        header="Erstes Modal"
        footer={
          <Button
            onClick={() => {
              action("click");
              setNestedOpen(true);
            }}
            fullWidth
          >
            Nested öffnen
          </Button>
        }
        open={open}
        setOpen={setOpen}
        {...args}
      />
      <Modal
        size="xs"
        header="Genestetes Modal"
        content="Dies ist ein genestetes Modal."
        footer={
          <Button
            color="warn"
            onClick={() => {
              action("nested-click");
              setOpen(false);
              setNestedOpen(false);
            }}
            fullWidth
          >
            Toll!
          </Button>
        }
        open={nestedOpen}
        setOpen={setNestedOpen}
        {...args}
      />
    </Container>
  );
};
