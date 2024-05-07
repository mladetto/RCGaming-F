import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Carousels = () => {
    const mobileImages = [
        'https://www.venex.com.ar/fil/banners/banner-previa-hot-600.jpg',
        'https://www.venex.com.ar/fil/banners/banner-descuentos-logi-600x387_web.jpg',
        'https://www.venex.com.ar/fil/banners/8000-628.png',
    ];

    const desktopImages = [
        'https://www.venex.com.ar/fil/banners/banner-previa-hot-1920.jpg',
        'https://www.venex.com.ar/fil/banners/banner-descuentos-logi-1920x504_web.jpg',
        'https://www.venex.com.ar/fil/banners/8000-1920.png',
    ];

    const [index, setIndex] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth <= 768) {
                // Mostrar imágenes para dispositivos móviles
                setImageUrls(mobileImages);
            } else {
                // Mostrar imágenes para dispositivos de escritorio
                setImageUrls(desktopImages);
            }
        };

        // Manejar el cambio de tamaño de la ventana
        window.addEventListener('resize', handleResize);

        // Llamar a handleResize inicialmente
        handleResize();

        // Limpiar el event listener al desmontar el componente
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {imageUrls.map((imageUrl, index) => (
                <Carousel.Item key={index}>
                    <img className='w-100' src={imageUrl} alt="slider" />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default Carousels;

