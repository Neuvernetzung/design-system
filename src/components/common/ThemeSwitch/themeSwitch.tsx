import { useTheme } from "next-themes";

import { ComputerDesktopIcon, MoonIcon, SunIcon } from "../../../theme/icons";
import { IconButton, Menu } from "../../ui";

type ThemeSwitchProps = {
  textColor?: string;
};

export const ThemeSwitch = ({ textColor }: ThemeSwitchProps) => {
  const { setTheme, resolvedTheme } = useTheme();

  const handleSwitchTheme = () => {
    if (resolvedTheme === "light") setTheme("dark");
    if (resolvedTheme === "dark") setTheme("light");
  };

  return (
    <IconButton
      onClick={handleSwitchTheme}
      variant="ghost"
      ariaLabel="theme-switch"
      className={textColor}
      icon={resolvedTheme === "light" ? SunIcon : MoonIcon}
    />
  );
};

export const ThemeSwitchMenu = ({ textColor }: ThemeSwitchProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <Menu
      dropdownClassName="min-w-[8rem] w-16 bg-red-500"
      buttonType="icon"
      buttonProps={{
        ariaLabel: "theme-switch",
        icon: resolvedTheme === "light" ? SunIcon : MoonIcon,
        variant: "ghost",
        className: textColor,
      }}
      items={[
        {
          icon: ComputerDesktopIcon,
          children: "System",
          onClick: () => setTheme("system"),
          color: theme === "system" ? "primary" : "accent",
        },
        {
          icon: SunIcon,
          children: "Light",
          onClick: () => setTheme("light"),
          color: theme === "light" ? "primary" : "accent",
        },
        {
          icon: MoonIcon,
          children: "Dark",
          onClick: () => setTheme("dark"),
          color: theme === "dark" ? "primary" : "accent",
        },
      ]}
    />
  );
};
