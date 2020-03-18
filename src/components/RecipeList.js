import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { ApiUrl } from "../constants/api";
import RecipeItem from "./RecipeItem";
import Search from "./Search";

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

  const filterRecipes = function(e) {
    const searchValue = e.target.value.toLowerCase();

    const filteredArr = recipes.filter(function(r) {
      const lowerCaseTitle = r.title.toLowerCase();

      if (lowerCaseTitle.includes(searchValue)) {
        return true;
      } else {
        return false;
      }
    });

    setFilteredRecipes(filteredArr);
  };

  if (load) {
    return (
      <Spinner animation="border" variant="secondary" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <Search handleSearch={filterRecipes} />
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
