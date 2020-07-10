import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOne } from "../../actions/campgrounds";
import PropTypes from "prop-types";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Details = ({ fetchCampDetails, details, ...props }) => {
  useEffect(() => {
    fetchCampDetails(props.match.params.id);
  }, [fetchCampDetails, props.match.params.id]);

  const { name, description } = details;

  // useEffect(() => {
  //   console.log(details, props);
  // }, [details, props]);

  return (
    <Container>
      <Row>
        <Col md="3">{name}</Col>
        <Col md="9">
          <Card>
            <Card.Img variant="top" src={details.image} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>{description}</Card.Text>
            </Card.Body>
          </Card>
          <div className="comment-section">
            <div className="text-right">
              <Button variant="success"> Add new Comment</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
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
