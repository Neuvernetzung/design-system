import { axe } from "jest-axe";

import { render } from "../../../../test-utils";
import { ScrollArea } from ".";

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

it("ScrollArea axe", async () => {
  const { container } = render(
    <ScrollArea className="w-32 h-64">
      <div className="w-96">
        {TAGS.map((tag) => (
          <div
            className="text-mauve12 text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-mauve6"
            key={tag}
          >
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
