import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface DisclosureProps extends AccordionProps {
  items?: ItemProps[];
}

type ItemProps = {
  title?: ReactNode;
  content: ReactNode;
  titleComponent?: ReactNode;
};

export const Disclosure = ({
  allowToggle = false,
  allowMultiple = true,
  items = [],
  ...props
}: DisclosureProps) => (
  <Accordion allowToggle={allowToggle} allowMultiple={allowMultiple} {...props}>
    {items.map((item, i) => (
      <AccordionItem
        key={`disclosureitem_${i}`}
        {...(item.titleComponent && {
          border: "none",
        })}
      >
        {!item?.titleComponent ? (
          <AccordionButton justifyContent="space-between">
            {item?.title}
            <AccordionIcon />
          </AccordionButton>
        ) : (
          <AccordionButton margin="0" padding="0">
            {item?.titleComponent}
          </AccordionButton>
        )}

        <AccordionPanel pb={4}>{item.content}</AccordionPanel>
      </AccordionItem>
    ))}
  </Accordion>
);

Disclosure.defaultProps = {
  items: [],
};
