import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import theme from "../../../src/theme";
import { useNavigate } from "react-router-dom";

const CurrentMovieBannerContainer = styled("div")({
  position: "relative",
  width: "100%",
  height: "calc(70vh - 120px)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  objectFit: "cover",
  justifyContent: "center",
  color: theme.palette.white,
  cursor: "pointer",
});

const OverlayContainer = styled("div")({
  position: "absolute",
  bottom: 0,
  left: 0,
  padding: "20px",
  background: `linear-gradient(to right top, rgba(0, 0, 0, 0.3) 35%, rgba(0, 0, 0, 0) 60%)`,
});

const Title = styled("h2")({
  fontSize: theme.typography.h2.fontSize,
  fontWeight: theme.typography.h2.fontWeight,
  marginBottom: "10px",
  fontFamily: theme.typography.h2.fontFamily,
});

const Description = styled("p")({
  fontSize: theme.typography.body1.fontSize,
  fontFamily: theme.typography.body1.fontFamily,
});

export default function CurrentMovieBanner({ movies }) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const currentMovie = movies[currentMovieIndex];

  return (
    <CurrentMovieBannerContainer
      style={{ backgroundImage: `url(${currentMovie.image})` }}
      onClick={() => navigate(`/movies?id=${currentMovie._id}`)}>
      <OverlayContainer>
        <Title>{currentMovie?.name}</Title>
        <Description>{currentMovie?.description}</Description>
      </OverlayContainer>
    </CurrentMovieBannerContainer>
  );
}
