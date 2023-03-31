import cn from "classnames";
import { gaps } from "../../../styles";
import { NavbarProps } from "./navbar";
import Link from "next/link";

export const NavLogo = ({
  logoProps,
  logo,
  textColor,
}: Pick<NavbarProps, "logo" | "logoProps"> & { textColor?: string }) => (
  <Link href={logoProps?.href || "/"} legacyBehavior>
    <a
      className={cn(
        "flex flex-row items-center select-none whitespace-nowrap",
        gaps.sm,
        logoProps?.containerClassName,
        textColor
      )}
    >
      {logo}
    </a>
  </Link>
);
