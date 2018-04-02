import cardFragment from '../card_fragment';

describe('Card fragment', () => {
  it('match snapshot', () => {
    expect(cardFragment).toMatchSnapshot();
  });
});
