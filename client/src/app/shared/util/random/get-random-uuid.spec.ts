import { getRandomUUID } from './get-random-uuid';

describe('function getRandomUUID', () => {
  test('should return an UUID', () => {
    const result = getRandomUUID();
    expect(result.length).toEqual(36);
  });
});
