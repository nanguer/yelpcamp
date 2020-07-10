import React from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import useForm from "../Hooks/useForm";

const NewCamp = ({ show, dispatch, toggleNewCamp, ...props }) => {
  const initialValues = {
    name: "",
    price: "",
    image: "",
    description: "",
    location: "",
    errors: {},
  };
  const { handleInputChange, values, handleSubmit, submitting } = useForm(
    null,
    initialValues
  );

  const handleCloseModal = () => {
    props.history.goBack();
  };

  // const { errors } = values;
  return (
    <Modal
      dialogClassName="modal-login"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
      onHide={() => handleCloseModal()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Campground!
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-container">
          <Form onSubmit={(e) => handleSubmit(e, dispatch)}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                onChange={handleInputChange}
                value={values.name}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Price"
                name="price"
                onChange={handleInputChange}
                value={values.price}
              />
            </Form.Group>
            <Form.Group controlId="formBasicImage">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image Url"
                name="image"
                onChange={handleInputChange}
                value={values.image}
              />
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleInputChange}
                value={values.description}
              />
            </Form.Group>
            <Form.Group controlId="formBasicLocation">
              <Form.Label>location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location"
                name="location"
                onChange={handleInputChange}
                value={values.location}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? "Loading..." : "Save it!"}
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(NewCamp);
