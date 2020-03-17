import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function RecipeItem(props) {
  return (
    <Card>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Link to={"recipe/" + props.title}>
          <Button variant="secondary" block>
            More Info
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default RecipeItem;
