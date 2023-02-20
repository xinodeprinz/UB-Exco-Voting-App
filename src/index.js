import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router-dom'
import router from "./routes/web";
import "bootstrap/dist/css/bootstrap.min.css";
import "./modules/main.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Provider } from "react-redux";
import store from './store';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);