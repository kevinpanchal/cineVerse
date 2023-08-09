import React from "react";
import MovieCard from "./MovieCard";
import styled from "@emotion/styled";
import theme from "../../../src/theme";
import { useNavigate } from "react-router-dom";

const Title = styled("h3")({
  padding: "0 1rem",
  marginBottom: "10px",
  color: theme.palette.brown,
  fontFamily: theme.typography.h2.fontFamily,
  fontSize: theme.typography.h2.fontSize,
  fontWeight: theme.typography.h2.fontWeight,
});

const MovieListContainer = styled("div")({
  marginBottom: "20px",
  overflowX: "auto",
  overflowY: "hidden",
  whiteSpace: "nowrap",
  padding: "0rem 1rem 0rem 1rem",
});

const MovieScrollList = styled("div")({
  display: "flex",
  paddingBottom: "10px",
  marginBottom: "-10px",
  width: "max-content",
});

const MovieContainer = styled("div")({
  flex: "0 0 auto",
  marginRight: "10px",
  textAlign: "center",
  minWidth: "200px",
  width: "fit-content",
});

export default function MovieList({ title, movies }) {
  const navigate = useNavigate();
  const handleRedirect = (movieId) => {
    navigate(`/movies?id=${movieId}`);
  };
  return (
    <>
      <Title>{title}</Title>
      <MovieListContainer>
        <MovieScrollList>
          {movies.map((movie) => (
            <MovieContainer key={movie._id} onClick={() => handleRedirect(movie._id)}>
              <MovieCard title={movie.name} genre={movie.genre} poster={movie.image} />
            </MovieContainer>
          ))}
        </MovieScrollList>
      </MovieListContainer>
    </>
  );
}
