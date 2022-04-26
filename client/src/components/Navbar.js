import Logo from "../img/logo.png";
import SignInUser from "../img/user_white.png";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  return (
    <header>
        <div className="mu_logo">
            <img 
                src={Logo}
                width={200}
                height={200}
                alt="logo"
            />
        </div>
      <div className="nav_wrapper">
      <nav>
        <div className="sign_in">
            <a href="# ">
                <img 
                    src={SignInUser}
                    width={45}
                    height={55}
                    alt="pictogramme utilisateur pour se connecter"
                />
            </a>
        </div>
        <div className="sign_up">
            <button>S'inscrire</button>
        </div>
        <div className="navbar_content">
          <ul>
            <li>
              <a href="/">Genres</a>
            </li>
            <li>
              <a href="/">À propos</a>
            </li>
            <li>
              <a href="/">Réseaux</a>
            </li>
            <li>
              <a href="/">Langage</a>
            </li>
          </ul>
        </div>
        <div className="navbar_toggle">
          {" "}
          <BiMenuAltRight />{" "}
        </div>
      </nav>
      </div>  
    </header>
  );
};

export default Navbar;
