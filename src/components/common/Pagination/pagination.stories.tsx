import { Meta } from "@storybook/react";
import { useState } from "react";

import { Button, Modal, Text } from "../../ui";
import { Pagination, usePagination, useUrlPagination } from ".";

export default {
  title: "COMMON/Pagination",
  component: Pagination,
  argTypes: {},
} as Meta;

export const Default = ({ ...args }) => {
  const paginationProps = usePagination();

  return <Pagination result={10000} {...paginationProps} {...args} />;
};

export const WithUrlState = ({ ...args }) => {
  const paginationUrlProps = useUrlPagination();

  return (
    <div>
      <Modal
        open
        setOpen={() => null}
        content={
          <div>
            Seite: {paginationUrlProps.page}, Limit: {paginationUrlProps.limit}
            <Pagination {...paginationUrlProps} result={10000} {...args} />
          </div>
        }
      />
    </div>
  );
};

export const WithoutLimit = ({ ...args }) => {
  const paginationProps = usePagination();

  return (
    <Pagination
      selectLimit={false}
      result={10000}
      {...paginationProps}
      {...args}
    />
  );
};

export const DifferentLimits = ({ ...args }) => {
  const paginationProps = usePagination({ defaultLimit: 12 });

  return (
    <Pagination
      limits={[12, 24, 36]}
      result={10000}
      {...paginationProps}
      {...args}
    />
  );
};

export const Minimalistic = ({ ...args }) => {
  const paginationProps = usePagination();

  return (
    <Pagination
      selectLimit={false}
      variant="minimalistic"
      result={10000}
      {...paginationProps}
      {...args}
    />
  );
};

export const Multiple = ({ ...args }) => {
  const paginationProps = usePagination();
  const paginationUrlProps = useUrlPagination();

  return (
    <div className="flex flex-col gap-12">
      <div className="w-full flex justify-end">
        <Pagination
          selectLimit={false}
          result={10000}
          {...paginationUrlProps}
          {...args}
        />
      </div>
      <Pagination result={10000} {...paginationUrlProps} {...args} />
      <hr />
      <Text>Andere Pagination - Seite: {paginationProps.page}</Text>
      <div className="w-full flex justify-end">
        <Pagination
          selectLimit={false}
          {...paginationProps}
          result={10000}
          {...args}
        />
      </div>

      <Pagination {...paginationProps} result={10000} {...args} />
    </div>
  );
};

export const ToLastPage = ({ ...args }) => {
  const [result, setResult] = useState<number>(50);
  const paginationProps = usePagination();

  return (
    <div>
      Seite <Text>{paginationProps.page}</Text>
      <Button onClick={() => setResult(0)}>0</Button>
      <Button onClick={() => setResult(50)}>50</Button>
      <Button onClick={() => setResult(100)}>100</Button>
      <Pagination result={result} {...paginationProps} {...args} />
    </div>
  );
};
