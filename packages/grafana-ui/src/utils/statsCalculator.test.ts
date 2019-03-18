import { parseCSV } from './processTableData';
import { getStatsCalculators, StatID, calculateStats } from './statsCalculator';

import _ from 'lodash';

describe('Stats Calculators', () => {
  const basicTable = parseCSV('a,b,c\n10,20,30\n20,30,40');

  it('should load all standard stats', () => {
    const names = [
      StatID.sum,
      StatID.max,
      StatID.min,
      StatID.logmin,
      StatID.mean,
      StatID.last,
      StatID.first,
      StatID.count,
      StatID.range,
      StatID.diff,
      StatID.step,
      StatID.delta,
      // StatID.allIsZero,
      // StatID.allIsNull,
    ];
    const stats = getStatsCalculators(names);
    expect(stats.length).toBe(names.length);
  });

  it('should fail to load unknown stats', () => {
    const names = ['not a stat', StatID.max, StatID.min, 'also not a stat'];
    const stats = getStatsCalculators(names);
    expect(stats.length).toBe(2);

    const found = stats.map(v => v.value);
    const notFound = _.difference(names, found);
    expect(notFound.length).toBe(2);

    expect(notFound[0]).toBe('not a stat');
  });

  it('should calculate stats', () => {
    const stats = calculateStats({
      data: basicTable,
      columnIndex: 0,
      stats: ['first', 'last', 'mean'],
    });

    // First
    expect(stats.first).toEqual(10);

    // Last
    expect(stats.last).toEqual(20);

    // Mean
    expect(stats.mean).toEqual(15);
  });

  it('should support a single stat also', () => {
    const stats = calculateStats({
      data: basicTable,
      columnIndex: 0,
      stats: ['first', 'last', 'mean'],
    });

    // First
    expect(stats.first).toEqual(10);

    // Last
    expect(stats.last).toEqual(20);

    // Mean
    expect(stats.mean).toEqual(15);
  });
});
