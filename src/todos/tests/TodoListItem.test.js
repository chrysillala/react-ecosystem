import { expect } from 'chai';
import { getBorderStyleForDate } from '../TodoListItem';

describe('getBorderStyleForDate', () => {
  it('returns none when date is less than five days ago', () => {
    const today = Date.now();
    const recentDate = new Date(Date.now() - 86400000 * 3);

    const expected = 'none';
    const actual = getBorderStyleForDate(recentDate, today);

    console.log('actual:', actual);
    expect(actual).to.equal(expected);
  });

  it('returns a border when date is more than five days ago', () => {
    const today = Date.now();
    const recentDate = new Date(Date.now() - 86400000 * 7);

    const expected = '5px solid red';
    const actual = getBorderStyleForDate(recentDate, today);

    expect(actual).to.equal(expected);
  });
})
