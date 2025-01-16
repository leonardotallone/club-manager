import React, { useState, useEffect } from 'react';
import { Box, CardMedia } from '@mui/material';

import Lpf from "../assets/advertising/lpf color-01.png";
import Naldo from "../assets/advertising/naldo color-01.png";
import Nus from "../assets/advertising/nuseed color-01.png";

const Advertising = () => {
    const items = [
        { img: Naldo, title: 'Image 1' },
        { img: Nus, title: 'Image 2' },
        { img: Lpf, title: 'Image 3' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true); // Controla el efecto de fade

    useEffect(() => {
        // Activa el fade-out y cambia la imagen
        const timer = setTimeout(() => {
            setFade(false); // Inicia fade-out
        }, 3500); // Fade-out comienza justo antes de cambiar la imagen

        const transition = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length); // Cambia la imagen
            setFade(true); // Activa fade-in
        }, 4000); // Cambia la imagen después de 4 segundos

        return () => {
            clearTimeout(timer);
            clearTimeout(transition);
        };
    }, [currentIndex, items.length]);

    return (
        <Box
            sx={{
        
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: 85,
                backgroundColor: 'rgba(255, 255, 255, 0.75)', // Fondo blanco con transparencia
                overflow: 'hidden', // Evita el desbordamiento de las imágenes
                position: 'relative', // Para manejar posicionamiento absoluto
            }}
        >
            <CardMedia
                component="img"
                src={items[currentIndex].img}
                alt={items[currentIndex].title}
                sx={{
                    position: 'absolute', // Superpone las imágenes
                    width: 'auto',
                    height: 85,
                    transition: 'opacity 1s ease-in-out', // Suaviza la transición
                    opacity: fade ? 1 : 0, // Controla la opacidad para fade-in / fade-out
                }}
            />
        </Box>
    );
};

export default Advertising;
