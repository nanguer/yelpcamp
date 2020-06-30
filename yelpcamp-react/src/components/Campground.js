import React from "react";

const Campground = ({ campground, fetchCampDetails }) => {
  const { name, image, description, _id: id } = campground;

  const onShowCampDetails = (id) => {
    console.log(id);
    fetchCampDetails(id);
  };
  return (
    <div>
      <h6>{name}</h6>
      <img src={image} alt="campground" />
      <p>{description}</p>
      <button onClick={() => onShowCampDetails(id)}>More Info</button>
    </div>
  );
};

export default Campground;
