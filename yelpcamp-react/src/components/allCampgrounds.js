import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/campgrounds";
import Campground from "./Campground";
import PropTypes from "prop-types";

export const AllCampgrounds = ({
  fetchAllCampgrounds,
  campgrounds,
  fetchCampDetails,
}) => {
  useEffect(() => {
    fetchAllCampgrounds();
  }, [fetchAllCampgrounds]);

  return (
    <div>
      <ul>
        {campgrounds.map((campground) => (
          <li key={campground._id}>
            <Campground
              campground={campground}
              fetchCampDetails={fetchCampDetails}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => ({
  campgrounds: state.campgrounds.list,
});
const mapActionsToProps = {
  fetchAllCampgrounds: actions.fetchAll,
  fetchCampDetails: actions.fetchOne,
};

AllCampgrounds.propTypes = {
  fetchAllCampgrounds: PropTypes.func,
  fetchCampDetails: PropTypes.func,
  campgrounds: PropTypes.array,
};

export default connect(mapStateToProps, mapActionsToProps)(AllCampgrounds);
