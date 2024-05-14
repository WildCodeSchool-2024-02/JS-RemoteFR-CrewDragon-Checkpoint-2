import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import Home from "./pages/Home";
import Instructions from "./pages/Instructions";
import CupcakeList from "./pages/CupcakeList";
import CupcakeDetails from "./pages/CupcakeDetails";

const fetchCupcakes = async () => {
  try {
    const response = await fetch("http://localhost:3310/api/cupcakes");
    if (!response.ok) {
      throw new Error("pas de cupcakes");
    }
    return response.json();
  } catch (error) {
    console.error("pas de  cupcakes:", error);
    return [];
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructions",
        element: <Instructions />,
      },
      {
        path: "/cupcakes",
        element: <CupcakeList />,
        // Step 1: load data here
        loader: async () => {
          const cupcakes = await fetchCupcakes();
          return { cupcakes };
        },
      },
      {
        path: "/cupcakes/:id",
        element: <CupcakeDetails />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
