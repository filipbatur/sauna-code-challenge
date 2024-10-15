import { ILetterPosition, Map } from '../types/globals';
import {
  AVAILABLE_CHARACTERS_PATTERN,
  UPPERCASE_LETTERS_PATTERN
} from './patterns';

/**
 * Returns character position if the specified character is unique
 */
export function findUniqueChar(character: string, map: Map) {
  const char = [];

  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] === character) {
        char.push([y, x]);
      }
    }
  }

  if (char.length === 1) {
    return { Success: char[0] };
  } else if (char.length === 0) {
    return { Error: `Error, no ${character} characters found` };
  } else {
    return { Error: `Error, multiple ${character} characters found` };
  }
}

/**
 * Checks if the specified character is valid
 */
export function isValidChar(character: string) {
  return AVAILABLE_CHARACTERS_PATTERN.test(character);
}

/**
 * Checks if the specified character is uppercase
 */
export function isUpperCaseLetter(character: string) {
  return UPPERCASE_LETTERS_PATTERN.test(character);
}

/**
 * Combines characters collected from the map
 */
export function combineChars(letters: ILetterPosition[]) {
  return letters.map((char: ILetterPosition) => char.letter).join('');
}

/**
 * Converts 2d array to Ascii map
 */
export function convertToAsciiMap(map: Map) {
  const result = [];

  for (let i = 0; i < map.length; i++) {
    const formattedRow = map[i].map((cell) => cell || ' ').join('');
    result.push(formattedRow);
  }

  return result.join('\n');
}
