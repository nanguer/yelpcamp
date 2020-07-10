import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const Preview = ({ campground }) => {
  const { name, image, _id: id } = campground;

  return (
    <Col md="3">
      <Card>
        <Card.Img variant="top" src={image} alt="campground" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Link to={`campgrounds/${id}`}>
            <Button variant="info">More Info</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Preview;
