import React from "react";
import { Link } from "react-router-dom";

const Preview = ({ campground }) => {
  const { name, image, description, _id: id } = campground;

  return (
    <div>
      <h6>{name}</h6>
      <img src={image} alt="campground" />
      <p>{description}</p>
      <Link to={`campgrounds/${id}`}>
        <button>More Info</button>
      </Link>
    </div>
  );
};

export default Preview;
