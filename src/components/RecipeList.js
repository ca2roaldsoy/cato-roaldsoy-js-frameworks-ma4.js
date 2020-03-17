import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import ApiUrl from "../constants/api";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [spinner, setSpinnner] = useState([true]);

  useEffect(() => {
    fetch(ApiUrl)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.results);
        setFilteredRecipes(data.results);
      })
      .catch(error => console.log(error))
      .finally(() => setSpinnner(false));
  });

  return false;
}

export default RecipeList;
