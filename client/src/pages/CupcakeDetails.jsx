import { useNavigate, useLoaderData } from "react-router-dom";

import Cupcake from "../components/Cupcake";

function CupcakeDetails() {
  const cupcake = useLoaderData();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/cupcakes");
  };

  return (
    <div>
      <button onClick={handleClick} type="button">
        Go back to cupcake list
      </button>
      <h2>Discover our cupcake "{cupcake.name}"</h2>
      <Cupcake data={cupcake} />
    </div>
  );
}

export default CupcakeDetails;
