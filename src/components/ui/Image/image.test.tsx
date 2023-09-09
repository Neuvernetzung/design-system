import { render } from "../../../../test-utils";
import { axe } from "jest-axe";

import { Image } from ".";

it("Image axe", async () => {
  const { container } = render(
    <Image
      src="/testImage.jpg"
      alt="test Bild"
      className="aspect-video rounded-lg"
    />
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
