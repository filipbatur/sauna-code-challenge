import { convertToAsciiMap, findUniqueChar } from '../utils/helpers';
import { maps } from '../utils/maps';

describe('Helpers', () => {
  it('should find unique character', () => {
    const input = [
      ['', '', '', '', '', '+', '-', 'O', '-', 'N', '-', '+'],
      ['', '', '', '', '', '|', '', '', '', '', '', '|'],
      ['', '', '', '', '', '|', '', '', '', '+', '-', 'I', '-', '+'],
      ['', '@', '-', 'G', '-', 'O', '-', '+', '', '|', '', '|', '', '|'],
      ['', '', '', '', '', '|', '', '|', '', '+', '-', '+', '', 'E'],
      ['', '', '', '', '', '+', '-', '+', '', '', '', '', '', 'S'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', '|'],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', 'x']
    ];
    expect(findUniqueChar('@', input)).toEqual({ Success: [3, 1] });
  });

  it('should return error if no specified characters found', () => {
    const input = [
      ['', '', '', '', '', '-', 'A', '-', '-', '-', '+'],
      ['', '', '', '', '', '', '', '', '', '', '|'],
      ['', '', 'x', '-', 'B', '-', '+', '', '', '', 'C'],
      ['', '', '', '', '', '', '|', '', '', '', '|'],
      ['', '', '', '', '', '', '+', '-', '-', '-', '+']
    ];
    expect(findUniqueChar('@', input)).toEqual({
      Error: 'Error, no @ characters found'
    });
  });

  it('should return error if no specified characters found', () => {
    const input = [
      ['', '', '', '@', '-', '-', 'A', '-', '@', '-', '+'],
      ['', '', '', '', '', '', '', '', '', '', '|'],
      ['', '', 'x', '-', 'B', '-', '+', '', '', '', 'C'],
      ['', '', '', '', '', '', '|', '', '', '', '|'],
      ['', '', '', '', '', '', '+', '-', '-', '-', '+']
    ];
    expect(findUniqueChar('@', input)).toEqual({
      Error: 'Error, multiple @ characters found'
    });
  });

  it('should convert 2d array to ascii map', () => {
    const arr = `
@---A---+
        |
x-B-+   C
    |   |
    +---+`.trim();
    expect(convertToAsciiMap(maps[0].map)).toEqual(arr);
  });
});
