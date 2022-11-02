import { forwardRef, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";

import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "../../components/icons";
import { useColorModeValue, useDisclosure } from "../../utils";
import { IconButton } from "../Button";
import { Collapse } from "../Collapse";
import { Box, BoxProps, Flex, FlexProps } from "../Containers";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { type TagProps } from "../Tag";
import { type HeadingProps, Heading } from "../Text";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export type NavItemProps = {
  label: string;
  tag?: TagProps;
  subLabel?: string;
  children?: NavItemProps[];
  href?: string;
  disabled?: boolean;
};

export type NavbarProps = {
  navItems: NavItemProps[];
  logo: LogoProps;
  allowDarkMode?: boolean;
  navBarProps?: FlexProps;
  justifyDesktopNav?: "start" | "center" | "end";
  startItems?: ReactNode;
  endItems?: ReactNode;
  gap?: string;
};

type LogoProps = {
  icon: any;
  iconProps?: BoxProps;
  text?: string;
  textProps?: HeadingProps;
  href?: string;
  containerProps?: FlexProps;
};

export type SubNavProps = {
  navItems: NavItemProps[];
};

export const Navbar = forwardRef<NavbarProps, "div">(
  (
    {
      navItems = [],
      logo,
      allowDarkMode = true,
      navBarProps,
      justifyDesktopNav = "start",
      startItems,
      endItems,
      gap = "10",
    }: NavbarProps,
    ref
  ) => {
    const { isOpen, onToggle } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
      <Box ref={ref} position="fixed" w="full" zIndex="banner" top="0">
        <Flex
          bg={useColorModeValue("gray.100", "gray.900")}
          color={useColorModeValue("gray.600", "gray.100")}
          minH="60px"
          py={{ base: 2 }}
          px={{ base: 4, xl: 12 }}
          borderBottom={1}
          borderStyle="solid"
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align="center"
          justifyContent="space-between"
          gap={gap}
          {...navBarProps}
        >
          <Logo {...logo} />
          {startItems && startItems}
          <Flex
            display={{ base: "none", md: "flex" }}
            flex={{ base: 1, md: "auto" }}
            justify={justifyDesktopNav}
          >
            <DesktopNav navItems={navItems} />
          </Flex>
          <Flex justify="end" alignItems="center" gap={gap}>
            {endItems && endItems}
            {allowDarkMode && (
              <Flex
                flex={{ base: 1, md: "auto" }}
                display={{ base: "none", md: "flex" }}
                justify="end"
                mr={-2}
              >
                <IconButton
                  aria-label="toggle-dark-mode"
                  variant="ghost"
                  onClick={toggleColorMode}
                >
                  {colorMode === "light" ? (
                    <Icon icon={MoonIcon} />
                  ) : (
                    <Icon icon={SunIcon} />
                  )}
                </IconButton>
              </Flex>
            )}
            <Flex
              flex={{ base: 1, md: "auto" }}
              display={{ base: "flex", md: "none" }}
              justify="end"
              mr={-2}
            >
              <IconButton
                onClick={onToggle}
                icon={
                  isOpen ? <Icon icon={XMarkIcon} /> : <Icon icon={Bars3Icon} />
                }
                variant="ghost"
                aria-label="Toggle Navigation"
              />
            </Flex>
          </Flex>
        </Flex>

        <Collapse open={isOpen} animateOpacity>
          <MobileNav navItems={navItems} />
        </Collapse>
      </Box>
    );
  }
);

Navbar.defaultProps = {
  allowDarkMode: true,
  navBarProps: undefined,
  justifyDesktopNav: "start",
  gap: "10",
};

const Logo = ({
  href,
  containerProps,
  icon,
  iconProps,
  text,
  textProps,
}: LogoProps) => {
  const logoTextColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Link href={href || "/"}>
      <Flex
        flex={{ base: 1 }}
        justify={{ base: "start", md: "start" }}
        align="center"
        gap="5"
        {...containerProps}
      >
        {icon && (
          <Box
            maxH={{ base: "10", md: "12" }}
            maxW={{ base: "10", md: "12" }}
            w="full"
            h="full"
            {...iconProps}
          >
            {icon}
          </Box>
        )}
        {text && (
          <Heading
            display={{ base: "none", lg: "flex" }}
            fontSize="3xl"
            textAlign={{ base: "center", md: "left" }}
            fontFamily="heading"
            color={logoTextColor}
            {...textProps}
          >
            {text}
          </Heading>
        )}
      </Flex>
    </Link>
  );
};

Logo.defaultProps = {
  iconProps: undefined,
  text: undefined,
  textProps: undefined,
  href: undefined,
  containerProps: undefined,
};
