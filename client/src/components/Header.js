import Logo from "../img/logo.png";

const Header = () => {
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
        </header>
    );
};

export default Header;