import { IMap, ISolution } from '../types/globals';
import { initializeSearch } from '../utils/initializer';
import MapCanvas from './MapCanvas';

interface MapProps {
  exampleMap: IMap;
  results: ISolution | null;
  setResults: React.Dispatch<React.SetStateAction<ISolution | null>>;
}

const Map = ({ exampleMap, results, setResults }: MapProps) => {
  const handleMapCheck = () => {
    const search = initializeSearch(exampleMap.map);
    setResults(search ?? null);
    console.log(search);
  };

  return (
    <div className='w-full p-[1rem] text-left ml-4'>
      <span className='text-[#38bdf8] text-sm font-semibold'>Current map</span>
      <h1 className='text-3xl font-bold'>
        {exampleMap?.name ?? 'No map selected'}
      </h1>
      <div className='flex gap-8 items-start mt-8'>
        <MapCanvas map={exampleMap?.map} fontSize='large' />
        <div>
          <p>
            <b>Path: </b>
            {results?.pathCharacters}
          </p>
          <p>
            <b>Unique letters: </b>
            {results?.letters}{' '}
          </p>
          <p>
            <b>Error: </b>
            {results?.error}
          </p>
          <button
            onClick={handleMapCheck}
            className='text-white bg-[#0ea5e9] mt-4 text-sm'
          >
            Check map
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
