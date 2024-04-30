import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";




const News = () => {
    const [news, setNews] = useState([])

    const API = import.meta.env.VITE_API;

    useEffect(() => {
        getProductsNews();
    }, []);

    async function getProductsNews() {
        Swal.fire({
            title: "Cargando Productos!",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
        });

        try {
            const resp = await axios.get(`${API}/products/news/product`);
            setNews(resp.data);
            Swal.close();
        } catch (error) {
            throw new Error("Error al obtener los productos destacados" + error.message);
        }
    }

    return (
        <Container>
            <h2 className='pt-5 pb-4 title'>Destacados</h2>
            <hr />
            <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={60}
                loop={true}
                navigation
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 60,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 60,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 60,
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