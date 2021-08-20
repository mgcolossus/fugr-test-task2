import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { RootStoreProvider } from "./contexts/rootStoreContext";
ReactDOM.render(
  <Router>
    <RootStoreProvider>
      <App />
    </RootStoreProvider>
  </Router>,
  document.getElementById("root")
);
