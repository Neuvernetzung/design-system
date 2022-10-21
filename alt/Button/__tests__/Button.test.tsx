import { render, screen } from "@testing-library/react";

import { Button } from "../Button";

describe("Button", () => {
  test("Button rendern", () => {
    const children = "Test Button";

    render(<Button>{children}</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(children);
  });

  test("Disabled Button rendern", () => {
    const children = "Disabled";

    render(<Button isDisabled>{children}</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
