/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import { axe } from "jest-axe";
import { useForm } from "react-hook-form";

import { render } from "../../../../test-utils";
import { EmailEditor } from ".";
import { EmailVariables } from "@/utils/template/renderEmailTemplate";

const ExtendedForm = () => {
  const { control } = useForm();

  const variables: EmailVariables = {
    name: { title: "Name", value: "Max Mustermann" },
    date: {
      title: "Datum",
      value: Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
      }).format(new Date()),
    },
  };

  return (
    <EmailEditor
      control={control}
      name="richText"
      label="EmailEditor"
      variables={variables}
    />
  );
};

beforeAll(() => {
  class ClipboardEventMock extends Event {
    clipboardData: {
      getData: jest.Mock<any, [string]>;
      setData: jest.Mock<any, [string, string]>;
    };

    constructor(type: string, eventInitDict?: EventInit) {
      super(type, eventInitDict);
      this.clipboardData = {
        getData: jest.fn(),
        setData: jest.fn(),
      };
    }
  }
  class DragEventMock extends Event {
    dataTransfer: {
      getData: jest.Mock<any, [string]>;
      setData: jest.Mock<any, [string, string]>;
    };

    constructor(type: string, eventInitDict?: EventInit) {
      super(type, eventInitDict);
      this.dataTransfer = {
        getData: jest.fn(),
        setData: jest.fn(),
      };
    }
  }
  (globalThis as any).DragEvent = DragEventMock;

  (globalThis as any).ClipboardEvent = ClipboardEventMock;
});

it("EmailEditor axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
