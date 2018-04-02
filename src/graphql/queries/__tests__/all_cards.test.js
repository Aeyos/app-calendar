import allCardsQuery from '../all_cards';

describe('All cards query', () => {
  it('match snapshot', () => {
    expect(allCardsQuery).toMatchSnapshot();
  });
});
