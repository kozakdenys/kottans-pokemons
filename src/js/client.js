import "bootstrap-webpack";
import "../css/style.css";
import React from "react";
import ReactDOM from "react-dom";
import Main from "./pages/Main";

const app = document.getElementById('app');
ReactDOM.render(<Main/>, app);;