import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { ApiUrl } from "../constants/api";
import RecipeItem from "./RecipeItem";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [spinner, setSpinnner] = useState([true]);

  useEffect(() => {
    fetch(ApiUrl)
      .then(response => response.json())
      .then(json => {
        setRecipes(json.results);
        setFilteredRecipes(json.results)
      })
      .catch(error => console.log(error))
      .finally(() => setSpinnner(false));
  }, []);

  if (spinner) {
    return <Spinner animation="border" className="spinner" />;
  }

  const filterRecipes = function (e) {

    const searchValue = e.target.value.toLowerCase();

    const filteredArr = recipes.filter(function (r) {
      const lowerCaseName = r.name.toLowerCase();

      if (lowerCaseName.startsWith(searchValue)) {
        return true;
      }

      return false;

    });

    setFilteredRecipes(filteredArr)

  };

  return (
    <>
      <Row>
        {filteredRecipes.map(recipe => {
          const { title, thumbnail } = recipe;

          return (
            <Col sm={6} md={3}>
              <RecipeItem title={title} thumbnail={thumbnail} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default RecipeList;
