import { addons } from "@storybook/manager-api";
import imageFile from "../public/LogoFull.png";

addons.setConfig({
  theme: {
    base: "light",
    brandTitle: "Neuvernetzung - Design System",
    brandUrl: "https://neuvernetzung.de",
    brandImage: imageFile,
    brandTarget: "_blank",
  },
});
