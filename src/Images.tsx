import { FC, useEffect, useState } from 'react';
import axios from 'axios';

interface ImageData {
  src: string;
  title: string;
  description: string;
}

interface ImagesProps {
  data: ImageData[];
  onClick: (index: number) => void;
}

const Images: FC<ImagesProps> = ({ onClick }) => {
  const [data, setData] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/images', {
          params: { tag: 'manveer' }
        });

        const imageData = response.data.resources.map((img: any) => ({
          src: img.secure_url,
          title: img.public_id.split('/').pop(),
          description: img.context?.custom?.caption || 'Image description',
        }));

        setData(imageData);
      } catch (error) {
        console.error('❌ Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleClickImage = (index: number) => {
    onClick(index);
  };

  return (
    <div className='images-container'>
      {data.map((slide, index) => (
        <div
          onClick={() => handleClickImage(index)}
          key={index}
          className='image'
        >
          <img src={slide.src} alt={slide.description} />
        </div>
      ))}
    </div>
  );
};

export const fetchSlides = async (): Promise<ImageData[]> => {
  try {
    const response = await axios.get('http://localhost:3001/api/images', {
      params: { tag: 'manveer' }
    });

    return response.data.resources.map((img: any) => ({
      src: img.secure_url,
      title: img.public_id.split('/').pop(),
      description: img.context?.custom?.caption || 'Image description',
    }));
  } catch (error) {
    console.error('❌ Error fetching images:', error);
    return [];
  }
};

export default Images;
