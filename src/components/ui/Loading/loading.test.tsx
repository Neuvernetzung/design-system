import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { useEffect } from "react";

import { Loading, loading } from ".";

const LoadingTest = () => {
  useEffect(() => loading(true), []);

  return <Loading />;
};

it("Loading axe", async () => {
  const { container } = render(<LoadingTest />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
