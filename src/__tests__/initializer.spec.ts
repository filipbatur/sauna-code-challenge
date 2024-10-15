import { initializeSearch } from '../utils/initializer';

describe('Initialize search', () => {
  it('should go straight through intersections', () => {
    const input = [
      ['@'],
      ['|', '', '+', '-', 'C', '-', '-', '+'],
      ['A', '', '|', '', '', '', '', '|'],
      ['+', '-', '-', '-', 'B', '-', '-', '+'],
      ['', '', '|', '', '', '', '', '', '', 'x'],
      ['', '', '|', '', '', '', '', '', '', '|'],
      ['', '', '+', '-', '-', '-', 'D', '-', '-', '+']
    ];
    expect(initializeSearch(input)).toEqual({
      letters: 'ABCD',
      pathCharacters: '@|A+---B--+|+--C-+|-||+---D--+|x'
    });
  });

  it('should not collect a letter from the same location twice', () => {
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
    expect(initializeSearch(input)).toEqual({
      letters: 'GOONIES',
      pathCharacters: '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x'
    });
  });

  it('should keep direction in compact space', () => {
    const input = [
      ['', '+', '-', 'L', '-', '+'],
      ['', '|', '', '', '+', 'A', '-', '+'],
      ['@', 'B', '+', '', '+', '+', '', 'H'],
      ['', '+', '+', '', '', '', '', 'x']
    ];
    expect(initializeSearch(input)).toEqual({
      letters: 'BLAH',
      pathCharacters: '@B+++B|+-L-+A+++A-+Hx'
    });
  });

  it('should ignore stuff after end of the path', () => {
    const input = [
      ['', '', '@', '-', 'A', '-', '-', '+'],
      ['', '', '', '', '', '', '', '|'],
      ['', '', '', '', '', '', '', '+', '-', 'B', '-', '-', 'x', '-', 'C', '-', '-', 'D']
    ];
    expect(initializeSearch(input)).toEqual({
      letters: 'AB',
      pathCharacters: '@-A--+|+-B--x'
    });
  });

  it('should return error if missing start character', () => {
    const input = [
      ['', '', '', '', '', '-', 'A', '-', '-', '-', '+'],
      ['', '', '', '', '', '', '', '', '', '', '|'],
      ['', '', 'x', '-', 'B', '-', '+', '', '', '', 'C'],
      ['', '', '', '', '', '', '|', '', '', '', '|'],
      ['', '', '', '', '', '', '+', '-', '-', '-', '+']
    ];
    expect(initializeSearch(input)).toEqual({
      error: 'Error, no @ characters found'
    });
  });

  it('should return error if missing end character', () => {
    const input = [
      ['', '', '', '@', '-', '-', 'A', '-', '-', '-', '+'],
      ['', '', '', '', '', '', '', '', '', '', '|'],
      ['', '', '', '', 'B', '-', '+', '', '', '', 'C'],
      ['', '', '', '', '', '', '|', '', '', '', '|'],
      ['', '', '', '', '', '', '+', '-', '-', '-', '+']
    ];
    expect(initializeSearch(input)).toEqual({
      error: 'Error, no x characters found'
    });
  });

  it('should return error if multiple starts found', () => {
    const input = [
      ['', '', '', '@', '-', '-', 'A', '-', '@', '-', '+'],
      ['', '', '', '', '', '', '', '', '', '', '|'],
      ['', '', 'x', '-', 'B', '-', '+', '', '', '', 'C'],
      ['', '', '', '', '', '', '|', '', '', '', '|'],
      ['', '', '', '', '', '', '+', '-', '-', '-', '+']
    ];
    expect(initializeSearch(input)).toEqual({
      error: 'Error, multiple @ characters found'
    });
  });

  it('should return error if fork found', () => {
    const input = [
      ['', '', '', '', '', '', '-', 'B'],
      ['', '', '', '', '', '', '', '|'],
      ['@', '-', '-', 'A', '-', '-', '-', '+'],
      ['', '', '', '', '', '', '', '|'],
      ['', '', 'x', '+', '', '', '', 'C'],
      ['', '', '', '|', '', '', '', '|'],
      ['', '', '', '+', '-', '-', '-', '+']
    ];
    expect(initializeSearch(input)).toEqual({
      error: 'Multiple valid directions found, unable to determine the path.'
    });
  });

  it('should return error if path is broken', () => {
    const input = [
      ['@', '-', '-', 'A', '-', '+', '', ''],
      ['', '', '', '', '', '|', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', 'B', '-', 'x']
    ];
    expect(initializeSearch(input)).toEqual({
      error: 'Error: No further paths available'
    });
  });

  it('should return error if multiple starting paths found', () => {
    const input = [['', 'x', '-', 'B', '-', '@', '-', 'A', '-', 'x', '']];
    expect(initializeSearch(input)).toEqual({
      error: 'Error, multiple x characters found'
    });
  });

  it('should return error if fake turn is found', () => {
    const input = [['', '@', '-', 'A', '-', '+', '-', 'B', '-', 'x', '']];
    expect(initializeSearch(input)).toEqual({
      error: 'Error: No further paths available'
    });
  });
});
