

import { Kbd } from ".";
import { Text } from "../Text";

export default {
  title: "UI/Typography/Kbd",
  component: Kbd,
} ;

export const Default = {
  render: ({ ...args }) => (
    <Text>
      Drücken Sie <Kbd {...args}>alt + f4</Kbd> um die Seite zu schließen.
    </Text>
  ),
};
