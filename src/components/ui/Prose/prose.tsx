import { memo } from "react";
import parse, {
  HTMLReactParserOptions,
  Element,
  domToReact,
} from "html-react-parser";
import cn from "classnames";
import { Heading, Text } from "../Typography";

export type ProseProps = {
  content: string;
  className?: string;
};

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    const typedDomNode = domNode as Element;

    if (typedDomNode.attribs) {
      if (typedDomNode.name === "h1")
        return (
          <Heading size="4xl" as="h1">
            {typedDomNode.children &&
              domToReact(typedDomNode.children, options)}
          </Heading>
        );
      if (typedDomNode.name === "h2")
        return (
          <Heading size="xl" as="h2">
            {typedDomNode.children &&
              domToReact(typedDomNode.children, options)}
          </Heading>
        );
      if (typedDomNode.name === "h3")
        return (
          <Heading size="lg" as="h3">
            {typedDomNode.children &&
              domToReact(typedDomNode.children, options)}
          </Heading>
        );
      if (typedDomNode.name === "h4")
        return (
          <Heading size="md" as="h4">
            {typedDomNode.children &&
              domToReact(typedDomNode.children, options)}
          </Heading>
        );
      if (typedDomNode.name === "h5")
        return (
          <Heading size="sm" as="h5">
            {typedDomNode.children &&
              domToReact(typedDomNode.children, options)}
          </Heading>
        );
      if (typedDomNode.name === "h6")
        return (
          <Heading size="xs" as="h6">
            {typedDomNode.children &&
              domToReact(typedDomNode.children, options)}
          </Heading>
        );
      if (typedDomNode.name === "p")
        return (
          <Text>
            {typedDomNode.children &&
              domToReact(typedDomNode.children, options)}
          </Text>
        );
      // erweitern später
    }

    return null;
  },
};

export const Prose = ({ content, className }: ProseProps) => {
  const _content = parse(content, options);

  return <div className={cn("prose lg:prose-xl", className)}>{_content}</div>;
};

export default memo(Prose);
