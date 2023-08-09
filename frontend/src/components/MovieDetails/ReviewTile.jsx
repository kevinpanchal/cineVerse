import React from "react";
import { Container, Typography } from "@mui/material";
import styled from "@emotion/styled";

const TileWrapper = styled("div")(({ theme }) => ({
  width: 300,
  minWidth: 300,
  borderRadius: 10,
  backgroundColor: theme.palette.white,
  margin: "10px 5px",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
}));

const RatingText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  color: theme.palette.secondary.main,
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  textAlign: "justify",
}));

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  padding: "16px 0",
  width: "100%",
});

const TextWrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

const ReviewWrapper = styled("div")({
  display: "flex",
  padding: "16px 0",
});

const ReviewTile = ({ review }) => {
  return (
    <TileWrapper>
      <Container>
        <Wrapper>
          <TextWrapper>
            <Typography variant="h6">{review.reviewerName}</Typography>
            <RatingText variant="p">Rating: {review.rating}/10</RatingText>
          </TextWrapper>
          <ReviewWrapper>
            <Text>{review.review}</Text>
          </ReviewWrapper>
        </Wrapper>
      </Container>
    </TileWrapper>
  );
};

export default ReviewTile;
