import { SeasonHelper } from './seasons';

test('getTimeInSeason', () => {
  expect(SeasonHelper.getTimeInSeason(10000)).toBe(10000);
  expect(SeasonHelper.getTimeInSeason(22000)).toBe(2000);
  expect(SeasonHelper.getTimeInSeason(52000)).toBe(2000);
});

test('getCurrentSeason', () => {
  expect(SeasonHelper.getCurrentSeason(10000).name).toBe('winter');
  expect(SeasonHelper.getCurrentSeason(22000).name).toBe('spring');
  expect(SeasonHelper.getCurrentSeason(52000).name).toBe('winter');
});
