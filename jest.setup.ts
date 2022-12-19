import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

export default {};
