import { axe } from "jest-axe";
import { Image } from ".";
import { render } from "@testing-library/react";

it("Image axe", async () => {
  const { container } = render(
    <Image
      src="/testImage.jpg"
      alt="test Bild"
      isLocal
      className="aspect-video rounded-lg"
    />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
