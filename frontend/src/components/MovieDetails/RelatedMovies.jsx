import React from "react";
import { Container, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";

import MovieTile from "./MovieTile";
import { useNavigate } from "react-router-dom";

const BoxWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  padding: "16px 0",
  gap: "1rem",
});

const Wrapper = styled(Box)({
  overflow: "auto",
  width: "100%",
  display: "flex",
  margin: "10px 0",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "&::-webkit-scrollbar-thumb": {
    display: "none",
  },
});

const Text = styled(Typography)(({ theme }) => ({
  size: theme.typography.h5,
  fontWeight: "bold",
}));

const NoRelatedMoviesWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  width: "100%",
});

const RelatedMovies = ({ relatedMovies }) => {
  const navigate = useNavigate();

  const handleRedirect = (movieId) => {
    navigate(`/movies?id=${movieId}`);
  };

  return (
    <Container>
      <BoxWrapper>
        <Box display="flex">
          <Text>You might also like</Text>
        </Box>
        {relatedMovies.length > 0 ? (
          <Wrapper>
            {relatedMovies.map((movie, i) => (
              <Box key={i} onClick={() => handleRedirect(movie._id)}>
                <MovieTile movie={movie} />
              </Box>
            ))}
          </Wrapper>
        ) : (
          <NoRelatedMoviesWrapper>
            <Typography variant="h5">No Related Movies</Typography>
          </NoRelatedMoviesWrapper>
        )}
      </BoxWrapper>
    </Container>
  );
};

export default RelatedMovies;
