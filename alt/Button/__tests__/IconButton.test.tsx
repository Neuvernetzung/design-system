import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { render, screen } from "@testing-library/react";

import { IconButton } from "../IconButton";

describe("Icon Button", () => {
  test("Icon Button rendern", () => {
    const children = "Test IconButton";

    render(
      <IconButton aria-label="test-button" icon={<MagnifyingGlassIcon />}>
        {children}
      </IconButton>
    );
    const iconButton = screen.getByRole("button");
    expect(iconButton).toBeInTheDocument();
  });

  test("Disabled Button rendern", () => {
    const children = "Disabled";

    render(
      <IconButton aria-label="test-button" isDisabled>
        {children}
      </IconButton>
    );
    const iconButton = screen.getByRole("button");
    expect(iconButton).toBeInTheDocument();
    expect(iconButton).toBeDisabled();
  });
});
