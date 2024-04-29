import { FaUsers } from "react-icons/fa6";
import { SiPcgamingwiki } from "react-icons/si";
import { IoDocumentTextSharp } from "react-icons/io5";
import "../OptionAdmin/optionAdmin.css";
import { NavLink } from "react-router-dom";

const OptionAdmin = () => {
  return (
    <div className="container  my-4 pt-4">
      <nav>
        <ul className="list-unstyled d-flex flex-column flex-md-row justify-content-evenly">
          <li>
            <NavLink to={"/UserList"} className={"text-decoration-none"}>
              <div className="text-center">
                <FaUsers className="icon" />
                <p className="text">Usuarios</p>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/Admin"} className={"text-decoration-none"}>
              <div className="text-center">
                <SiPcgamingwiki className="icon" />
                <p className="text">Productos</p>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/Order"} className={"text-decoration-none"}>
              <div className="text-center">
                <IoDocumentTextSharp className="icon" />
                <p className="text">Ordenes de compra</p>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default OptionAdmin;
