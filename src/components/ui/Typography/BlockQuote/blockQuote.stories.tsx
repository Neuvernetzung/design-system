import { BlockQuote } from ".";

export default {
  title: "UI/Typography/BlockQuote",
  component: BlockQuote,
};

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Default = {
  render: ({ ...args }) => (
    <Container>
      <BlockQuote {...args}>
        Dies ist eine
        <br />
        mehrzeile Zitierung.
      </BlockQuote>
    </Container>
  ),
};
