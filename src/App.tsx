import { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import {
  Download,
  Fullscreen,
  Thumbnails,
  Zoom,
} from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Images, { fetchSlides } from './Images';

interface ImageData {
  src: string;
  title: string;
  description: string;
}

function App() {
  const [data, setData] = useState<ImageData[]>([]);
  const [index, setIndex] = useState<number>(-1);

  useEffect(() => {
    const loadImages = async () => {
      const slides = await fetchSlides();
      setData(slides);
    };

    loadImages();
  }, []);

  return (
    <>
      <Images
        data={data}
        onClick={(currentIndex) => setIndex(currentIndex)}
      />

      <Lightbox
        plugins={[Download, Fullscreen, Zoom, Thumbnails]}
        thumbnails={{
          showToggle: true,
          border: 0,
          imageFit: 'cover',
          vignette: false,
        }}
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={data.map((slide) => ({
          src: slide.src,
          description: slide.description,
        }))}
      />
    </>
  );
}

export default App;
