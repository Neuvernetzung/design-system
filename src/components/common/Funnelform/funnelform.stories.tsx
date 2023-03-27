import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Funnelform, useFunnelForm } from "./funnelform";
import { Input, Button, Text } from "../../ui";

export default {
  title: "COMMON/Funnelform",
  component: Funnelform,
  argTypes: {},
} as Meta;

type MyFunnel = {
  name: string;
  city: string;
  employees: number;
};

export const Start = ({ ...args }) => {
  const { control, handleSubmit, funnel } = useFunnelForm<MyFunnel>({
    name: "Test",
  });

  const data = funnel.state;

  return (
    <Funnelform funnel={funnel} handleSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Text>Name: {data?.name}</Text>
        <Text>Stadt: {data?.city}</Text>
        <Text>Mitarbeiter: {data?.employees}</Text>
        <Input control={control} name="name" label="Name" required />
        <div>
          <Button color="primary" type="submit">
            Weiter
          </Button>
        </div>
      </div>
    </Funnelform>
  );
};

export const Mid = ({ ...args }) => {
  const { control, handleSubmit, funnel } = useFunnelForm<MyFunnel>({
    name: "Test",
  });

  const data = funnel.state;

  return (
    <Funnelform handleSubmit={handleSubmit} funnel={funnel}>
      <div className="flex flex-col gap-4">
        <Text>Name: {data?.name}</Text>
        <Text>Stadt: {data?.city}</Text>
        <Text>Mitarbeiter: {data?.employees}</Text>
        <Input control={control} name="city" label="Stadt" required />
        <div className="flex flex-row gap-4">
          <Button>Zurück</Button>
          <Button color="primary" type="submit">
            Weiter
          </Button>
        </div>
      </div>
    </Funnelform>
  );
};

export const Finish = ({ ...args }) => {
  const { control, handleSubmit, funnel } = useFunnelForm<MyFunnel>({
    name: "Test",
  });

  const data = funnel.state;

  const onSubmit = (data: MyFunnel) => {};

  return (
    <Funnelform funnel={funnel} handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <Text>Name: {data?.name}</Text>
        <Text>Stadt: {data?.city}</Text>
        <Text>Mitarbeiter: {data?.employees}</Text>
        <Input
          control={control}
          name="employees"
          label="Mitarbeiteranzahl"
          required
        />
        <div className="flex flex-row gap-4">
          <Button>Zurück</Button>
          <Button color="primary" type="submit">
            Abschicken
          </Button>
        </div>
      </div>
    </Funnelform>
  );
};
