import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/campgrounds";
import PropTypes from "prop-types";
import Preview from "./Preview";

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
            <Preview
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
};

AllCampgrounds.propTypes = {
  fetchAllCampgrounds: PropTypes.func,
  fetchCampDetails: PropTypes.func,
  campgrounds: PropTypes.array,
};

export default connect(mapStateToProps, mapActionsToProps)(AllCampgrounds);
