import cn from "classnames";
import { useRouter } from "next/router";

import { ChevronRightIcon, HomeIcon } from "../../../theme/icons";
import type { ButtonVariant, Size } from "../../../types";
import { Button, Icon, IconButton, Link } from "../../ui";

type BreadcrumbsT = {
  size?: Size;
  variant?: ButtonVariant;
  transform?: (item?: string) => string;
  shorten?: number;
};

export const Breadcrumbs = ({
  size = "sm",
  variant = "ghost",
  transform,
  shorten = 4,
}: BreadcrumbsT) => {
  const router = useRouter();

  if (router.pathname === "/") return null;

  const paths = router.asPath.split("/").splice(1);

  const newPaths: string[] = [];
  let stackingPaths = "";
  paths.map((_, i) => {
    stackingPaths = `${stackingPaths && stackingPaths}/${
      paths[i].split("?")[0]
    }`;
    if (stackingPaths !== "/") newPaths.push(stackingPaths);
    return null;
  });

  if (newPaths.length > shorten) {
    newPaths.splice(1, newPaths.length - shorten);
    newPaths.splice(1, 1, "...");
  }

  return (
    <div className="flex flex-row items-center">
      <IconButton
        icon={HomeIcon}
        ariaLabel="home"
        size={size}
        variant={variant}
        as={Link}
        href="/"
      />

      {newPaths
        .filter((v) => v)
        .map((item, i) => (
          <div
            key={i}
            className={cn("pl-1 flex flex-row justify-center items-center")}
          >
            <Icon size="xs" icon={ChevronRightIcon} color="subtile" />

            <Button
              size={size}
              variant={variant}
              as={Link}
              href={item}
              disabled={i + 1 === newPaths.length || item === "..."}
            >
              {!transform
                ? item.split("/").pop()
                : transform(item.split("/").pop())}
            </Button>
          </div>
        ))}
    </div>
  );
};
