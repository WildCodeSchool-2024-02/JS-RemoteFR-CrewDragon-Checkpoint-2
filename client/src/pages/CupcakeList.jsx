import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

/* ************************************************************************* */

/* you can use someCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */
// Step 1: get all cupcakes
function CupcakeList() {
  const { cupcakes } = useLoaderData();

  // Step 3: get all accessories
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => response.json())
      .then((data) => {
        setAccessories(data);
      })
      .catch((error) =>
        console.error("Erreur pour récupérer les accesoires", error)
      );
  });
  // Step 5: create filter state
  const [selecteAccessory, setSelecteAccessory] = useState("");
  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selecteAccessory}
            onChange={(event) => setSelecteAccessory(event.target.value)}
          >
            <option value="">---</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.id}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {cupcakes
          .filter(
            (cupcake) =>
              !selecteAccessory || cupcake.accessory_id === selecteAccessory
          )
          .map((cupcake) => (
            <li key={cupcake.id} className="cupcake-item">
              <Link to={`/cupcakes/${cupcake.id}`}>
                <Cupcake data={cupcake} />
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default CupcakeList;
