import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs as ChakraTabs,
  TabsProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ExtendedTabsProps extends Omit<TabsProps, "children"> {
  tabs: TabProps[];
}

type TabProps = {
  title: string;
  content: ReactNode;
  disabled?: boolean;
};

export const Tabs = ({
  tabs = [],
  colorScheme = "black",
  ...props
}: ExtendedTabsProps) => (
  <ChakraTabs colorScheme={colorScheme} {...props}>
    <TabList>
      {tabs.map(({ title, disabled }, i) => (
        <Tab key={`tabbtn_${i}`} isDisabled={disabled}>
          {title}
        </Tab>
      ))}
    </TabList>

    <TabPanels>
      {tabs.map(({ content }, i) => (
        <TabPanel key={`tabpanel_${i}`}>{content}</TabPanel>
      ))}
    </TabPanels>
  </ChakraTabs>
);
