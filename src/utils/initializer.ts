import { Path } from './paths';
import { combineChars, findUniqueChar, isUpperCaseLetter } from './helpers';
import {
  ICurrentCharacter,
  ISolution,
  ILetterPosition,
  Map
} from '../types/globals';

export function initializeSearch(exampleMap: Map) {
  const solution: ISolution = {
    pathCharacters: '',
    letters: ''
  };

  let current: ICurrentCharacter = {
    position: [-1, -1],
    character: '',
    direction: ''
  };
  const uppercaseLetters: ILetterPosition[] = [];

  const start = findUniqueChar('@', exampleMap);
  const end = findUniqueChar('x', exampleMap);

  // Validate start and end characters
  if (!start.Success || !end.Success) {
    return {
      error: start.Error || end.Error
    };
  }

  // Initialize starting position
  current.position = start.Success as [number, number];
  solution.pathCharacters = '@';

  // Find initial direction
  let path = Path(current.direction, current.position, exampleMap);
  const initialMove = path.findNewPath();
  if (initialMove?.success) {
    current.direction = initialMove.success.direction;
  }

  while (current.position && current.direction) {
    path = Path(current.direction, current.position, exampleMap);
    const nextMove = path.followPath();

    if (!nextMove?.character) {
      const newMove = path.findNewPath();
      if (newMove?.success) {
        current = newMove.success;
      } else {
        return { error: newMove?.error || 'Error: No further paths available' };
      }
    } else {
      current = nextMove;
    }

    solution.pathCharacters += current.character;

    // If we reached the end 'x', finish the search
    if (current.character === 'x') {
      solution.letters = combineChars(uppercaseLetters);
      return solution;
    }

    // Collect uppercase letters
    if (isUpperCaseLetter(current.character)) {
      const alreadyAdded = uppercaseLetters.some(
        ({ position }) =>
          position[0] === current.position[0] &&
          position[1] === current.position[1]
      );
      if (!alreadyAdded) {
        uppercaseLetters.push({
          letter: current.character,
          position: current.position
        });
      }
    }
  }
}
