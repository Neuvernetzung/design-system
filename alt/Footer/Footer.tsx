import { forwardRef } from "@chakra-ui/react";
import { ReactNode } from "react";

import { useColorModeValue } from "../../utils";
import { Box, Container, Flex, Grid, Stack } from "../Containers";
import { Link } from "../Link";
import { Text } from "../Text";

const ListHeader = ({ children }: { children: ReactNode }) => (
  <Text fontWeight="500" fontSize="lg" mb={2}>
    {children}
  </Text>
);

type FooterProps = {
  logo?: ReactNode;
  linkGroups?: LinkGroupProps[];
  copyright?: string;
};

type LinkGroupProps = {
  label: string;
  links: LinkProps[];
};

type LinkProps = {
  label: string;
  href: string;
};

export const Footer = forwardRef<FooterProps, "div">(
  ({ logo, linkGroups, copyright }, ref) => {
    const borderColor = useColorModeValue("gray.200", "gray.800");

    return (
      <Box
        ref={ref}
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container as={Stack} maxW="6xl" py={10}>
          <Grid
            columns={{
              base: 1,
              sm: Math.min(2, linkGroups?.length || 2),
              md: Math.min(4, linkGroups?.length || 4),
            }}
            spacing={8}
          >
            {linkGroups &&
              linkGroups?.map(({ label, links }, i) => (
                <Stack align="flex-start" key={`footerlinkgroup_${i}`}>
                  <ListHeader>{label}</ListHeader>
                  {links.map(({ label, href }, _i) => (
                    <Link href={href} key={`footergroup_${i}_el_${_i}`}>
                      {label}
                    </Link>
                  ))}
                </Stack>
              ))}
          </Grid>
        </Container>
        {(copyright || logo) && (
          <Box py={10}>
            <Flex
              align="center"
              _before={{
                content: '""',
                borderBottom: "1px solid",
                borderColor,
                flexGrow: 1,
                mr: logo ? 8 : 0,
              }}
              _after={{
                content: '""',
                borderBottom: "1px solid",
                borderColor,
                flexGrow: 1,
                ml: logo ? 8 : 0,
              }}
            >
              {logo}
            </Flex>

            <Text pt={6} fontSize="sm" textAlign="center">
              {copyright}
            </Text>
          </Box>
        )}
      </Box>
    );
  }
);

Footer.defaultProps = {
  logo: undefined,
  linkGroups: [],
  copyright: undefined,
};
