import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

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

/* you can use someCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  // Step 1: get all cupcakes
  const data = useLoaderData();
  // Step 3: get all accessories
  const [accessories, setAccessories] = useState([]); // get accessories from API
  const [isLoading, setisLoading] = useState(true); // toogle the data flux
  const [selectedAccessory, setSelectedAccessory] = useState(""); // store the selected accessory
  const [filteredData, setFilteredData] = useState(data); // filter the cupcake according to select

  const handleSelect = (event) => {
    const { value } = event.target;
    setSelectedAccessory(value);
    if (value !== "") {
      setFilteredData(data.filter((cupcake) => cupcake.accessory === value));
    } else {
      setFilteredData(data);
    }
  };

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

  // Step 5: create filter state

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select onChange={handleSelect} id="cupcake-select">
            <option value="">---</option>
            {!isLoading ? (
              accessories.map((accessorie) => (
                <option
                  key={`accessorie : ${accessorie.slug}`}
                  value={accessorie.slug}
                >
                  {accessorie.name}
                </option>
              ))
            ) : (
              <option value="">Loading...</option>
            )}

            {/* Step 4: add an option for each accessory */}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id={`cupcake-list-${selectedAccessory}`}>
        {/* Step 2: repeat this block for each cupcake */}
        {/* Step 5: filter cupcakes before repeating */}
        {filteredData.map((cupcake) => (    
          <li key={`cupcake ${cupcake.id}`} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
