import {
  Bars3BottomLeftIcon,
  Bars3BottomRightIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import cn from "classnames";
import { FC, memo, SVGProps, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import {
  type BaseEditor,
  createEditor,
  Editor,
  Element as SlateElement,
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
  transition,
} from "../../../styles";
import { ListBulletIcon } from "../../../theme/icons";
import { type ProseComponents } from "../../../types";
import { type RequiredRule, Button, FormElement, IconButton } from "..";
import { createProseElement } from "../Prose/prose";
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

export interface RichtTextProps {
  formMethods: any;
  name: string;
  label?: string;
  helper?: string;
  required?: RequiredRule;
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export interface CustomElement {
  type: string;
  className?: string;
  children: any;
}

export interface CustomText {
  text: string;
  type: string;
  "font-bold"?: boolean;
  italic?: boolean;
  underline?: boolean;
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
}: RichtTextProps) => {
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
                "group appearance-none border w-full overflow-hidden",
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
                  "z-[1] flex flex-row flex-wrap border-b sticky"
                )}
              >
                <div className={cn(buttonGroupClassName)}>
                  <MarkButton format="font-bold" icon={Bold} />
                  <MarkButton format="italic" icon={Italic} />
                  <MarkButton format="underline" icon={Underline} />
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
                  <BlockButton format="block-quote" icon={Quote} />
                  <BlockButton format="ol" icon={OrderedList} />
                  <BlockButton format="ul" icon={ListBulletIcon} />
                </div>
                <div className={cn(buttonGroupClassName)}>
                  <BlockButton format="text-left" icon={Bars3BottomLeftIcon} />
                  <BlockButton format="text-center" icon={Bars3Icon} />
                  <BlockButton
                    format="text-right"
                    icon={Bars3BottomRightIcon}
                  />
                </div>
                <div className={cn(buttonGroupClassName)}>
                  <BlockButton format="text-justify" icon={Bars3Icon} />
                </div>
              </div>
              <div className={cn(paddings.md, prose)}>
                <Editable
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                  placeholder="Enter some rich text…"
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

const toggleMark = (editor: CustomEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (
  editor: CustomEditor,
  format: string,
  blockType = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (blockType === "align"
          ? n.className?.includes(format)
          : n[blockType] === format),
    })
  );

  return !!match;
};

const isMarkActive = (editor: CustomEditor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
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

interface ButtonProps {
  format: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  title?: string;
}

const BlockButton = ({ format, icon, title }: ButtonProps) => {
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
      <IconButton
        variant={active ? "subtile" : "ghost"}
        ariaLabel={format}
        onClick={onClick}
        icon={icon}
      />
    );

  return (
    <Button variant={active ? "subtile" : "ghost"} onClick={onClick}>
      {title}
    </Button>
  );
};

BlockButton.defaultProps = {
  icon: undefined,
  title: undefined,
};

const MarkButton = ({ format, icon, title }: ButtonProps) => {
  const editor = useSlate();

  const active = isMarkActive(editor, format);

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    toggleMark(editor, format);
  };

  if (icon)
    return (
      <IconButton
        variant={active ? "subtile" : "ghost"}
        onClick={onClick}
        ariaLabel={format}
        icon={icon}
      />
    );

  return (
    <Button variant={active ? "subtile" : "ghost"} onClick={onClick}>
      {title}
    </Button>
  );
};

MarkButton.defaultProps = {
  icon: undefined,
  title: undefined,
};

export default memo(RichText);

RichText.defaultProps = {
  label: undefined,
  helper: undefined,
  required: false,
};
