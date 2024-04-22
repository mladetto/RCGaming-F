import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Container } from 'react-bootstrap';




const News = () => {
    return (
        <Container>
            <h2>outstandings</h2>
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
                <SwiperSlide className='swiper-card'>Slide 1</SwiperSlide>
                <SwiperSlide className='swiper-card'>Slide 2</SwiperSlide>
                <SwiperSlide className='swiper-card'>Slide 3</SwiperSlide>
                <SwiperSlide className='swiper-card'>Slide 3</SwiperSlide>
                <SwiperSlide className='swiper-card'>Slide 3</SwiperSlide>
                <SwiperSlide className='swiper-card'>Slide 3</SwiperSlide>
                <SwiperSlide className='swiper-card'>Slide 3</SwiperSlide>
                <SwiperSlide className='swiper-card'>Slide 3</SwiperSlide>
                <SwiperSlide className='swiper-card'>Slide 3</SwiperSlide>

            </Swiper>
        </Container>
    )
}

export default News;