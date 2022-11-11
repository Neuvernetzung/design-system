import { IconButton, Menu } from "../../ui";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "../../../theme/icons";
import { useTheme } from "next-themes";

type ThemeSwitchProps = {
  variant?: "button" | "menu";
};

export const ThemeSwitch = ({ variant = "button" }: ThemeSwitchProps) => {
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
        aria-label="theme-switch"
        icon={resolvedTheme === "light" ? SunIcon : MoonIcon}
      />
    );

  if (variant === "menu")
    return (
      <Menu
        dropdownClassName="min-w-[8rem] w-16 bg-red-500"
        buttonType="icon"
        buttonProps={{
          "aria-label": "theme-switch",
          icon: resolvedTheme === "light" ? SunIcon : MoonIcon,
          variant: "ghost",
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

ThemeSwitch.defaultProps = {
  variant: "button",
};
