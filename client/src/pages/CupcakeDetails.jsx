import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "../components/Cupcake.css";

function CupcakeDetails() {
  const [selectedCupcake, setSelectedCupcake] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3310/api/cupcakes/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((cupcake) => {
        setSelectedCupcake(cupcake);
      });
  }, [id]);

  return (
    <>
      <div
        className="cupcake-container"
        style={{
          width: "100%",
        }}
      >
        <div
          className="cupcake"
          
        >
          <div className={`accessory ${selectedCupcake.accessory}`} />
          <div className="cream">
            <div
              className="cream-1"
              style={{
                backgroundColor: selectedCupcake.color1,
              }}
            />
            <div
              className="cream-2"
              style={{
                backgroundColor: selectedCupcake.color2,
              }}
            />
            <div
              className="cream-3"
              style={{
                backgroundColor: selectedCupcake.color3,
              }}
            />
          </div>
          <div className="bottom">
            <div className="bottom-in">
              <div className="face">
                <div className="eyes">
                  <div className="left-eye" />
                  <div className="right-eye" />
                </div>
                <div className="mouth" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cupcake-name">
        <p>{selectedCupcake.name}</p>
        <p>{selectedCupcake.accessory}</p>
      </div>
    </>
  );
}

export default CupcakeDetails;
