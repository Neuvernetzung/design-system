import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useRef } from "react";

import { Text, Heading } from "../../ui/Typography";
import { Navbar, Footer } from "../";
import { PageContainer } from "./pagecontainer";

export default {
  title: "COMMON/PageContainer",
  component: PageContainer,
  argTypes: {},
} as Meta;

export const Default = ({ ...args }) => {
  const navbarRef = useRef(null);
  const footerRef = useRef(null);

  return (
    <>
      <Navbar
        ref={navbarRef}
        allowDarkMode={false}
        navItems={[]}
        logo={
          <Heading size="xl" className="hidden sm:block">
            Navbar
          </Heading>
        }
        {...args}
      />
      <PageContainer navbarRef={navbarRef} footerRef={footerRef} {...args}>
        <Text>Dies ist ein Page Container</Text>
      </PageContainer>
      <Footer
        ref={footerRef}
        className="bg-accent-100 dark:bg-accent-800"
        copyright="Dies ist der Footer"
        {...args}
      />
    </>
  );
};

Default.parameters = {
  a11y: {
    disable: true,
  },
};
