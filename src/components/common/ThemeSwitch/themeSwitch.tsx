import { useTheme } from "next-themes";

import { ComputerDesktopIcon, MoonIcon, SunIcon } from "../../../theme/icons";
import { IconButton, Menu } from "../../ui";

type ThemeSwitchProps = {
  variant?: "button" | "menu";
  textColor?: string;
};

export const ThemeSwitch = ({
  variant = "button",
  textColor,
}: ThemeSwitchProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleSwitchTheme = () => {
    if (resolvedTheme === "light") setTheme("dark");
    if (resolvedTheme === "dark") setTheme("light");
  };

  if (variant === "button")
    return (
      <IconButton
        onClick={handleSwitchTheme}
        variant="ghost"
        ariaLabel="theme-switch"
        className={textColor}
        icon={resolvedTheme === "light" ? SunIcon : MoonIcon}
      />
    );

  if (variant === "menu")
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

  return null;
};
