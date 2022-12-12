// external imports
import React from "react";
import ReactDOM from "react-dom/client";

// internal imports
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DataProvider } from "./context/DataProvider";
import { Container, createTheme, NextUIProvider } from "@nextui-org/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const darkTheme = createTheme({ type: "dark" });

root.render(
  <React.StrictMode>
    <NextUIProvider theme={darkTheme}>
      <DataProvider>
        <Container lg gap={2} css={{ mt: "$5" }}>
          <App />
        </Container>
      </DataProvider>
    </NextUIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
