import React from "react";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

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

const TileWrapper = styled("div")({
  width: "200px",
  marginRight: "30px",
  animation: `${slideInAnimation} 0.5s ease-in-out`,
  cursor: "pointer",
  "@media only screen and (max-width: 600px)": {
    minWidth: "150px",
  },
});

const Image = styled("img")({
  borderRadius: "15px",
  marginBottom: "10px",
  width: "100%",
  height: "300px",
  boxShadow: `0px 2px 8px rgba(99, 99, 99, 0.2)`,
});

const Text = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body1,
  textAlign: "center",
}));

const MovieTile = ({ movie }) => {
  return (
    <TileWrapper>
      <div className="d-flex flex-column">
        <Image src={movie.image} alt="movieImg" />
        <Text>{movie.name}</Text>
      </div>
    </TileWrapper>
  );
};

export default MovieTile;
