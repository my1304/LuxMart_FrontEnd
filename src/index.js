import React from "react";
import { createRoot } from "react-dom/client";

import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "@styles/index.css";

import { store } from "./features/store";

import App from "@components/App";

import reportWebVitals from "./reportWebVitals";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <App />
      </QueryParamProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
