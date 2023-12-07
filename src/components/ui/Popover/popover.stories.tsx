import { Meta } from "@storybook/react";

import { Text } from "../Typography";
import { Popover } from ".";
import { IconButton } from "../Button";
import { IconLockOpen } from "@tabler/icons-react";
import { usePopover } from "./popover";

export default {
  title: "UI/Overlay/Popover",
  component: Popover,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5 w-full justify-between" {...props} />
);

export const Default = ({ ...args }) => (
  <div className="flex flex-row gap-4 justify-between">
    <Popover
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      buttonProps={{ children: "Popover öffnen" }}
      align="start"
      side="bottom"
      {...args}
    />
    <Popover
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      buttonProps={{ children: "Popover öffnen" }}
      side="bottom"
      {...args}
    />
    <Popover
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      buttonProps={{ children: "Popover öffnen" }}
      align="end"
      side="bottom"
      {...args}
    />
  </div>
);

export const CustomTrigger = ({ ...args }) => (
  <Container>
    <Popover
      buttonComponent={<IconButton ariaLabel="open" icon={IconLockOpen} />}
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      align="start"
      side="bottom"
      panelClassName="bg-red-500 w-64"
      {...args}
    />
  </Container>
);

export const Controlled = ({ ...args }) => {
  const controller = usePopover();

  return (
    <div className="flex flex-col gap-2">
      {controller.open.toString()}
      <Popover
        controller={controller}
        content={
          <div>
            <Text>Dies ist ein Popover</Text>
          </div>
        }
        align="start"
        side="bottom"
        buttonProps={{ children: "Panel Classname" }}
        {...args}
      />
    </div>
  );
};

export const PanelClassName = ({ ...args }) => (
  <Container>
    <Popover
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      align="start"
      side="bottom"
      panelClassName="!bg-red-500 w-64"
      buttonProps={{ children: "Panel Classname" }}
      {...args}
    />
  </Container>
);

export const LargeContent = ({ ...args }) => (
  <Container>
    <Popover
      content={
        <div>
          <Text>
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
            placerat facer
          </Text>
        </div>
      }
      align="start"
      side="bottom"
      buttonProps={{ children: "Viel Content" }}
      {...args}
    />
  </Container>
);

export const PositionAgainstElement = ({ ...args }) => (
  <Container>
    <div className="relative w-64 mx-auto rounded-lg p-4 bg-accent-100 mt-20">
      <Popover
        content={
          <div>
            <Text>Dies ist ein Popover</Text>
          </div>
        }
        positionAgainstRelativeParent
        align="center"
        side="bottom"
        buttonProps={{ children: "Panel Classname" }}
        {...args}
      />
    </div>
    <div className="relative w-64 mx-auto rounded-lg p-4 bg-accent-100 mt-20">
      <Popover
        content={
          <div>
            <Text>Fullwidth</Text>
          </div>
        }
        positionAgainstRelativeParent
        align="center"
        side="bottom"
        buttonProps={{ children: "Full width" }}
        fullWidth
        {...args}
      />
    </div>
  </Container>
);
