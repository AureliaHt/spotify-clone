import { useRef, useState, useEffect } from "react";
import { ImCheckmark, ImCancelCircle, ImInfo, ImCross, ImEyeBlocked, ImEye } from "react-icons/im";
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,32}$/;
const REGISTER_URL = "/register";

const SignUpModal = ({onClose}) => {
  const userRef = useRef();
  const errRef = useRef();
  const closeModalRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMessage, setErrMessage] = useState("");
  const [sucess, setSuccess] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState(<ImEye/>);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
  }, [password])

  useEffect(() => {
    setErrMessage("");
  }, [user, email, password]);

  useEffect(() => {
    const clickOutOfTheModal = (e) => {
      if (closeModalRef.current && !closeModalRef.current.contains(e.target)){
        onClose();
      }
    };
    document.addEventListener('click', clickOutOfTheModal);
    document.addEventListener('touchstart', clickOutOfTheModal);
    return () => {
      document.removeEventListener('click', clickOutOfTheModal);
      document.removeEventListener('touchstart', clickOutOfTheModal);
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

  const handlePasswordVisibility = () => {
        if (passwordIcon === <ImEye/>) {
            setPasswordIcon(<ImEyeBlocked/>);
            setPasswordVisibility(!passwordVisibility);
        } else if (passwordIcon === <ImEyeBlocked/>) {
            setPasswordIcon(<ImEye/>);
            setPasswordVisibility(!passwordVisibility);
        }
    };

  const v1 = USER_REGEX.test(user);
  const v2 = EMAIL_REGEX.test(email);
  const v3 = PWD_REGEX.test(password);
    if (!v1 || !v2 || !v3) {
      setErrMessage("Entrée invalide");
      return;
    }
    try {
        const response = await axios.post(REGISTER_URL, 
            JSON.stringify({ user, email, password }),
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            });
            setSuccess(true);
            setUser('');
            setEmail('');
            setPassword('');
    } catch (err) {
        if (!err?.response) {
            setErrMessage('Pas de réponse du serveur');
        } else if (err.response?.status === 409) {
            setErrMessage('Pseudo déjà utilisé');
        } else {
            setErrMessage("L'inscription a échoué")
        }
        errRef.current.focus();
    }
  };
 
  return (
    <>
    <div 
      ref={closeModalRef}
      //onClose={() => setIsSignUpModalOpen(false)}
      className="signUp_modal"
    >
      <div className="signUp_modal_header">
        <h2>S'inscrire</h2>
      </div>
      <div className="signUp_modal_body">
        <form onSubmit={handleSubmit}>
          <div className="signUp_modal_body_input">

            <div className="signUp_modal_body_input_username">
            <label htmlFor="identifiant"></label>
            <input 
              type="text" 
              id="identifiant"
              ref={userRef}
              placeholder="identifiant"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <span className={validName ? "valid" : "hide"}>
                <ImCheckmark />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <ImCancelCircle />
              </span>
            <p
              id="uidnote"
              className={userFocus && user && !validName ? "instructions" : "offscreen"}
            >
              <ImInfo />
               4 à 24 caractères. <br />
              Doit commencer par une lettre. <br />
              Les lettres, nombres, underscores et tirets sont acceptés.
            </p>
            </div>

            <div className="signUp_modal_body_input_email">
            <label htmlFor="email"></label>
            <input 
              type="text" 
              id="email"
              placeholder="e-mail"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required 
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uenote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <span className={validEmail ? "valid" : "hide"}>
                <ImCheckmark />
              </span>
              <span className={validEmail || !user ? "hide" : "invalid"}>
                <ImCancelCircle />
              </span>
            <p
              id="uenote"
              className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}
            >
              <ImInfo />
              L'adresse e-mail doit être valide.
            </p>
            </div>

            <div className="signUp_modal_body_input_password">
            <label htmlFor="password"></label>
            <input 
              type="password"
              id="password"
              placeholder="mot de passe"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              required
              autoCapitalize={'none'}
              secureTextEntry={passwordVisibility}
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <button 
              className="password_visibility_button"
              //onClick={handlePasswordVisibility}
              button={passwordIcon} 
            ></button>
            <span className={validPassword ? "valid" : "hide"}>
                <ImCheckmark />
              </span>
            <p
              id="pwdnote"
              className={passwordFocus && password && !validPassword ? "instructions" : "offscreen"}
            >
              <ImInfo />
              8 à 32 caractères. <br />
              Doit contenir au moins une lettre majuscule, une lettre minuscule,
              un chiffre et un caractère spécial. <br />
              Caractères acceptés :{" "}
              <span aria-label="point d'exclamation">!</span>
              <span aria-label="arobase">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar">$</span>
              <span aria-label="pourcentage">%</span>
            </p>
            </div>

            <div className="signUp_modal_conditions_checkbox">
                <input 
                    type="checkbox"
                    className="conditions_checkbox"
                />
                <p className="conditions_sentence">J'accepte les conditions</p>
            </div>

            <div className="signUp_modal_body_buttons">
                <button className="signUp_modal_validation_button">
                  <ImCheckmark />
                </button>
                <button 
                  onClick={onClose}
                  className="signUp_modal_closure_button"
                >
                  <ImCross />
                </button>
            </div>

            <div className="signUp_modal_body_signIn_redirection">
                <p>Déjà un compte ? Se connecter ici</p>
            </div>

          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignUpModal;
