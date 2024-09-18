
import { useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ejemplo1 from '../assets/ejemplo1.jpg';
import ejemplo2 from '../assets/ejemplo2.jpg';
import ejemplo3 from '../assets/ejemplo3.jpg';
import ejemplo4 from '../assets/ejemplo4.jpg';
import ejemplo5 from '../assets/ejemplo5.jpg';
import ejemplo6 from '../assets/ejemplo6.jpg';
import ejemplo7 from '../assets/ejemplo7.jpg';

export default function ImageCarousel() {
    const [deviceType, setDeviceType] = useState('desktop');

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 1900,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false
            }
          }
        ]
      };

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

    const pictureIdeas = [
        {
            image: ejemplo1,
            description: 'Magnate'
        },
        {
            image: ejemplo2,
            description: 'Princesa'
        },
        {
            image: ejemplo3,
            description: 'Jinete'
        },
        // {
        //     image: ejemplo4,
        //     description: 'Dios Griego'
        // },
        {
            image: ejemplo5,
            description: 'Dios Griego'
        },
        {
            image: ejemplo6,
            description: 'Telettubbie'
        },
        {
            image: ejemplo7,
            description: 'Soldado Romano'
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <Slider {...settings} className="instagram-carousel">
                {pictureIdeas.map((idea, index) => (
                    <div key={index} className='px-2'>
                        <div
                            className="bg-white rounded-lg shadow-lg overflow-hidden h-[400px] flex flex-col"
                        >
                            <div className="h-80 overflow-hidden">
                                <img
                                    src={idea.image}
                                    alt={`Card Image ${index}`}
                                    className="w-full h-full object-cover transition transform duration-300 ease-in-out hover:scale-110"
                                />
                            </div>
                            <div className="p-4 flex justify-center">
                                <p className="text-gray md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">{idea.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            {/* </Carousel> */}
            </Slider>
        </div>
    );
}
