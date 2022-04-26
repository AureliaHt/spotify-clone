import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="accueil_bg">
      <Navbar />
      <div className="h1_container">
        <h1>
          La musique est la langue des émotions.
          <br />
          <span className="quote_author">- Kant</span>
        </h1>
      </div>
    </div>
  );
};

export default Home;
