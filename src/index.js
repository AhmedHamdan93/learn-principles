import React from "react";
import ReactDom from "react-dom/client";
import App from './App';



const root = document.getElementById('root');
const render = ReactDom.createRoot(root);
render.render(
  <App />
);