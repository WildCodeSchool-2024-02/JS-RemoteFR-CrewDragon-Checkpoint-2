import { useEffect, useState } from "react";
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

/* you can use someCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  const cdata = useLoaderData();
  const [aaccessory, setAaccessory] = useState([]);
  const [filter, setFilter] = useState([]);
  // Step 1: get all cupcakes
  // console.info(useLoaderData(data));

  // const allCupcakes = cdata.map((e) => <Cupcake data={e} key={e.id} />);

  useEffect(() => {
    fetch(`http://localhost:3310/api/accessories`)
      .then((res) => res.json())
      .then((data) => {
        setAaccessory(data);
      })
      .catch((err) => {
        console.error(`error ${err}`);
      });
  }, []);

  // console.info(aaccessory);

  const allacces = aaccessory.map((e) => (
    <option value={e.id} key={e.id}>
      {e.name}
    </option>
  ));

  // Step 5: create filter state
  const filterFunc = (event) => {
    setFilter(event.target.value);
  };
  console.info(filter);

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select id="cupcake-select" onChange={filterFunc}>
            <option value="">---</option>
            {allacces}
            {/* Step 4: add an option for each accessory */}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        <li className="cupcake-item">{/* {allCupcakes} */}</li>
        {/* Step 5: filter cupcakes before repeating */}
        {cdata.map((e) =>
          e.accessory_id === filter ? <Cupcake data={e} key={e.id} /> : null
        )}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
