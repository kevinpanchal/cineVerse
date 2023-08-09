import React, { useState } from "react";
import { Modal, Typography, TextField, Button, IconButton } from "@mui/material";
import styled from "@emotion/styled";

const ModalContent = styled("div")({
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "5px",
  maxWidth: "500px",
  margin: "30px auto",
});

const ModalHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
});

const ButtonWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
});

const AddReviewModal = ({ open, onClose, onSubmit }) => {
  const [reviewState, setReviewState] = useState({
    reviewerName: "",
    review: "",
    rating: "",
  });

  const isValid = reviewState.reviewerName && reviewState.review && reviewState.rating;

  const handleSubmit = () => {
    if (isValid) {
      onSubmit(reviewState);
      setReviewState({
        reviewerName: "",
        review: "",
        rating: "",
      });
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewState({ ...reviewState, [name]: value });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <Typography variant="h5">Add Review</Typography>
          <IconButton onClick={onClose}>X</IconButton>
        </ModalHeader>
        <TextField
          label="Reviewer Name"
          name="reviewerName"
          value={reviewState.reviewerName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Review"
          name="review"
          value={reviewState.review}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Rating"
          name="rating"
          value={reviewState.rating}
          onChange={handleChange}
          type="number"
          fullWidth
          margin="normal"
        />
        <ButtonWrapper>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!isValid}>
            Submit
          </Button>
        </ButtonWrapper>
      </ModalContent>
    </Modal>
  );
};

export default AddReviewModal;
