import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Text } from "../Typography";
import { Popover } from "./popover";

export default {
  title: "UI/Overlay/Popover",
  component: Popover,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5 w-full justify-between" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <Popover
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      buttonProps={{ children: "Popover öffnen" }}
      placement="bottom-start"
      {...args}
    />
    <Popover
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      buttonProps={{ children: "Popover öffnen" }}
      placement="bottom"
      {...args}
    />
    <Popover
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      buttonProps={{ children: "Popover öffnen" }}
      placement="bottom-end"
      {...args}
    />
  </Container>
);

export const OnHover = ({ ...args }) => (
  <Container>
    <Popover
      trigger="hover"
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      buttonProps={{ children: "Hier hovern" }}
      {...args}
    />
  </Container>
);

export const PanelClassName = ({ ...args }) => (
  <Container>
    <Popover
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      placement="bottom-start"
      panelClassName="bg-red-500 w-64"
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
      placement="bottom-start"
      buttonProps={{ children: "Viel Content" }}
      {...args}
    />
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
      placement="bottom-end"
      fullScreenOnMobile
      buttonProps={{ children: "Viel Content Mobile Fullscreen" }}
      {...args}
    />
  </Container>
);
