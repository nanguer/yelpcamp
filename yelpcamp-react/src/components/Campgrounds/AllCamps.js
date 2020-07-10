import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/campgrounds";
import PropTypes from "prop-types";
import Preview from "./Preview";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export const AllCampgrounds = ({
  fetchAllCampgrounds,
  campgrounds,
  fetchCampDetails,
  dispatch,

  ...props
}) => {
  useEffect(() => {
    fetchAllCampgrounds();
  }, [fetchAllCampgrounds]);

  // const handleAddCamp = async (dispatch) => {
  //   if (!isAuthenticated) {
  //     addToast("Please Login First", {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
  //     dispatch({ type: TOGGLE_LOGIN });
  //   } else {
  //     dispatch({ type: TOGGLE_NEW_CAMP });
  //   }
  // };

  return (
    <Container>
      <Button
        variant="primary"
        onClick={() => props.history.push("/new-campground")}
      >
        Add New Campground
      </Button>

      <Row className="text-center">
        {campgrounds.map((campground) => (
          <Preview
            key={campground._id}
            campground={campground}
            fetchCampDetails={fetchCampDetails}
          />
        ))}
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  campgrounds: state.campgrounds.list,
});
const fetchAllCampgrounds = actions.fetchAll;

const mapActionsToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({ fetchAllCampgrounds }, dispatch),
  };
};

AllCampgrounds.propTypes = {
  fetchAllCampgrounds: PropTypes.func,
  fetchCampDetails: PropTypes.func,
  campgrounds: PropTypes.array,
};

export default connect(mapStateToProps, mapActionsToProps)(AllCampgrounds);
