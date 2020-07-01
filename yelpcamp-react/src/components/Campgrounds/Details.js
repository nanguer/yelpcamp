import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOne } from "../../actions/campgrounds";
import PropTypes from "prop-types";

const Details = ({ fetchCampDetails, details, ...props }) => {
  useEffect(() => {
    fetchCampDetails(props.match.params.id);
  }, [fetchCampDetails, props.match.params.id]);

  const { name, description } = details;

  return (
    <div>
      <h4>{name} Campground Details</h4>
      <p>description:{description} </p>
    </div>
  );
};
const mapActionsToProps = {
  fetchCampDetails: fetchOne,
};
const mapStateToProps = (state) => ({
  details: state.campgrounds.viewing,
});

Details.propTypes = {
  fetchCampDetails: PropTypes.func,
  details: PropTypes.object,
};

export default connect(mapStateToProps, mapActionsToProps)(Details);
