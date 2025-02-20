import { formatMoney } from "../../../scripts/utils/money.js";

describe('Test suite: formatMoney ( converrts cents into dollars)', () => {
  it('converts cents to dollars', () => {
    expect(formatMoney(2095)).toEqual('20.95');
  });

  it('works with zero', () => {
    expect(formatMoney(0)).toEqual('0.00');
  });

  it('round up to the nearest cent', () => {
    expect(formatMoney(2000.5)).toEqual('20.01');
  });
});

