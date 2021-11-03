import { SeasonHelper } from './seasons';

test('getTimeInSeason', () => {
  expect(SeasonHelper.getTimeInSeason(10000)).toBe(10000);
  expect(SeasonHelper.getTimeInSeason(16000)).toBe(1000);
  expect(SeasonHelper.getTimeInSeason(31000)).toBe(1000);
});

test('getCurrentSeason', () => {
  expect(SeasonHelper.getCurrentSeason(10000).name).toBe('winter');
  expect(SeasonHelper.getCurrentSeason(16000).name).toBe('spring');
  expect(SeasonHelper.getCurrentSeason(31000).name).toBe('winter');
});


test('getNextSeason', () => {
  expect(SeasonHelper.getNextSeason(10000).name).toBe('spring');
  expect(SeasonHelper.getNextSeason(16000).name).toBe('winter');
  expect(SeasonHelper.getNextSeason(31000).name).toBe('spring');
});



test('getPrevSeason', () => {
  expect(SeasonHelper.getPreviousSeason(10000).name).toBe('spring');
  expect(SeasonHelper.getPreviousSeason(16000).name).toBe('winter');
  expect(SeasonHelper.getPreviousSeason(31000).name).toBe('spring');
});

