import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

/* ************************************************************************* */
const someCupcakes = [];
someCupcakes.push(
  {
    id: 10,
    accessory_id: "4",
    accessory: "wcs",
    color1: "blue",
    color2: "white",
    color3: "red",
    name: "France",
  },
  {
    id: 11,
    accessory_id: "4",
    accessory: "wcs",
    color1: "yellow",
    color2: "red",
    color3: "black",
    name: "Germany",
  },
  {
    id: 27,
    accessory_id: "5",
    accessory: "christmas-candy",
    color1: "yellow",
    color2: "blue",
    color3: "blue",
    name: "Sweden",
  }
);

function CupcakeList() {
  // Step 1: get all cupcakes
  const cupcakes = useLoaderData();
  console.info(cupcakes);

  // Step 3 : Get the accessories
  const [accessories, setAccessories] = useState([]);
  // Step 5 : Filtrer list
  const [selectedAccessory, setSelectedAccessory] = useState("");
  // Step 4 : Fill the accessories selector
  const [isLoading, setisLoading] = useState(true);
  console.info(accessories);
  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        return response.json();
      })
      .then((items) => {
        setAccessories(items);
        setisLoading(false);
      });
  }, []);

  // Filter the cupcakes based on the selected accessory
  const filteredCupcakes = selectedAccessory
    ? cupcakes.filter((cupcake) => cupcake.accessory_id === selectedAccessory)
    : cupcakes;

  // Handle accessory selection change
  const handleAccessoryChange = (event) => {
    setSelectedAccessory(event.target.value);
  };

  // Passe les données comme Props et map sur chaque data
  const allcupcakes = filteredCupcakes.map((cupcake) => (
    <li className="cupcake-item" key={cupcake.id}>
      {/* Passer la props a Cupcake  */}
      <Cupcake data={cupcake} />
    </li>
  ));
  // Step 5: create filter state

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by
          {/* Step 5 : Filter List  */}
          <select
            id="cupcake-select"
            value={selectedAccessory}
            onChange={handleAccessoryChange}
          >
            <option value="">---</option>
            {/* Ajout d'un térnaire pour afficher les données ou le loading  */}
            {!isLoading ? (
              accessories.map((accessorie) => (
                <option key={accessorie.id} value={accessorie.id}>
                  {accessorie.name}
                </option>
              ))
            ) : (
              <option value="">Loading...</option>
            )}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}

        {allcupcakes}

        {/* Step 5: filter cupcakes before repeating */}
      </ul>
    </>
  );
}

export default CupcakeList;
