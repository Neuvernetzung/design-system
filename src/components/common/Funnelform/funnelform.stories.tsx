import { Funnelform, useFunnelForm } from "./funnelform";
import { Input, Button, Text } from "../../ui";

export default {
  title: "COMMON/Funnelform",
  component: Funnelform,
};

type MyFunnel = {
  name: string;
  city: string;
  employees: number;
};

export const Start = {
  render: ({ ...args }) => {
    const { control, handleSubmit, funnel } = useFunnelForm<MyFunnel>({
      name: "Test",
    });

    const data = funnel.state;

    return (
      <Funnelform funnel={funnel} handleSubmit={handleSubmit} {...args}>
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
  },
};

export const Mid = {
  render: ({ ...args }) => {
    const { control, handleSubmit, funnel } = useFunnelForm<MyFunnel>({
      name: "Test",
    });

    const data = funnel.state;

    return (
      <Funnelform handleSubmit={handleSubmit} funnel={funnel} {...args}>
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
  },
};

export const Finish = {
  render: ({ ...args }) => {
    const { control, handleSubmit, funnel } = useFunnelForm<MyFunnel>({
      name: "Test",
    });

    const data = funnel.state;

    const onSubmit = (data: MyFunnel) => {
      console.log(data);
    };

    return (
      <Funnelform
        funnel={funnel}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        {...args}
      >
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
  },
};
