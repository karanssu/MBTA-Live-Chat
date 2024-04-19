import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
      crossOrigin="anonymous"
    />
    <App />
  </BrowserRouter>
);


// OLD VERSION REACT, What it was before (4/18/24)

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter } from "react-router-dom";

// ReactDOM.render(
//     // <React.StrictMode>

//     <BrowserRouter>
//         <link
//             rel="stylesheet"
//             href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
//             integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
//             crossOrigin="anonymous"
//         />
//         <App />
//     </BrowserRouter>,
//     // </React.StrictMode>,
//     document.getElementById("root")
// );