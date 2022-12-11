export const shades: Array<keyof Color> = [
  100, 200, 300, 400, 500, 600, 700, 800, 900,
];

export type HEX = `#${string}`;

export type Color = {
  100: HEX;
  200: HEX;
  300: HEX;
  400: HEX;
  500: HEX;
  600: HEX;
  700: HEX;
  800: HEX;
  900: HEX;
};

export const colors: Array<keyof Colors> = [
  "brand",
  "primary",
  "accent",
  "success",
  "warn",
  "danger",
];

export type Colors = {
  white?: any;
  black?: any;
  brand: any;
  primary: any;
  accent: any;
  success: any;
  warn: any;
  danger: any;
};

export interface ExtendedColors extends Colors {
  inherit?: any;
  subtile?: any;
  light?: any;
  dark?: any;
  filled?: any;
  filledSubtile?: any;
}
