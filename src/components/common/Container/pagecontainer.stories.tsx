import { Meta } from "@storybook/react";
import { useRef } from "react";

import { extendedBgColors } from "@/styles";
import { cn } from "@/utils";

import { Heading, Text } from "../../ui/Typography";
import { Footer, Navbar } from "..";
import { PageContainer } from "./pagecontainer";

export default {
  title: "COMMON/PageContainer",
  component: PageContainer,
  argTypes: {},
} as Meta;

export const Default = ({ ...args }) => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar
        ref={navbarRef}
        allowDarkMode={false}
        navItems={[
          {
            label: "Full",
            fullWidthPopover: true,
            tag: { label: "width", variant: "outline" },
            child: "Test",
          },
          {
            label: "Item 3",
            href: "#",
          },
          {
            label: "Disabled",
            tag: {
              label: "nie",
              color: "danger",
              size: "sm",
              variant: "subtile",
            },
            disabled: true,
          },
        ]}
        logo={
          <Heading size="xl" className="hidden sm:block">
            Navbar
          </Heading>
        }
        {...args}
      />
      <PageContainer
        navbarRef={navbarRef}
        footerRef={footerRef}
        className={cn(extendedBgColors.subtile)}
        {...args}
      >
        <Text className={cn(extendedBgColors.filled)}>
          Dies ist ein Page Container
        </Text>
      </PageContainer>
      <Footer
        ref={footerRef}
        className="bg-accent-100 dark:bg-accent-800"
        legalSection="Dies ist der Footer"
        links={[
          { label: "Test Label", links: [] },
          { label: "Test", links: [] },
          { label: "Test", links: [] },
          { label: "Test", links: [] },
        ]}
        {...args}
      />
    </>
  );
};
