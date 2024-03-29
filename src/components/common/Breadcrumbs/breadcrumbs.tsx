import { cn } from "@/utils";
import { useRouter } from "next/router";
import { IconChevronRight, IconHome } from "@tabler/icons-react";
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
        icon={IconHome}
        ariaLabel="home"
        size={size}
        variant={variant}
        asChild
      >
        <Link href="/" />
      </IconButton>

      {newPaths
        .filter((v) => v)
        .map((item, i) => (
          <div
            key={i}
            className={cn("pl-1 flex flex-row justify-center items-center")}
          >
            <Icon size="xs" icon={IconChevronRight} color="subtile" />

            <Button
              size={size}
              variant={variant}
              disabled={i + 1 === newPaths.length || item === "..."}
            >
              <Link href={item}>
                {!transform
                  ? item.split("/").pop()
                  : transform(item.split("/").pop())}
              </Link>
            </Button>
          </div>
        ))}
    </div>
  );
};
