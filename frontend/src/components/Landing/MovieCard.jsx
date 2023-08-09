import React from "react";
import styled from "@emotion/styled";
import theme from "../../../src/theme";

const MovieCardContainer = styled("div")({
  width: "200px",
  margin: "10px",
  border: "1px solid #ddd",
  borderRadius: "15px",
  boxShadow: "2px 2px 4px rgba(100, 100, 100, 0.2)",
  overflow: "hidden",
  cursor: "pointer",
});

const PosterContainer = styled("div")({
  height: "277px",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const DetailsContainer = styled("div")({
  padding: "10px",
  backgroundColor: theme.palette.white,
});

const Title = styled("h3")({
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.h4.fontWeight,
  color: theme.palette.brown,
  marginBottom: "5px",
  fontFamily: theme.typography.h4.fontFamily,
});

const Genre = styled("p")({
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.lightBrown,
  fontFamily: theme.typography.body2.fontFamily,
});

export default function MovieCard({ title, genre, poster }) {
  return (
    <MovieCardContainer>
      <PosterContainer>
        <img src={poster} alt={title} />
      </PosterContainer>
      <DetailsContainer>
        <Title>{title}</Title>
        <Genre>{genre}</Genre>
      </DetailsContainer>
    </MovieCardContainer>
  );
}
