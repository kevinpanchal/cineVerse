import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

const Container = styled(Box)(() => ({
  margin: "2rem 0",
}));

const XSCAPEPage = () => {
  return (
    <Container>
      {/* Header */}
      <Typography variant="h1" color="darkBlue" textAlign="center">
        ATTRACTIONS, ARCADE & EVENTS | LIVE WILD
      </Typography>
      <Typography variant="subtitle1" color="lightPurple" textAlign="center">
        Attention
      </Typography>
      <Typography variant="body1" color="darkBlue" textAlign="center">
        NOW OPEN!
      </Typography>

      {/* Main Content */}
      <Typography variant="h2" color="darkBlue" textAlign="center">
        PLAY.
      </Typography>
      <Typography variant="body1" color="darkBlue" textAlign="center">
        GRAB a game tag and take control! Challenge your friends in a VR adventure, score a strike
        in the bowling lane, walk on the edge with our ropes course or battle it out on our video
        games.
      </Typography>

      <Typography variant="h2" color="darkBlue" textAlign="center">
        EAT.
      </Typography>
      <Typography variant="body1" color="darkBlue" textAlign="center">
        WHETHER you have had a sweet victory or a salty loss, you are gonna get the munchies.But
        donot worry we have got you.
      </Typography>
    </Container>
  );
};

export default XSCAPEPage;
