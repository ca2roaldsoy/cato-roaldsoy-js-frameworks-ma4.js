import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "react-bootstrap/Spinner";
import ApiUrl from "../constants/api";

function RecipeList() {
  useEffect(() => {
    fetch(ApiUrl)
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  });

  return false;
}

export default RecipeList;
