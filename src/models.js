// @flow

export type Card = {
  id: string,
  due_date: string,
  suid: string,
  title: string,
};

export type Pipefy = {
  locale: string,
  openCard: (id: string) => void,
  showNotification: (message: string, type: string) => void,
};
