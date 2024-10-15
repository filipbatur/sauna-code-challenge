import { Map } from '../types/globals';
import { isValidChar } from './helpers';

export function Path(
  direction: string,
  characterPosition: [number, number],
  map: Map
) {
  const [y, x] = characterPosition;

  // Define position offsets for each direction
  const positionOffsets: { [key: string]: [number, number] } = {
    left: [y, x - 1],
    right: [y, x + 1],
    up: [y - 1, x],
    down: [y + 1, x]
  };

  const oppositeDirection: { [key: string]: string } = {
    left: 'right',
    right: 'left',
    up: 'down',
    down: 'up'
  };

  // Find character at a given position
  function findCharacter(pos: [number, number]) {
    return map[pos[0]]?.[pos[1]];
  }

  // Get valid directions based on the current character
  function getDirectionsToCheck(currentCharacter: string) {
    const excludeDirection = oppositeDirection[direction];

    if (currentCharacter === '+') {
      return Object.keys(positionOffsets).filter(
        (dir) => dir !== direction && dir !== excludeDirection
      );
    }

    return Object.keys(positionOffsets).filter(
      (dir) => dir !== excludeDirection
    );
  }

  // Check multiple directions and return valid ones
  function getValidDirections(directions: string[]) {
    return directions
      .map((dir) => ({
        position: positionOffsets[dir],
        character: findCharacter(positionOffsets[dir]),
        direction: dir
      }))
      .filter(({ character }) => isValidChar(character));
  }

  return {
    /**
     * Follows path in a specified direction
     */
    followPath(): {
      position: [number, number];
      character: string;
      direction: string;
    } | null {
      const pos = positionOffsets[direction];
      const character = findCharacter(pos);

      if (isValidChar(character) && map[y][x] !== '+') {
        return { position: pos, character, direction };
      }
      return null;
    },

    /**
     * Finds and returns new path if available
     */
    findNewPath() {
      const currentCharacter = map[y][x];
      const directionsToCheck = getDirectionsToCheck(currentCharacter);
      const validDirections = getValidDirections(directionsToCheck);

      if (validDirections.length > 1) {
        return {
          error:
            'Multiple valid directions found, unable to determine the path.'
        };
      }

      return validDirections.length === 1
        ? { success: validDirections[0] }
        : null;
    }
  };
}
