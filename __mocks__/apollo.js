import { card, event } from './';

export default {
  allCards: {
    edges: [
      {
        node: { ...card },
      },
    ],
  },
  events: [event],
  loading: false,
  refetch: jest.fn(),
};
