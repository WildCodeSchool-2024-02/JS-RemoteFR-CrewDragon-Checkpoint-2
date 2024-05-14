import { useLoaderData, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cupcake from "../components/Cupcake";

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
  const cupcakes = useLoaderData();
  // Step 3: get all accessories

  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch accessories");
        }
        return response.json();
      })
      .then((data) => {
        setAccessories(data);
      })
      .catch((error) => {
        console.error("Error fetching accessories:", error);
      });
  }, []);

  // Step 5: create filter state

  const [selectedAccessory, setSelectedAccessory] = useState("");

  /* Step 5: filter cupcakes before repeating */

  const filteredCupcakes = () =>
    selectedAccessory
      ? cupcakes.filter((cupcake) => cupcake.accessory_id === selectedAccessory)
      : cupcakes;

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectedAccessory}
            onChange={(e) => setSelectedAccessory(e.target.value)}
          >
            <option value="">---</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.id}>
                {" "}
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {filteredCupcakes().map((cupcake) => (
          <Link key={cupcake.id} to={`/cupcakes/${cupcake.id}`}>
            <Cupcake data={cupcake} />
          </Link>
        ))}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
