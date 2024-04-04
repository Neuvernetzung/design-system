

import { ScrollArea } from ".";

export default {
  title: "UI/Data Display/ScrollArea",
  component: ScrollArea,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} ;

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export const Default = {
  render: ({ ...args }) => (
    <ScrollArea className="w-32 h-64" {...args}>
      <div className="w-96">
        {TAGS.map((tag) => (
          <div
            className="text-mauve12 text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-mauve6"
            key={tag}
          >
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
