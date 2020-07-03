import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Preview = ({ campground }) => {
  const { name, image, description, _id: id } = campground;

  return (
    <div>
      <h6>{name}</h6>
      <img src={image} alt="campground" />
      <p>{description}</p>
      <Link to={`campgrounds/${id}`}>
        <Button variant="info">More Info</Button>
      </Link>
    </div>
  );
};

export default Preview;
