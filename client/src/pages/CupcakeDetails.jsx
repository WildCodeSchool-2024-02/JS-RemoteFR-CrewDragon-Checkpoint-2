import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CupcakeDetails() {
  const { id } = useParams();
  const [cupcake, setCupcake] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3310/api/cupcakes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCupcake(data);
      })
      .catch((error) => console.error("Error pas de cucpcake:", error));
  }, [id]);

  if (!cupcake) {
    return <div>MiamMiam</div>;
  }

  return (
    <div>
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
      <h2>{cupcake.name}</h2>
      <ul>
        <li>{cupcake.accessory}</li>
        <li>{cupcake.color1}</li>
        <li>{cupcake.color2}</li>
        <li>{cupcake.color3}</li>
      </ul>

      <Link to="/cupcakes">Retour à la liste des cupcakes</Link>
    </div>
  );
}

export default CupcakeDetails;
