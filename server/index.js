// Load environment variables from .env file
require("dotenv").config();

// Check database connection
// Note: This is optional and can be removed if the database connection
// is not required when starting the application
// require("./database/client").checkConnection();

// Import the Express application from app/config.js
const app = require("./app/config");

app.get("/api", (req, res) => {
  res.send("The API is available");
});

const data = require("./db.json");

app.get("/api/cupcakes", (req, res) => {
  res.json(data.cupcakes);
});

app.get("/api/cupcakes/:id", (req, res) => {
  const idAsInt = parseInt(req.params.id, 10);

  const wantedCupcake = data.cupcakes.find((cupcake) => cupcake.id === idAsInt);

  if (wantedCupcake == null) {
    res.sendStatus(404);
  } else {
    res.json(wantedCupcake);
  }
});

app.get("/api/accessories", (req, res) => {
  res.json(data.accessories);
});

app.get("/api/accessories/:id", (req, res) => {
  const idAsInt = parseInt(req.params.id, 10);

  const wantedAccessory = data.accessories.find(
    (accessory) => accessory.id === idAsInt
  );

  if (wantedAccessory == null) {
    res.sendStatus(404);
  } else {
    res.json(wantedAccessory);
  }
});

// Get the port from the environment variables
const port = process.env.APP_PORT;

// Start the server and listen on the specified port
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
