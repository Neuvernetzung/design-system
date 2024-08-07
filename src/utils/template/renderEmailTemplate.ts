import Mustache from "mustache";

export type EmailVariable = {
  title: string;
  value: string | undefined;
};

export type EmailVariables<TVariables extends string = string> = Record<
  TVariables,
  EmailVariable
>;

export type EmailVariableValues<TVariables extends string = string> = Record<
  TVariables,
  EmailVariable["value"]
>;

export const renderEmailTemplate = (
  htmlString: string,
  data: EmailVariableValues = {}
) =>
  Mustache.render(
    htmlString,
    Object.fromEntries(
      Object.entries(data).map(([id, variable]) => [id, variable])
    )
  );
