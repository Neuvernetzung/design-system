import { Flex, useColorModeValue, useDisclosure } from "@chakra-ui/react";

import { ChevronDownIcon } from "../../components/icons";
import { Button } from "../Button";
import { Collapse } from "../Collapse";
import { Stack } from "../Containers";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { Tag } from "../Tag";
import { Text } from "../Text";
import type { NavItemProps, SubNavProps } from "./Navbar";

export const MobileNav = ({ navItems }: SubNavProps) => (
  <Stack
    bg={useColorModeValue("white", "gray.800")}
    p={4}
    display={{ md: "none" }}
  >
    {navItems.map((navItem) => (
      <MobileNavItem key={navItem.label} {...navItem} />
    ))}
  </Stack>
);

export const MobileNavItem = ({
  label,
  children,
  href,
  tag,
  disabled,
}: NavItemProps) => {
  const { isOpen, onToggle } = useDisclosure();

  const textColor = useColorModeValue("gray.600", "gray.200");

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Link href={href} disabled={disabled} width="full">
        <Button
          as={Flex}
          variant="ghost"
          py={2}
          display="flex"
          align="start"
          justifyContent="space-between"
          flexFlow="row"
          width="full"
        >
          <Text fontWeight={600} color={textColor} gap="2" display="flex">
            {label}
            {tag && <Tag variant="solid" size="sm" {...tag} />}
          </Text>
          {children && (
            <Icon
              icon={ChevronDownIcon}
              transition="all .25s ease-in-out"
              transform={isOpen ? "rotate(180deg)" : ""}
            />
          )}
        </Button>
      </Link>

      <Collapse
        open={isOpen}
        animateOpacity
        style={{ marginTop: "0!important" }}
      >
        <Stack
          my={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          width="full"
        >
          {children &&
            children.map(({ label, href, tag, disabled }) => (
              <Link key={label} href={href} disabled={disabled} width="full">
                <Button
                  as={Text}
                  variant="ghost"
                  w="full"
                  fontWeight={600}
                  color={textColor}
                  gap="2"
                  display="flex"
                  align="start"
                  justifyContent="start"
                >
                  {label}
                  {tag && <Tag variant="solid" size="sm" {...tag} />}
                </Button>
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
