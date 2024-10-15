import { useState } from 'react';
import { maps } from './utils/maps';
import Map from './components/Map';
import Examples from './components/Examples';
import { ISolution } from './types/globals';

function App() {
  const [exampleMap, setExampleMap] = useState(maps[0]);
  const [results, setResults] = useState<ISolution | null>(null);

  return (
    <div className='flex flex-row w-full'>
      <Examples
        exampleMap={exampleMap.map}
        setExampleMap={setExampleMap}
        setResults={setResults}
      />
      <Map exampleMap={exampleMap} results={results} setResults={setResults} />
    </div>
  );
}

export default App;
