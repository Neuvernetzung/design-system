import { axe } from "jest-axe";
import { Loading, loading } from ".";
import { useEffect } from "react";
import { render } from "@testing-library/react";

const LoadingTest = () => {
  useEffect(() => loading(true), []);

  return <Loading />;
};

it("Loading axe", async () => {
  const { container } = render(<LoadingTest />);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
