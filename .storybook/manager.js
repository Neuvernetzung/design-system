import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";
import imageFile from "../public/LogoFull.png";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Neuvernetzung - Design System",
    brandUrl: "https://neuvernetzung.de",
    brandImage: imageFile,
    brandTarget: "_blank",
  }),
});
