import React from 'react';
import { render } from "react-dom";
import App from "./App";

import "regenerator-runtime/runtime";

import "../styles/main.scss";

const container = document.getElementById("app");
render(<App />, container);