import { useEffect, useRef } from 'react';
import { convertToAsciiMap } from '../utils/helpers';
import { Map } from '../types/globals';

interface MapCanvasProps {
  map: Map;
  fontSize?: string;
}

const MapCanvas = ({ map, fontSize }: MapCanvasProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  let asciiMap;

  if (map) {
    asciiMap = convertToAsciiMap(map);
  }

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [map]);

  return (
    <textarea
      ref={textareaRef}
      className={`${fontSize === 'large' && 'text-lg p-[20px]'} cursor-pointer outline-none whitespace-pre border-none rounded-[5px] p-[10px] resize-none bg-[#1e293b] font-mono overflow-auto text-sm`}
      value={asciiMap}
      readOnly
    />
  );
};

export default MapCanvas;
