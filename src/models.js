// @flow

export type Card = {
  id: string,
  due_date: string,
  suid: string,
  title: string,
  suid: string
};

export type Pipefy = {
  locale: string,
  openCard: (id: string) => void,
  showNotification: (message: string, type: string) => void,
  organizationId: number,
  app: {pipeId: number}
};

export type Filter = {
  operator: 'and' | 'or',
  queries: [
    {
      field: string,
      value: string,
      operator: string,
      type: string,
    },
    {
      field: string,
      value: string,
      operator: string,
      type: string,
    },
  ],
};
