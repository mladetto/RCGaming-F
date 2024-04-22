import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';




const News = () => {
    const [news, setNews] = useState([])

    const API = import.meta.env.VITE_API;

    useEffect(() => {
        getProductsNews();
    }, []);

    async function getProductsNews() {
        try {
            const resp = await axios.get(`${API}/products/news/product`);
            setNews(resp.data);
        } catch (error) {
            throw new Error("Error al obtener los productos destacados" + error.message);
        }
    }

    return (
        <Container>
            <h2>Destacados</h2>
            <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={10}
                loop={true}
                navigation
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                className='swiper-news'
            >
                {news.map((product, index) => (
                    <SwiperSlide key={index} className='swiper-card shadow'>
                        <Link to={`/products/${product._id}`}>
                            <img src={product.imageUrl} alt={product.name} />
                            <h5>{product.name}</h5>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    )
}

export default News;