import React from "react";
import { Container, Typography } from "@mui/material";
import styled from "@emotion/styled";

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  padding: "16px 0",
  marginTop: "10px",
  gap: "1rem",
});

const Text = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  textAlign: "justify",
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h5,
  fontWeight: "bold",
}));

const AboutMovie = ({ description }) => {
  return (
    <Container>
      <Wrapper>
        <Heading>About the movie</Heading>
        <Text>{description}</Text>
      </Wrapper>
    </Container>
  );
};

export default AboutMovie;
