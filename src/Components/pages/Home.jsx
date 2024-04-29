import { Container } from "react-bootstrap";
import Carousels from "../sections/Carousel";
import Categories from "../sections/Categories";
import News from "../sections/News";


const Home = () => {


    return (
        <div>
            <Carousels />
            <Container>
                <News />
                <div className="d-flex justify-content-center mb-5">
                    <img src="https://www.venex.com.ar/fil/banners/armadorpclargo.jpg" className="img-fluid" alt="banner" />
                </div>
                <Categories />
            </Container>
        </div>
    )
}


export default Home;