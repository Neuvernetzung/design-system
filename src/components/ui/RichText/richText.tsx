import cn from "classnames";
import {
  type BaseSyntheticEvent,
  FC,
  memo,
  SVGProps,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import {
  type BaseEditor,
  createEditor,
  Editor,
  Element as SlateElement,
  Range,
  Transforms,
} from "slate";
import { type HistoryEditor, withHistory } from "slate-history";
import {
  type ReactEditor,
  type RenderElementProps,
  type RenderLeafProps,
  Editable,
  Slate,
  useSlate,
  withReact,
} from "slate-react";

import {
  bordersInteractive,
  extendedBgColors,
  gaps,
  gapsSmall,
  paddings,
  prose,
  roundings,
  roundingsTop,
  transition,
} from "../../../styles";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  CrossIcon,
  LinkIcon,
  ListBulletIcon,
  TrashIcon,
} from "../../../theme/icons";
import { type ProseComponents } from "../../../types";
import { hrefRegex } from "../../../utils/internal/regex";
import { Button, ButtonGroup, IconButton } from "../Button";
import { type RequiredRule, Form, FormElement } from "../Form";
import { Input } from "../Input";
import { Modal } from "../Modal";
import { Popover, PopoverButton } from "../Popover";
import { createProseElement } from "../Prose/prose";
import { Tooltip } from "../Tooltip";
import { Heading } from "../Typography";
import { Bold, Italic, OrderedList, Quote } from "./icons";
import Underline from "./icons/UnderlineIcon";
import { deserializeHtml, serializeHtml } from "./utils";

const LIST_TYPES = ["ol", "ul"];
const TEXT_ALIGN_CLASSES = [
  "text-left",
  "text-center",
  "text-right",
  "text-justify",
];

export interface RichTextProps {
  formMethods: any;
  name: string;
  label?: string;
  helper?: string;
  required?: RequiredRule;
  placeholder?: string;
}

interface Marks {
  "font-bold"?: boolean;
  italic?: boolean;
  underline?: boolean;
}

interface ILink {
  a?: string;
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export interface CustomElement {
  type: string;
  className?: string;
  children: any;
  href?: string;
}

export interface CustomText extends Marks, ILink {
  text: string;
  type: string;
  className?: string;
}

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export const RichText = ({
  formMethods,
  name,
  label,
  helper,
  required,
  placeholder,
}: RichTextProps) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const buttonGroupClassName = cn("flex flex-row flex-wrap", gapsSmall.xs);

  return (
    <Controller
      control={formMethods.control}
      name={name}
      rules={{
        required,
      }}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <FormElement name={name} label={label} helper={helper} error={error}>
          <Slate
            editor={editor}
            value={deserializeHtml(formMethods.getValues(name))}
            onChange={(v) => onChange(serializeHtml(v))}
          >
            <div
              className={cn(
                !error ? bordersInteractive.accent : bordersInteractive.danger,
                "group appearance-none border w-full",
                roundings.md,
                transition,
                "group-focus-within:outline-none group-focus-within:ring-2 group-focus-within:ring-primary-500 group-focus-within:border-transparent"
              )}
            >
              <div
                className={cn(
                  gaps.md,
                  bordersInteractive.accent,
                  extendedBgColors.filledSubtile,
                  paddings.sm,
                  transition,
                  roundingsTop.md,
                  "z-[1] flex flex-row flex-wrap border-b sticky"
                )}
              >
                <div className={cn(buttonGroupClassName)}>
                  <MarkButton format="font-bold" icon={Bold} />
                  <MarkButton format="italic" icon={Italic} />
                  <MarkButton format="underline" icon={Underline} />
                </div>
                <div className={cn(buttonGroupClassName)}>
                  <MarkLinkButton
                    icon={LinkIcon}
                    tooltip={
                      !isLinkActive(editor)
                        ? "Link hinzufügen"
                        : "Link bearbeiten"
                    }
                  />
                </div>
                <div className={cn(buttonGroupClassName)}>
                  <BlockButton format="p" title="p" />
                  <BlockButton format="h1" title="h1" />
                  <BlockButton format="h2" title="h2" />
                  <BlockButton format="h3" title="h3" />
                  <BlockButton format="h4" title="h4" />
                  <BlockButton format="h5" title="h5" />
                  <BlockButton format="h6" title="h6" />
                </div>
                <div className={cn(buttonGroupClassName)}>
                  <BlockButton
                    format="blockquote"
                    tooltip="Zitat"
                    icon={Quote}
                  />
                  <BlockButton format="ol" icon={OrderedList} />
                  <BlockButton format="ul" icon={ListBulletIcon} />
                </div>
                <div className={cn(buttonGroupClassName)}>
                  <BlockButton
                    format="text-left"
                    tooltip="Linksbündig"
                    icon={AlignLeftIcon}
                  />
                  <BlockButton
                    format="text-center"
                    tooltip="Zentriert"
                    icon={AlignCenterIcon}
                  />
                  <BlockButton
                    format="text-right"
                    tooltip="Rechtsbündig"
                    icon={AlignRightIcon}
                  />
                </div>
                <div className={cn(buttonGroupClassName)}>
                  <BlockButton
                    format="text-justify"
                    tooltip="Gleichmäßig"
                    icon={AlignJustifyIcon}
                  />
                </div>
              </div>
              <div className={cn(paddings.md, prose, "relative")}>
                <Editable
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                  placeholder={placeholder}
                  spellCheck
                  autoFocus
                  aria-label="rich_text_editable"
                />
              </div>
            </div>
          </Slate>
        </FormElement>
      )}
    />
  );
};

const toggleBlock = (editor: CustomEditor, format: string) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_CLASSES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_CLASSES.includes(format),
    split: true,
  });
  let newProperties: Partial<CustomElement>;
  if (TEXT_ALIGN_CLASSES.includes(format)) {
    newProperties = {
      className: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "p" : isList ? "li" : format,
    };
  }
  Transforms.setNodes<CustomElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (
  editor: CustomEditor,
  format: keyof Marks | keyof ILink,
  value?: any
) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, value ?? true);
  }
};

const isBlockActive = (
  editor: CustomEditor,
  format: string,
  blockType: "align" | "type" = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        (!Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          (blockType === "align"
            ? n.className?.includes(format)
            : n[blockType] === format)) ||
        false,
    })
  );

  return !!match;
};

const isMarkActive = (
  editor: CustomEditor,
  format: keyof Marks | keyof ILink
) => {
  const marks = Editor.marks(editor);
  return marks ? !!marks[format] : false;
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const className = element.className;
  const type = (element.type || "p") as keyof ProseComponents;

  return createProseElement({
    name: type,
    attributes: { ...attributes },
    className,
    children,
  });
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf["font-bold"]) {
    // eslint-disable-next-line no-param-reassign
    children = <span className="font-bold">{children}</span>;
  }

  if (leaf.italic) {
    // eslint-disable-next-line no-param-reassign
    children = <span className="italic">{children}</span>;
  }

  if (leaf.underline) {
    // eslint-disable-next-line no-param-reassign
    children = <span className="underline">{children}</span>;
  }

  return <span {...attributes}>{children}</span>;
};

interface BlockButtonProps {
  format: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  title?: string;
  tooltip?: string;
}

const BlockButton = ({ format, icon, title, tooltip }: BlockButtonProps) => {
  const editor = useSlate();

  const active = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_CLASSES.includes(format) ? "align" : "type"
  );

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    toggleBlock(editor, format);
  };

  if (icon)
    return (
      <Tooltip label={tooltip}>
        <IconButton
          variant={active ? "subtile" : "ghost"}
          ariaLabel={format}
          onClick={onClick}
          icon={icon}
        />
      </Tooltip>
    );

  return (
    <Tooltip label={tooltip}>
      <Button variant={active ? "subtile" : "ghost"} onClick={onClick}>
        {title}
      </Button>
    </Tooltip>
  );
};

BlockButton.defaultProps = {
  icon: undefined,
  title: undefined,
  tooltip: undefined,
};

interface MarkButtonProps {
  format: keyof Marks;
  icon?: FC<SVGProps<SVGSVGElement>>;
  title?: string;
  tooltip?: string;
}

const MarkButton = ({ format, icon, title, tooltip }: MarkButtonProps) => {
  const editor = useSlate();

  const active = isMarkActive(editor, format);

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    toggleMark(editor, format);
  };

  if (icon)
    return (
      <Tooltip label={tooltip}>
        <IconButton
          variant={active ? "subtile" : "ghost"}
          onClick={onClick}
          ariaLabel={format}
          icon={icon}
        />
      </Tooltip>
    );

  return (
    <Tooltip label={tooltip}>
      <Button variant={active ? "subtile" : "ghost"} onClick={onClick}>
        {title}
      </Button>
    </Tooltip>
  );
};

MarkButton.defaultProps = {
  icon: undefined,
  title: undefined,
  tooltip: undefined,
};

const insertLink = (editor: CustomEditor, href: string) => {
  if (editor.selection) {
    wrapLink(editor, href);
  }
};

const isLinkActive = (editor: CustomEditor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "a",
  });
  return !!link;
};
const linkValue = (editor: CustomEditor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "a",
  }) as any;
  return link?.[0]?.href;
};

const unwrapLink = (editor: CustomEditor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "a",
  });
};

const wrapLink = (editor: CustomEditor, href: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: any = {
    type: "a",
    href,
    children: isCollapsed ? [{ text: href }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

interface MarkLinkButtonProps {
  icon: FC<SVGProps<SVGSVGElement>>;
  tooltip?: string;
}

interface LinkForm {
  href?: string;
}

const MarkLinkButton = ({ icon, tooltip }: MarkLinkButtonProps) => {
  const editor = useSlate();
  const [open, setOpen] = useState(false);

  const formName = "href";

  const linkFormMethods = useForm<LinkForm>({
    defaultValues: { [formName]: undefined },
  });
  const setFormState = (value?: string) =>
    linkFormMethods.setValue(formName, value);

  const active = isLinkActive(editor);

  const onSubmit = ({ href }: LinkForm) => {
    if (!href) return;
    insertLink(editor, `https://${href}`);
    setOpen(false);
    setFormState(undefined);
  };

  const onDelete = () => {
    unwrapLink(editor);
    setOpen(false);
    setFormState(undefined);
  };

  const currentLinkValue = linkValue(editor);

  return (
    <>
      <Tooltip label={tooltip}>
        <IconButton
          icon={icon}
          variant={active ? "subtile" : "ghost"}
          onClick={() => {
            setFormState(
              String(currentLinkValue).includes("https://")
                ? currentLinkValue.split("https://")?.[1]
                : currentLinkValue
            );
            setOpen(true);
          }}
        >
          Link
        </IconButton>
      </Tooltip>
      <Modal
        size="md"
        content={
          <Form
            formMethods={linkFormMethods}
            onSubmit={(e: BaseSyntheticEvent) => {
              if (e) {
                if (typeof e.preventDefault === "function") {
                  e.preventDefault();
                }
                if (typeof e.stopPropagation === "function") {
                  e.stopPropagation();
                }
              }
              return linkFormMethods.handleSubmit((v) => onSubmit(v))(e);
            }}
            className={cn("w-full flex flex-col", gaps.sm)}
          >
            <Input
              formMethods={linkFormMethods}
              name={formName}
              leftAddon={{ children: "https://" }}
              label="Link"
              required={{ value: true, message: "Der Link wird benötigt!" }}
              pattern={{
                value: hrefRegex,
                message: "Dies ist kein gültiger Link!",
              }}
            />
            <ButtonGroup>
              <Button type="submit" fullWidth>
                Bestätigen
              </Button>
              {active && (
                <IconButton
                  color="danger"
                  icon={TrashIcon}
                  ariaLabel="delete_link"
                  onClick={onDelete}
                />
              )}
            </ButtonGroup>
          </Form>
        }
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

MarkLinkButton.defaultProps = {
  tooltip: undefined,
};

export default memo(RichText);

RichText.defaultProps = {
  label: undefined,
  helper: undefined,
  required: false,
  placeholder: undefined,
};
