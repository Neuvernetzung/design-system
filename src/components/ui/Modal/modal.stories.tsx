import { IconCheck } from "@tabler/icons-react";
import { action } from "@storybook/addon-actions";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, ButtonGroup, IconButton } from "../Button";
import { Select, SelectMultiple } from "../Select";
import { TabGroup, TabItemValueProps, TabList, TabPanels } from "../Tabs";
import { Heading } from "../Typography";
import { Modal, ModalSize } from "./modal";
import { Menu } from "../Menu";
import { Tooltip } from "../Tooltip";

export default {
  title: "UI/Overlay/Modal",
  component: Modal,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} ;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = {
  render: ({ ...args }) => {
    const [open, setOpen] = useState(false);

    return (
      <Container>
        <Button onClick={() => setOpen(true)}>Modal öffnen</Button>

        <Modal
          header={
            <div className="flex w-full flex-row items-center justify-between">
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
                className="w-full"
              >
                Bestätigen
              </Button>
              <IconButton
                ariaLabel="icon"
                icon={IconCheck}
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
  },
};

export const Sizes = {
  render: ({ ...args }) => {
    const sizes: Array<ModalSize> = [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "full",
    ];

    return (
      <Container>
        {sizes.map((size) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [open, setOpen] = useState(false);

          return (
            <>
              <Button onClick={() => setOpen(true)}>{size}</Button>

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
                      className="w-full"
                    >
                      Bestätigen
                    </Button>
                    <IconButton
                      ariaLabel="icon"
                      icon={IconCheck}
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
  },
};

export const LargeContainer = {
  render: ({ ...args }) => {
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
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel
              eum iriure dolor in hendrerit in vulputate velit esse molestie
              consequat, vel illum dolore eu feugiat nulla facilisis at vero
              eros et accumsan et iusto odio dignissim qui blandit praesent
              luptatum zzril delenit augue duis dolore te feugait nulla
              facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing
              elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
              magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
              nostrud exerci tation ullamcorper suscipit lobortis nisl ut
              aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
              in hendrerit in vulputate velit esse molestie consequat, vel illum
              dolore eu feugiat nulla facilisis at vero eros et accumsan et
              iusto odio dignissim qui blandit praesent luptatum zzril delenit
              augue duis dolore te feugait nulla facilisi. Nam liber tempor cum
              soluta nobis eleifend option congue nihil imperdiet doming id quod
              mazim placerat facer possim assum. Lorem ipsum dolor sit amet,
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
              enim ad minim veniam, quis nostrud exerci tation ullamcorper
              suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis
              autem vel eum iriure dolor in hendrerit in vulputate velit esse
              molestie consequat, vel illum dolore eu feugiat nulla facilisis.
              At vero eos et accusam et justo duo dolores et ea rebum. Stet
              clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
              sit amet, consetetur sadipscing elitr, At accusam aliquyam diam
              diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et
              et invidunt justo labore Stet clita ea et gubergren, kasd magna no
              rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            </div>
          }
          footer={
            <ButtonGroup className="w-full">
              <Button
                onClick={() => {
                  action("click");
                  setOpen(false);
                }}
                className="w-full"
              >
                Bestätigen
              </Button>
              <IconButton
                ariaLabel="icon"
                icon={IconCheck}
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
  },
};

export const Nested = {
  render: ({ ...args }) => {
    const [open, setOpen] = useState(false);
    const [nestedOpen, setNestedOpen] = useState(false);

    return (
      <Container>
        <Button onClick={() => setOpen(true)}>Modal öffnen</Button>

        <Modal
          header="Erstes Modal"
          footer={
            <div className="flex flex-row gap-4">
              <Button
                onClick={() => {
                  action("click");
                  setOpen(false);
                }}
                className="w-full"
              >
                Schließen
              </Button>
              <Button
                onClick={() => {
                  action("click");
                  setNestedOpen(true);
                }}
                className="w-full"
              >
                Nested öffnen
              </Button>
            </div>
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
                setNestedOpen(false);
              }}
              className="w-full"
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
  },
};

export const WithWrapper = {
  render: ({ ...args }) => {
    const [open, setOpen] = useState(false);

    const tabs: TabItemValueProps[] = [
      { value: "1", title: "Tab 1", content: "Tab Content 1" },
      { value: "2", title: "Tab 2", content: "Tab Content 2" },
      { value: "3", title: "Tab 3", content: "Tab Content 3" },
    ];

    return (
      <Container>
        <Button onClick={() => setOpen(true)}>Modal öffnen</Button>

        <Modal
          wrapper={TabGroup}
          header={<TabList items={tabs} />}
          content={<TabPanels items={tabs} />}
          open={open}
          setOpen={setOpen}
          {...args}
        />
      </Container>
    );
  },
};

export const ContainerOverflow = {
  render: ({ ...args }) => {
    const [open, setOpen] = useState(false);
    const { control } = useForm();

    return (
      <Container>
        <Button onClick={() => setOpen(true)}>Modal öffnen</Button>

        <Modal
          content={
            <div className="flex flex-row gap-4">
              <Select
                control={control}
                name="test"
                beforeChildren={<Button>Test</Button>}
                options={[
                  {
                    children: "Option 1",
                    value: "option-1",
                  },
                  {
                    children: "Option 2",
                    value: "option-2",
                  },
                  {
                    children: "Option 3",
                    value: "option-3",
                  },
                ]}
              />
              <SelectMultiple
                control={control}
                name="multi"
                options={[
                  {
                    children: "Option 1",
                    value: "option-1",
                  },
                  {
                    children: "Option 2",
                    value: "option-2",
                  },
                  {
                    children: "Option 3",
                    value: "option-3",
                  },
                ]}
              />
              <Menu
                buttonComponent={<Button>Menü</Button>}
                items={[
                  { type: "button", onClick: () => {}, children: "Test" },
                ]}
              />

              <Tooltip label="Tooltip">
                <Button>Tooltip</Button>
              </Tooltip>
            </div>
          }
          open={open}
          setOpen={setOpen}
          {...args}
        />
      </Container>
    );
  },
};

export const ForbidCancellation = {
  render: ({ ...args }) => {
    const [open, setOpen] = useState(false);

    return (
      <Container>
        <Button onClick={() => setOpen(true)}>Modal öffnen</Button>

        <Modal
          forbidCancellation
          content={
            <div>
              <Button onClick={() => setOpen(false)}>Bestätigen</Button>
            </div>
          }
          open={open}
          setOpen={setOpen}
          {...args}
        />
      </Container>
    );
  },
};
