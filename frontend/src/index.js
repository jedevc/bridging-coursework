import React from 'react';
import { render } from "react-dom";
import App from "./App";

import "regenerator-runtime/runtime";

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import "../styles/main.scss";

const container = document.getElementById("app");
render(<App />, container);