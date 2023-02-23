import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "animate.css";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./redux/store";

axios.defaults.baseURL = "https://backredux.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
