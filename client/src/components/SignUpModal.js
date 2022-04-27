import { useRef, useState, useEffect } from "react";
import { GrCheckmark, GrClose, GrCircleInformation } from "react-icons/gr";
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,32}$/;
const REGISTER_URL = "/register";

const SignUpModal = () => {
  const userRef = useRef();
  const errRef = useRef();

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

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
  }, [password])

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div className="signUp_modal">
      <div className="signUp_modal_header">
        <h2>S'inscrire</h2>
      </div>
      <div className="signUp_modal_body">
        <form onSubmit={handleSubmit}>
          <div className="signUp_modal_body_input">
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

            <label htmlFor="password"></label>
            <input 
              type="text" 
              id="password"
              placeholder="mot de passe"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default SignUpModal;
