import { card, event } from './';

export default {
  cardSearch: {
    cards: [
      {
        ...card
      },
    ],
  },
  events: [event],
  loading: false,
  refetch: jest.fn(),
  variables: {
    pagination: {
      'page': 1,
      'perPage': 1
    }
  }
};
