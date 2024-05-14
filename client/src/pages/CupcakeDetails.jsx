import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

function CupcakeDetails() {
  const cupcake = useLoaderData();

  return (
    <>
      <h1>{cupcake.name}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Cupcake data={cupcake} />
      </div>

      <ul>
        <li style={{ color: "#BADA55" }}>{cupcake.color1}</li>
        <li style={{ color: "#BADA55" }}>{cupcake.color2}</li>
        <li style={{ color: "#BADA55" }}>{cupcake.color3}</li>
      </ul>
    </>
  );
}

export default CupcakeDetails;
