import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { ApiUrl } from "../constants/api";
import RecipeItem from "./RecipeItem";
import SearchRecipe from "./SearchRecipe";

// Use State
function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [load, setLoad] = useState([true]);

  // Fetch Api
  useEffect(() => {
    fetch(ApiUrl)
      .then(response => response.json())
      .then(json => {
        setRecipes(json.results);
        setFilteredRecipes(json.results);
      })
      .catch(error => console.log(error))
      .finally(() => setLoad(false));
  }, []);

  // Filter results
  const filterRecipes = function(e) {
    const searchValue = e.target.value.toLowerCase();

    const filteredArr = recipes.filter(function(r) {
      const lowerCaseTitle = r.title.toLowerCase();

      if (lowerCaseTitle.includes(searchValue)) {
        return true;
      }

      return false;
    });

    setFilteredRecipes(filteredArr);
  };

  // Spinner while loading Api
  if (load) {
    return (
      <>
        <Spinner animation="border" variant="secondary" role="status" />
        <span className="sr-only">Loading...</span> {/* for screen readers */}
      </>
    );
  }

  return (
    <>
      <SearchRecipe handleSearch={filterRecipes} />
      <Row>
        {filteredRecipes.map((recipe, idx) => {
          const { title, thumbnail } = recipe;
          console.log(recipe, idx);

          return (
            <Col sm={12} md={2} key={idx}>
              <RecipeItem title={title} thumbnail={thumbnail} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default RecipeList;
