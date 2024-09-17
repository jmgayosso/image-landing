import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from "react";

import ejemplo1 from '../assets/ejemplo1.jpg';
import ejemplo2 from '../assets/ejemplo2.jpg';
import ejemplo3 from '../assets/ejemplo3.jpg';
import ejemplo4 from '../assets/ejemplo4.jpg';
import ejemplo5 from '../assets/ejemplo5.jpg';
import ejemplo6 from '../assets/ejemplo6.jpg';
import ejemplo7 from '../assets/ejemplo7.jpg';

export default function ImageCarousel() {
    const [deviceType, setDeviceType] = useState('desktop');

     // Detectar el tipo de dispositivo basado en el ancho de la ventana
  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width < 464) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    updateDeviceType(); // Llamar la primera vez
    window.addEventListener('resize', updateDeviceType); // Actualizar cuando se redimensione la ventana

    return () => window.removeEventListener('resize', updateDeviceType); // Limpiar el listener
  }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const pictureIdeas = [
        {
            image: ejemplo1,
            description: '1 https://picsum.photos/id/238/200/300'
        },
        {
            image: ejemplo2,
            description: '2 https://picsum.photos/id/237/200/300'
        },
        {
            image: ejemplo3,
            description: '3 https://picsum.photos/id/237/200/300'
        },
        {
            image: ejemplo4,
            description: '4 https://picsum.photos/id/237/200/300'
        },
        {
            image: ejemplo5,
            description: '5 https://picsum.photos/id/237/200/300'
        },
        {
            image: ejemplo6,
            description: '6 https://picsum.photos/id/237/200/300'
        },
        {
            image: ejemplo7,
            description: '7 https://picsum.photos/id/237/200/300'
        },
    ];

    return (
        <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            ssr={true}
            infinite={false}
            autoPlay={true}
            focusOnSelect={false}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all 3s linear"
            transitionDuration={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            pauseOnHover={true}
            rewind={true}
            rewindWithAnimation={true}
        >
            {pictureIdeas.map((idea, index) => (
                <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg overflow-hidden mx-4 "
                >
                    <div className="relative overflow-hidden" style={{height: 400}}>
                        <img
                            src={idea.image}
                            alt={`Card Image ${index}`}
                            className="w-full h-full object-cover transition transform duration-300 ease-in-out hover:scale-110"
                        />
                    </div>
                    <div className="p-4">
                        <p className="text-gray-700 text-sm">{idea.description}</p>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}
