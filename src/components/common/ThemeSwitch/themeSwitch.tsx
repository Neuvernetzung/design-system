import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";

import type { Size } from "../../../types";
import { IconButton, Menu } from "../../ui";

type ThemeSwitchProps = {
  textColor?: string;
  size?: Size;
};

export const ThemeSwitch = ({ textColor, size = "md" }: ThemeSwitchProps) => {
  const { setTheme, resolvedTheme } = useTheme();

  const handleSwitchTheme = () => {
    if (resolvedTheme === "light") setTheme("dark");
    if (resolvedTheme === "dark") setTheme("light");
  };

  if (!resolvedTheme) return null; // Serverside

  return (
    <IconButton
      size={size}
      onClick={handleSwitchTheme}
      variant="ghost"
      ariaLabel="theme-switch"
      className={textColor}
      icon={resolvedTheme === "light" ? IconSun : IconMoon}
    />
  );
};

export const ThemeSwitchMenu = ({
  textColor,
  size = "md",
}: ThemeSwitchProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <Menu
      dropdownClassName="min-w-[8rem] w-16 bg-red-500"
      buttonType="icon"
      buttonProps={{
        ariaLabel: "theme-switch",
        size,
        icon: resolvedTheme === "light" ? IconSun : IconMoon,
        variant: "ghost",
        className: textColor,
      }}
      items={[
        {
          icon: IconDeviceDesktop,
          children: "System",
          onClick: () => setTheme("system"),
          color: theme === "system" ? "primary" : "accent",
        },
        {
          icon: IconSun,
          children: "Light",
          onClick: () => setTheme("light"),
          color: theme === "light" ? "primary" : "accent",
        },
        {
          icon: IconMoon,
          children: "Dark",
          onClick: () => setTheme("dark"),
          color: theme === "dark" ? "primary" : "accent",
        },
      ]}
    />
  );
};
