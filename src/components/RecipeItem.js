import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

function RecipeItem(props) {
  return (
    <Card>
      <Card.Img variant="top" src={props.thumbnail} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

RecipeItem.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default RecipeItem;
