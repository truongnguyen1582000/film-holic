import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "app/store";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
