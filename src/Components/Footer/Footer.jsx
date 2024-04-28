import "../Footer/Footer.css";

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
            <div className="col-lg-4 col-md-6 mb-5">
              <section>
                <h3 className="widget-title text-center">
                  <i className="bx bx-support"></i> ¡Contactanos!
                </h3>
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
                  <a href="#">Contacto@rcgaming.com.ar</a>
                </p>
              </section>
            </div>
            <div className="col-lg-4 col-md-6 mb-5">
              <section>
                <h3 className="widget-title text-center">Acerca de nosotros</h3>
                <div className="mb-2 text-center">
                  <a href="" className="btn link-footer border rounded-3 p-2">
                    Acerca de nosotros
                  </a>
                </div>
                <div className="text-center">
                  <a href="" className="btn link-footer border rounded-3 p-2">
                    Formulario de contacto
                  </a>
                </div>
              </section>
            </div>
            <div className="col-lg-4 col-md-6 mb-5">
              <section>
                <h3 className="widget-title text-center">
                  <i className="bx bxs-news"></i> Newlester
                </h3>
                <form
                  className="subscribe-form"
                  action="#"
                  method="post"
                  target="_blank"
                  noValidate=""
                >
                  <div className="d-flex"></div>
                  <span className="form-text text-sm text-white opacity-50">
                    Suscribite para recibir ofertas, promociones y novedades de
                    nuestra tienda!
                  </span>
                </form>
              </section>
            </div>

            <div className="col-lg-3 col-md-6"></div>
          </div>
          <hr className="mt-2 margin-bottom-2x" />
          <div className="row">
            <div className="col-md-7 padding-bottom-1x"></div>
            <div className="col-md-5 padding-bottom-1x">
              <div className="margin-top-1x hidden-md-up"></div>
            </div>

            <div className="footer-copyright text-center">
              &copy; RCGames
              <br /> All rights reserved <br /> Powered by Grupo 4 - RollingCode
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
