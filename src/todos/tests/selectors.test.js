import { expect } from 'chai';
import { getCompletedTodos } from '../selectors';

describe('The getCompletedTodos selector', () => {
  it('returns only completed todos', () => {
    const fakeTodos = [
      {
        text: 'say hello',
        isCompleted: true
      },
      {
        text: 'say goodbye',
        isCompleted: false
      },
      {
        text: 'climb mount everest',
        isCompleted: false
      }
    ];
    const expected = [
      {
        text: 'say hello',
        isCompleted: true
      },
    ];
    const actual = getCompletedTodos.resultFunc(fakeTodos);

    expect(actual).to.deep.equal(expected);
  });
});
