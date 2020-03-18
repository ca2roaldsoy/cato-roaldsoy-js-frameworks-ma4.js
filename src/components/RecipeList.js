import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { ApiUrl } from "../constants/api";
import RecipeItem from "./RecipeItem";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [load, setLoad] = useState([true]);

  useEffect(() => {
    fetch(ApiUrl)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.results);
        setFilteredRecipes(data.results);
      })
      .catch(error => console.log(error))
      .finally(() => setLoad(false));
  }, []);

  if (load) {
    return (
      <Spinner animation="border" variant="secondary" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  const filterRecipes = function(e) {
    const searchValue = e.target.value.toLowerCase();

    const filteredArr = recipes.filter(function(r) {
      const lowerCaseName = r.name.toLowerCase();

      if (lowerCaseName.startsWith(searchValue)) {
        return true;
      }

      return false;
    });

    setFilteredRecipes(filteredArr);
  };

  return (
    <>
      <Row>
        {filteredRecipes.map(recipe => {
          const { title, thumbnail } = recipe;

          return (
            <Col sm={12} md={2} key={title}>
              <RecipeItem title={title} thumbnail={thumbnail} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default RecipeList;
