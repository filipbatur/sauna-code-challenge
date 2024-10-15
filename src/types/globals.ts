export interface ILetterPosition {
  letter: string | null;
  position: [number, number];
}

export interface ICurrentCharacter {
  position: [number, number];
  character: string;
  direction: string;
}

export interface ISolution {
  pathCharacters?: string | undefined;
  letters?: string | undefined;
  error?: string | undefined;
}

export type Map = string[][];

export interface IMap {
  name: string;
  map: Map;
}

export interface IExamplesProps {
  exampleMap: Map;
  setExampleMap: React.Dispatch<React.SetStateAction<IMap>>;
  setResults: React.Dispatch<
    React.SetStateAction<ISolution | { error: string } | null>
  >;
}
