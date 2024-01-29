import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import type { Size } from "../../../types";
import { IconButton } from "../../ui/Button";
import { Menu } from "../../ui/Menu";

type ThemeSwitchProps = {
  textColor?: string;
  size?: Size;
};

export const useThemeSwitcher = () => {
  // Zusätzlicher hook mit useEffect wird nur benötigt, da sonst ein Hydration mismatch auftreten kann.
  const [resolved, setResolved] = useState<string | undefined>();
  const [theme_, setTheme_] = useState<string | undefined>();
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setTheme_(theme);
    setResolved(resolvedTheme);
  }, [resolvedTheme]);

  return { theme: theme_, resolvedTheme: resolved, setTheme };
};

export const ThemeSwitch = ({ textColor, size = "md" }: ThemeSwitchProps) => {
  const { setTheme, resolvedTheme } = useThemeSwitcher();

  const handleSwitchTheme = () => {
    if (resolvedTheme === "light") setTheme("dark");
    if (resolvedTheme === "dark") setTheme("light");
  };

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
  const { theme, setTheme, resolvedTheme } = useThemeSwitcher();

  return (
    <Menu
      dropdownClassName="min-w-[8rem] w-16"
      buttonComponent={
        <IconButton
          ariaLabel="theme-switch"
          size={size}
          icon={resolvedTheme === "light" ? IconSun : IconMoon}
          variant="ghost"
          className={textColor}
        />
      }
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
