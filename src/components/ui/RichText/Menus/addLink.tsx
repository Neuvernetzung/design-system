import { Editor } from "@tiptap/react";
import cn from "classnames";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { gaps } from "../../../../styles";
import { LinkIcon, TrashIcon } from "../../../../theme/icons";
import { hrefRegex, pathRegex } from "../../../../utils/internal/regex";
import { Button, IconButton } from "../../Button";
import { Form } from "../../Form";
import { Input } from "../../Input";
import { Modal } from "../../Modal";
import { Switch } from "../../Switch";
import { Tooltip } from "../../Tooltip";
import { Heading } from "../../Typography";

interface AddLinkButtonProps {
  editor: Editor;
  id: string;
}

interface LinkForm {
  href?: string;
  external: boolean;
}

export const AddLinkButton = ({ editor, id }: AddLinkButtonProps) => {
  const [open, setOpen] = useState(false);

  const currentHref = editor.getAttributes("link").href;

  const { control, handleSubmit, setValue, watch } = useForm<LinkForm>({
    defaultValues: { href: undefined, external: true },
  });
  const setFormState = (value?: string) => setValue("href", value);
  const setExternalState = (value: boolean) => setValue("external", value);

  const isExternal = watch("external");

  const active = editor.isActive("link");

  const onSubmit = ({ href }: LinkForm) => {
    if (!href) {
      return;
    }

    // empty
    if (href === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: isExternal ? `https://${href}` : `/${href}` })
      .run();
    setOpen(false);
  };

  const onDelete = () => {
    editor.chain().focus().unsetLink().run();
    setOpen(false);
  };

  return (
    <>
      <Tooltip label={!active ? "Link hinzufügen" : "Link bearbeiten"}>
        <IconButton
          id={id}
          tabIndex={-1}
          icon={LinkIcon}
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
                icon={TrashIcon}
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
            <Button type="submit" color="primary" fullWidth>
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
