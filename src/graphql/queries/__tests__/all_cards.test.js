import cardSearchQuery from '../card_search';

describe('Card Search query', () => {
  it('match snapshot', () => {
    expect(cardSearchQuery).toMatchSnapshot();
  });
});
