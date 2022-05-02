import { useState } from "react";
import SignUpModal from "./SignUpModal";
import SignInUser from "../img/user_white.png";
import { BiMenuAltRight } from "react-icons/bi";

const Navbar = () => {
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

    const handleClick = () => {
        setIsSignUpModalOpen(!isSignUpModalOpen);
    }

  return (
    <div className="navbar_section">
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

          <button 
            type="button"
            onClick={(handleClick)}
            className="signUp_button"
          >S'inscrire</button>
          {isSignUpModalOpen && 
          <div className="signUp_modal_wrapper">
            <SignUpModal 
            //onClose={() => setIsSignUpModalOpen(false)}
            />
          </div>}

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
    </div>
  );
};

export default Navbar;
