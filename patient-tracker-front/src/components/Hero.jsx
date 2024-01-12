import { Link } from 'react-router-dom';

import hero1 from '../assets/stockphoto-1.jpeg';
import hero2 from '../assets/stockphoto-2.jpeg';
import hero3 from '../assets/stockphoto-3.jpeg';
import hero4 from '../assets/stockphoto-1.jpeg';

const carouselImages = [hero1, hero2, hero3];

const Hero = () => {
  return (
    <div className='grid lg:grid-cols-2 gap-24 items-center'>
      <div>
        <h1 className='max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl'>
         Welcome to our Patient Tracker Portal
        </h1>
        <p className='mt-8 max-w-xl text-lg leading-8'>
        Revolutionize your healthcare practice with our patient tracker system. Effortlessly manage patient information, streamline appointments, and gain insights for personalized care. Experience a comprehensive solution that enhances efficiency and ensures top-notch patient experiences.
        </p>
      </div>
      <div className='hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box '>
        {carouselImages.map((image) => {
          return (
            <div key={image} className='carousel-item'>
              <img
                src={image}
                className='rounded-box h-full w-80 object-cover'
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Hero;