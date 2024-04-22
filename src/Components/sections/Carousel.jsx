import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Carousels = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img className='w-100' src="https://imagenes.compragamer.com/bannerPrincipal/DC_20240319101712_ec2X7rID.jpg" alt="slider" />
            </Carousel.Item>
            <Carousel.Item>
                <img className='w-100' src="https://imagenes.compragamer.com/bannerPrincipal/DC_20240320155056_tY0FXeqr.jpg" alt="slider" />
            </Carousel.Item>
            <Carousel.Item>
                <img className='w-100' src="https://imagenes.compragamer.com/bannerPrincipal/DC_20240226173336_sXaQBTXv.jpg" alt="slider" />
            </Carousel.Item>
        </Carousel>
    );
}

export default Carousels;

