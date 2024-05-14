import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Step 6 : New page from CupcakeDetails

function CupcakeDetails() {
  const { id } = useParams();
  const [cupcake, setCupcake] = useState(null);

  useEffect(() => {
    // Fetch cupcakedetails :id
    fetch(`http://localhost:3310/api/cupcakes/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cupcake details");
        }
        return response.json();
      })
      .then((data) => {
        setCupcake(data);
      })
      .catch((error) => {
        console.error("Error fetching cupcake details:", error);
      });
  }, [id]);

  if (!cupcake) {
    return <div>Loading...</div>;
  }

  return (
    // Step 6 : Afficher cupcake
    <div className="cupcake-container">
      <div className="cupcake">
        <div className={`accessory ${cupcake.accessory}`} />
        <div className="cream">
          <div
            className="cream-1"
            style={{
              backgroundColor: cupcake.color1,
            }}
          />
          <div
            className="cream-2"
            style={{
              backgroundColor: cupcake.color2,
            }}
          />
          <div
            className="cream-3"
            style={{
              backgroundColor: cupcake.color3,
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

      <div className="cupcake-name">{cupcake.name}</div>
    </div>
  );
}

export default CupcakeDetails;
