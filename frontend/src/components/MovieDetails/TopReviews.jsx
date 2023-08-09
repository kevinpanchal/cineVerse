import React, { useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

import ReviewTile from "./ReviewTile";
import AddReviewModal from "./AddReviewModal";
import axios from "axios";
import { isLogin } from "../../utils/functions";
import { toast } from "react-toastify";

const slideInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MainWrapper = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const ReviewWrapper = styled("div")`
  overflow: auto;
  width: 100%;
  "&::-webkit-scrollbar": {
    display: none
  },
  "&::-webkit-scrollbar-thumb": {
    display: none
  },
`;

const NoReviewsWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
`;

const Wrapper = styled(Box)({
  display: "flex",
  gap: "1rem",
  animation: `${slideInAnimation} 0.5s ease-in-out`,
});

const Text = styled(Typography)(({ theme }) => ({
  size: theme.typography.h5,
  fontWeight: "bold",
}));

const TopReviews = ({ reviews, id, updateMovie }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (reviewState) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/movie/${id}/reviews`,
        reviewState
      );
      if (data.success) {
        const movieData = data.data;
        updateMovie(movieData);
        toast.success("Review Added Successfully");
      }
      setOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <Container>
      <AddReviewModal open={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
      <MainWrapper>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Text>Top Reviews</Text>
          <Button onClick={() => setOpen(true)} disabled={!isLogin()}>
            Add Review &gt;
          </Button>
        </Box>
        {reviews.length > 0 ? (
          <ReviewWrapper>
            <Wrapper>
              {reviews.map((review, i) => (
                <ReviewTile key={i} review={review} />
              ))}
            </Wrapper>
          </ReviewWrapper>
        ) : (
          <NoReviewsWrapper>
            <Typography variant="h5">No Reviews Yet</Typography>
          </NoReviewsWrapper>
        )}
      </MainWrapper>
    </Container>
  );
};

export default TopReviews;
