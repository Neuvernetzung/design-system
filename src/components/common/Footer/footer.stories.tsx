import { IconBeach, IconCheck, IconCross } from "@tabler/icons-react";

import { Heading, Text } from "@/components/ui";

import { Logo } from "../../../../public/Logo";
import { Icon } from "../../ui/Icon";
import { Footer } from "./footer";

export default {
  title: "COMMON/Footer",
  component: Footer,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
};

export const Default = {
  render: ({ ...args }) => (
    <Footer
      divider={{
        logo: <Icon size="lg" icon={Logo} className="fill-primary-500" />,
      }}
      main={
        <div className="flex flex-col gap-2">
          <Heading level="h3" size="lg">
            Testfirma
          </Heading>
          <Text>Irgendendetwas</Text>
          <Text size="sm">Social Media</Text>
        </div>
      }
      legalSection="Copyright by Neuvernetzung UG"
      links={[
        {
          label: "Rechtliches",
          icon: IconBeach,
          links: [
            { label: "Impressum", href: "/", icon: IconCheck },
            { label: "Datenschutz", href: "/", icon: IconCross },
          ],
        },
        {
          label: "Rechtliches",
          links: [
            { label: "Impressum", href: "/" },
            { label: "Datenschutz", href: "/" },
          ],
        },
        {
          label: "Rechtliches",
          links: [
            { label: "Impressum", href: "/" },
            { label: "Datenschutz", href: "/" },
          ],
        },
        {
          label: "Rechtliches",
          links: [
            { label: "Impressum", href: "/" },
            { label: "Datenschutz", href: "/" },
          ],
        },
      ]}
      {...args}
    />
  ),
};
