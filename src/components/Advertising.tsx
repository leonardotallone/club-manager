import React from 'react';
import { Box } from '@mui/material';

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'


import "../css/index.css"

import Lpf from "../assets/advertising/lpf color-01.png";
import Naldo from "../assets/advertising/naldo color-01.png";
import Nus from "../assets/advertising/nuseed color-01.png";


const Advertising = () => {

    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

    const items = [
        { img: Naldo, title: 'Image 1', url: 'https://www.naldo.com.ar/' },
        { img: Nus, title: 'Image 2', url: 'https://nuseed.com/ar/' },
        { img: Lpf, title: 'Image 3', url: 'https://clinicalpf.com.ar/' },
    ];

    return (

        <Box>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {/* {items.map((item, idx) => (
                        <div className="embla__slide" key={idx}>
                            <img
                                src={item.img}
                                alt={item.title}
                            />
                        </div>
                    ))} */}
                    {items.map((item, idx) => (
                        <div className="embla__slide" key={idx}>
                            <a className="embla__slide a" href={item.url} target="_blank" rel="noopener noreferrer">
                                <img className="embla__slide img" src={item.img} alt={item.title} style={{ cursor: 'pointer' }} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </Box>
    );
};

export default Advertising;
