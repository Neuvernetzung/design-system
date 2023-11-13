import { Meta } from "@storybook/react";
import { useState } from "react";

import { Button, Modal, Text } from "../../ui";
import { Pagination } from ".";

export default {
  title: "COMMON/Pagination",
  component: Pagination,
  argTypes: {},
} as Meta;

export const Default = ({ ...args }) => <Pagination result={10000} {...args} />;

export const WithState = ({ ...args }) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  return (
    <div>
      <Modal
        open
        setOpen={() => null}
        content={
          <div>
            Seite: {page}, Limit: {limit}
            <Pagination
              activePage={page}
              setActivePage={setPage}
              limit={limit}
              setLimit={setLimit}
              result={10000}
              {...args}
            />
          </div>
        }
      />
    </div>
  );
};

export const WithoutLimit = ({ ...args }) => (
  <Pagination selectLimit={false} result={10000} {...args} />
);

export const Minimalistic = ({ ...args }) => (
  <Pagination
    selectLimit={false}
    variant="minimalistic"
    result={10000}
    {...args}
  />
);

export const Multiple = ({ ...args }) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [limit, setLimit] = useState<number>();

  return (
    <div className="flex flex-col gap-12">
      <div className="w-full flex justify-end">
        <Pagination selectLimit={false} result={10000} {...args} />
      </div>
      <Pagination result={10000} {...args} />
      <hr />
      <Text>Andere Pagination - Seite: {activePage}</Text>
      <div className="w-full flex justify-end">
        <Pagination
          selectLimit={false}
          limit={limit}
          setLimit={setLimit}
          activePage={activePage}
          setActivePage={setActivePage}
          result={10000}
          {...args}
        />
      </div>

      <Pagination
        activePage={activePage}
        setActivePage={setActivePage}
        limit={limit}
        setLimit={setLimit}
        result={10000}
        {...args}
      />
    </div>
  );
};

export const ToLastPage = ({ ...args }) => {
  const [result, setResult] = useState(50);

  return (
    <div>
      <Button onClick={() => setResult(50)}>50</Button>
      <Button onClick={() => setResult(100)}>100</Button>
      <Pagination result={result} {...args} />
    </div>
  );
};
