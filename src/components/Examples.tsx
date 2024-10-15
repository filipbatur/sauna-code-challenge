import MapCanvas from './MapCanvas';
import { maps } from '../utils/maps';
import { IMap, ISolution, Map } from '../types/globals';

export interface ExamplesProps {
  exampleMap: Map;
  setExampleMap: React.Dispatch<React.SetStateAction<IMap>>;
  setResults: React.Dispatch<React.SetStateAction<ISolution | null>>;
}

const Examples = ({ exampleMap, setExampleMap, setResults }: ExamplesProps) => {
  const ExampleMaps = () => {
    return maps.map((item) => (
      <button
        key={item.name}
        className={`${exampleMap === item.map && 'border-blue-500 border-1'} bg-[#1e293b] p-0`}
        onClick={() => {
          setResults(null);
          setExampleMap(item);
        }}
      >
        <div className='border-b-[#7dd3fc] border-b-[1px] p-2 text-sm text-left text-[#7dd3fc]'>
          {item.name}
        </div>
        <MapCanvas map={item.map} />
      </button>
    ));
  };

  return (
    <div className='flex flex-col gap-[2rem] min-w-[250px] max-w-[250px] h-[100vh] overflow-y-scroll p-[1rem]'>
      {ExampleMaps()}
    </div>
  );
};

export default Examples;
