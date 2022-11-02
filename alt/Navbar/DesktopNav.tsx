import { useColorModeValue } from "@chakra-ui/react";

import { ChevronRightIcon } from "../../components/icons";
import { Button } from "../Button";
import { Box, Flex, Stack } from "../Containers";
import { Icon } from "../Icon";
import { Link } from "../Link";
import { Popover } from "../Popover";
import { Tag } from "../Tag";
import { Text } from "../Text";
import type { NavItemProps, SubNavProps } from "./Navbar";

export const DesktopNav = ({ navItems }: SubNavProps) => (
  <Stack direction="row" spacing={4}>
    {navItems.map(({ label, children, href, tag, disabled }: NavItemProps) => (
      <Box key={label}>
        {!children ? (
          <Button
            as={Link}
            href={href}
            p={2}
            fontSize="sm"
            fontWeight={500}
            variant="ghost"
            gap="2"
            disabled={disabled}
          >
            {label}
            {tag && <Tag variant="solid" size="sm" {...tag} />}
          </Button>
        ) : (
          <Popover
            button={
              <Button
                p={2}
                fontSize="sm"
                fontWeight={500}
                variant="ghost"
                gap="2"
                disabled={disabled}
              >
                {label}
                {tag && <Tag variant="solid" size="sm" {...tag} />}
              </Button>
            }
            trigger="hover"
            placement="bottom-start"
          >
            <Stack>
              {children?.map((child) => (
                <DesktopSubNav key={child.label} {...child} />
              ))}
            </Stack>
          </Popover>
        )}
      </Box>
    ))}
  </Stack>
);

export const DesktopSubNav = ({
  label,
  href,
  subLabel,
  tag,
  disabled,
}: NavItemProps) => (
  <Link href={href} disabled={disabled}>
    <Stack
      role="group"
      p={2}
      rounded="md"
      _hover={{ bg: useColorModeValue("gray.100", "gray.800") }}
      direction="row"
      align="center"
    >
      <Box>
        <Text
          transition="all .3s ease"
          _groupHover={{ color: useColorModeValue("gray.900", "gray.100") }}
          fontWeight={500}
          gap="2"
          display="flex"
        >
          {label}
          {tag && <Tag variant="solid" size="sm" {...tag} />}
        </Text>
        <Text fontSize="sm">{subLabel}</Text>
      </Box>
      <Flex
        transition="all .3s ease"
        transform="translateX(-10px)"
        opacity={0}
        _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
        justify="flex-end"
        align="center"
        flex={1}
      >
        <Icon
          color={useColorModeValue("gray.900", "gray.100")}
          icon={ChevronRightIcon}
        />
      </Flex>
    </Stack>
  </Link>
);
