import { Code, CodeInline } from ".";
import { Text } from "../Text";
import { codeVariants, colors, sizes } from "../../../../types";

export default {
  title: "UI/Typography/Code",
  component: Code,
};

export const Default = {
  render: ({ ...args }) => (
    <Text>
      Die ist ein <CodeInline {...args}>Inline Code</CodeInline>, welcher inline
      im Text eingebunden ist. <Code>Und dies ist ein normaler Code</Code>
    </Text>
  ),
};

export const Variants = {
  render: ({ ...args }) => (
    <div className="flex flex-col gap-4">
      {codeVariants.map((variant) => (
        <Text key={variant}>
          Die ist ein{" "}
          <CodeInline variant={variant} {...args}>
            Inline Code
          </CodeInline>
          , welcher inline im Text eingebunden ist.
          <Code variant={variant} {...args}>
            Und dies ist ein normaler Code
          </Code>
        </Text>
      ))}
    </div>
  ),
};

export const Colors = {
  render: ({ ...args }) => (
    <div className="flex flex-col gap-4">
      {colors.map((color) => (
        <Text key={color}>
          Die ist ein{" "}
          <CodeInline color={color} {...args}>
            Inline Code
          </CodeInline>
          , welcher inline im Text eingebunden ist.
          <Code color={color} {...args}>
            Und dies ist ein normaler Code
          </Code>
        </Text>
      ))}
    </div>
  ),
};

export const Sizes = {
  render: ({ ...args }) => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <Text key={size} size={size}>
          Die ist ein{" "}
          <CodeInline size={size} {...args}>
            Inline Code
          </CodeInline>
          , welcher inline im Text eingebunden ist.
          <Code size={size} {...args}>
            Und dies ist ein normaler Code
          </Code>
        </Text>
      ))}
    </div>
  ),
};
