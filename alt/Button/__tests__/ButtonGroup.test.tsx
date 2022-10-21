import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { render, screen } from "@testing-library/react";

import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";
import { IconButton } from "../IconButton";

describe("Button Group", () => {
  test("Button Group rendern", () => {
    const children1 = "Test Button 1";
    const children2 = "Test Button 2";

    render(
      <ButtonGroup>
        <Button>{children1}</Button>
        <Button>{children2}</Button>
        <IconButton aria-label="test-button" icon={<MagnifyingGlassIcon />} />
      </ButtonGroup>
    );
    const [button1, button2, button3] = screen.getAllByRole("button");
    expect(button1).toBeInTheDocument();
    expect(button1).toHaveTextContent(children1);
    expect(button2).toBeInTheDocument();
    expect(button2).toHaveTextContent(children2);
    expect(button3).toBeInTheDocument();
  });

  test("Disabled Button Group rendern", () => {
    const children1 = "Test Button 1";
    const children2 = "Test Button 2";

    render(
      <ButtonGroup isDisabled>
        <Button>{children1}</Button>
        <Button>{children2}</Button>
        <IconButton aria-label="test-button" icon={<MagnifyingGlassIcon />} />
      </ButtonGroup>
    );
    const [button1, button2, button3] = screen.getAllByRole("button");
    expect(button1).toBeInTheDocument();
    expect(button1).toBeDisabled();
    expect(button2).toBeInTheDocument();
    expect(button2).toBeDisabled();
    expect(button3).toBeInTheDocument();
    expect(button3).toBeDisabled();
  });
});
