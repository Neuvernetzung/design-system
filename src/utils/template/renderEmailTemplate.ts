import Mustache from "mustache";

export type EmailVariable = {
  title: string;
  value: string | undefined;
};

export type EmailVariables<TVariables extends string = string> = Record<
  TVariables,
  EmailVariable
>;

export const renderEmailTemplate = (
  htmlString: string,
  data: EmailVariables = {}
) =>
  Mustache.render(
    htmlString,
    Object.fromEntries(
      Object.entries(data).map(([id, variable]) => [id, variable.value])
    )
  );
