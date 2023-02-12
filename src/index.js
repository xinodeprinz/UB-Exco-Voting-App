import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router-dom'
import router from "./routes/web";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);