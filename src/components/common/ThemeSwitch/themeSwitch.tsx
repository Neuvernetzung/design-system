import { useTheme } from "next-themes";

import { ComputerDesktopIcon, MoonIcon, SunIcon } from "../../../theme/icons";
import { IconButton, Menu } from "../../ui";
import { Sizes } from "../../../types";

type ThemeSwitchProps = {
  textColor?: string;
  size?: keyof Sizes;
};

export const ThemeSwitch = ({ textColor, size = "md" }: ThemeSwitchProps) => {
  const { setTheme, resolvedTheme } = useTheme();

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
      icon={resolvedTheme === "light" ? SunIcon : MoonIcon}
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
