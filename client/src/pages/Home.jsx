import { Link } from "react-router-dom";

import "./Home.css";

import Cupcake from "../components/Cupcake";

function Home() {
  return (
    <>
      <h1>Cupcake Union</h1>
      <div className="home-cupcake">
        <Cupcake />
      </div>
      <div className="home-content">
        <p>
          Welcome to the Cupcake Union 🧁 <br />
          On this application, you will:
        </p>
        <p>
          ✔️ Display cupcakes from an API <br />
          ✔️ Filter them by accessory
        </p>
        <p>
          Clic on <Link to="/instructions">Instructions</Link> to start !
        </p>
      </div>
    </>
  );
}

export default Home;
