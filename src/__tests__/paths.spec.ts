import { Path } from '../utils/paths';

describe('Paths', () => {
  it('should find new path direction', () => {
    const direction = '';
    const startPosition = [0, 0] as [number, number];
    const map = [
      ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
      ['', '', '', '', '', '', '', '', '|'],
      ['x', '-', 'B', '-', '+', '', '', '', 'C'],
      ['', '', '', '', '|', '', '', '', '|'],
      ['', '', '', '', '+', '-', '-', '-', '+']
    ];
    const path = Path(direction, startPosition, map);
    expect(path.findNewPath()).toEqual({
      success: {
        character: '-',
        direction: 'right',
        position: [0, 1]
      }
    });
  });

  it('should return error if multiple valid directions are found', () => {
    const direction = '';
    const startPosition = [2, 7] as [number, number];
    const map = [
      ['', '', '', '', '', '', '-', 'B'],
      ['', '', '', '', '', '', '', '|'],
      ['@', '-', '-', 'A', '-', '-', '-', '+'],
      ['', '', '', '', '', '', '', '|'],
      ['', '', 'x', '+', '', '', '', 'C'],
      ['', '', '', '|', '', '', '', '|'],
      ['', '', '', '+', '-', '-', '-', '+']
    ];
    const path = Path(direction, startPosition, map);
    expect(path.findNewPath()).toEqual({
      error: 'Multiple valid directions found, unable to determine the path.'
    });
  });

  it('should find next character in specified path direction', () => {
    const direction = 'right';
    const startPosition = [0, 3] as [number, number];
    const map = [
      ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
      ['', '', '', '', '', '', '', '', '|'],
      ['x', '-', 'B', '-', '+', '', '', '', 'C'],
      ['', '', '', '', '|', '', '', '', '|'],
      ['', '', '', '', '+', '-', '-', '-', '+']
    ];
    const path = Path(direction, startPosition, map);
    expect(path.followPath()).toEqual({
      character: 'A',
      direction: 'right',
      position: [0, 4]
    });
  });

  it('should exit if no new paths are available', () => {
    const direction = 'left';
    const startPosition = [2, 0] as [number, number];
    const map = [
      ['@', '-', '-', '-', 'A', '-', '-', '-', '+'],
      ['', '', '', '', '', '', '', '', '|'],
      ['x', '-', 'B', '-', '+', '', '', '', 'C'],
      ['', '', '', '', '|', '', '', '', '|'],
      ['', '', '', '', '+', '-', '-', '-', '+']
    ];
    const path = Path(direction, startPosition, map);
    expect(path.followPath()).toEqual(null);
  });
});
