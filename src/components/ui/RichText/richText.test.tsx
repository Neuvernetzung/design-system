/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import { axe } from "jest-axe";
import { useForm } from "react-hook-form";

import { render } from "../../../../test-utils";
import { RichText } from ".";

const ExtendedForm = () => {
  const { control } = useForm();

  return <RichText control={control} name="richText" label="RichText" />;
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

it("RichText axe", async () => {
  const { container } = render(<ExtendedForm />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
