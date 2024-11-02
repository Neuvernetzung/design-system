import { ToolbarButton } from "@radix-ui/react-toolbar";
import { IconLink, IconTrash } from "@tabler/icons-react";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/utils";

import { gaps } from "../../../../styles";
import { hrefRegex, pathRegex } from "../../../../utils/internal/regex";
import { Button, IconButton } from "../../Button";
import { Form } from "../../Form";
import { Input } from "../../Input";
import { Modal } from "../../Modal";
import { Switch } from "../../Switch";
import { Tooltip } from "../../Tooltip";
import { Heading } from "../../Typography";

type AddLinkButtonProps = {
  editor: Editor | null;
};

type LinkFormProps = {
  href?: string;
  external: boolean;
};

export const AddLinkButton = ({ editor }: AddLinkButtonProps) => {
  const [open, setOpen] = useState(false);

  const currentHref = editor?.getAttributes("link").href;

  const { control, handleSubmit, setValue, watch } = useForm<LinkFormProps>({
    defaultValues: { href: undefined, external: true },
  });
  const setFormState = (value?: string) => setValue("href", value);
  const setExternalState = (value: boolean) => setValue("external", value);

  const isExternal = watch("external");

  const active = editor?.isActive("link");

  const onSubmit = ({ href }: LinkFormProps) => {
    if (!href) {
      return;
    }

    // empty
    if (href === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: isExternal ? `https://${href}` : `/${href}`,
        target: isExternal ? "_blank" : null,
        rel: isExternal ? "noopener noreferrer nofollow" : null,
      })
      .run();
    setOpen(false);
  };

  const onDelete = () => {
    editor?.chain().focus().unsetLink().run();
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        label={!active ? "Link hinzufügen" : "Link bearbeiten"}
        delay={500}
      >
        <ToolbarButton asChild>
          <IconButton
            tabIndex={-1}
            icon={IconLink}
            size="sm"
            ariaLabel={!active ? "add_link" : "remove_link"}
            variant={!active ? "ghost" : "subtile"}
            onClick={() => {
              setFormState(
                !currentHref
                  ? ""
                  : String(currentHref).includes("https://")
                  ? currentHref.split("https://")?.[1]
                  : currentHref.slice(0, 1) === "/"
                  ? currentHref.slice(1)
                  : currentHref
              );
              setExternalState(
                !currentHref
                  ? true
                  : String(currentHref).includes("https://")
                  ? true
                  : !(currentHref.slice(0, 1) === "/")
              );
              setOpen(true);
            }}
          />
        </ToolbarButton>
      </Tooltip>
      <Modal
        header={
          <div className="flex flex-row items-center justify-between gap-4 w-full">
            <Heading>{!active ? "Link hinzufügen" : "Link bearbeiten"}</Heading>
            {active && (
              <IconButton
                size="sm"
                variant="ghost"
                color="danger"
                icon={IconTrash}
                ariaLabel="delete_link"
                onClick={onDelete}
              />
            )}
          </div>
        }
        size="md"
        content={
          <Form
            handleSubmit={handleSubmit}
            isNestedForm
            onSubmit={onSubmit}
            className={cn("w-full flex flex-col", gaps.sm)}
          >
            <Input
              control={control}
              name="href"
              leftAddon={{
                children: isExternal ? "https://" : "/",
              }}
              label="Link"
              required={{ value: true, message: "Der Link wird benötigt!" }}
              pattern={{
                value: isExternal ? hrefRegex : pathRegex,
                message: isExternal
                  ? "Dies ist kein gültiger Link!"
                  : "Dies ist kein gültiger Pfad!",
              }}
            />
            <Switch
              control={control}
              name="external"
              size="sm"
              content="Externer Link"
            />
            <Button type="submit" color="primary" className="w-full">
              Bestätigen
            </Button>
          </Form>
        }
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
