import { axe } from "jest-axe";
import { Link } from ".";
import { render } from "@testing-library/react";

it("Link axe", async () => {
  const { container } = render(<Link href="/">Test</Link>);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
