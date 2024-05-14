import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";

import Home from "./pages/Home";
import Instructions from "./pages/Instructions";
import CupcakeList from "./pages/CupcakeList";
import CupcakeDetails from "./pages/CupcakeDetails";
import NotFound from "./pages/NotFound";

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
          try {
            return fetch("http://localhost:3310/api/cupcakes");
          } catch (error) {
            return error;
          }
        },
      },
      {
        path: "/cupcakes/:id",
        element: <CupcakeDetails />,
        // Step 1: load data here
        loader: async ({ params }) => {
          const { id } = params;
          try {
            return fetch(`http://localhost:3310/api/cupcakes/${id}`);
            // return fetch("http://localhost:3310/api/cupcakes/" + id);
          } catch (error) {
            return error;
          }
        },
      },
      {
        path: "*",
        element: <NotFound />,
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
