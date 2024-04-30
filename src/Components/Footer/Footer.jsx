import "../Footer/Footer.css";
import qr from "../../assets/qr.png";
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
const Footer = () => {
  return (
    <>
      <div className="footer site-footer">
        <h2 className="h2 text-center text-light mb-5 titleFooter">
          {" "}
          RCGames - Tenemos los mejores precios para vos!{" "}
        </h2>
        <hr className="text-light" />
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-3 mb-md-0 text-center">
              <section>
                <h4 className="titlePage text-light py-3">RCGames</h4>
                <div className="text-center">
                  <img src={qr} alt="codigo qr" className="w-50" />
                </div>
              </section>
            </div>
            <div className="col-lg-4 col-md-6 mb-3 mb-md-0">
              <section>
                <h3 className="widget-title text-center">
                  <i className="bx bx-support"></i> ¡Contactanos!
                </h3>
                <div className="text-center mb-3">
                  <Link to="/">
                    <FaFacebookSquare className="icons mx-3 face" />
                  </Link>
                  <Link to="/">
                    <FaTwitterSquare className="icons mx-3 twitter" />
                  </Link>
                  <Link to="/">
                    <FaSquareWhatsapp className="icons mx-3 wp" />
                  </Link>
                </div>
                <p className="text-white text-center">
                  Gral Paz 570 - S.M de Tucuman
                </p>
                <p className="text-white text-center">Telefono: 0381 xxx-xxx</p>
                <ul className="list-unstyled text-sm text-white text-center">
                  <li>
                    <span className="opacity-50">Nuestros horarios: </span>
                  </li>
                  <li>
                    <span className="opacity-50">Lunes a Viernes: </span>09.00
                    am - 18.00 pm
                  </li>
                  <li>
                    <span className="opacity-50">Sabado: </span>09.00 am - 13.00
                    pm
                  </li>
                </ul>
                <p className="text-center">
                  <a href="#">rcgaming.24@outlook.com</a>
                </p>-
              </section>
            </div>
            <div className="col-lg-4 col-md-6 mb-3 mb-md-0">
              <section>
                <h3 className="widget-title text-center">Acerca de nosotros</h3>
                <div className="mb-2 text-center">
                  <Link
                    to={"/"}
                    className="btn link-footer border rounded-3 p-2 text-light"
                  >
                    Acerca de nosotros
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    to={"/Contact"}
                    className="btn link-footer border rounded-3 p-2 text-light"
                  >
                    Formulario de contacto
                  </Link>
                </div>
              </section>
            </div>
            <div className="col-lg-3 col-md-6"></div>
          </div>
          <hr className="mt-2 mt-md-0 margin-bottom-2x" />
          <div className="row">
            <div className="col-md-7 padding-bottom-1x"></div>
            <div className="col-md-5 padding-bottom-1x">
              <div className="margin-top-1x hidden-md-up"></div>
            </div>
            <div className="footer-copyright text-center">
              &copy; RCGames All rights reserved Powered by Grupo 4 - RollingCode
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
