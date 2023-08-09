import styled from "@emotion/styled";
import { Box, CircularProgress } from "@mui/material";
import React from "react";

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: `${theme.palette.secondary.main} !important`,
  margin: "10px",
}));
const Container = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const index = (props) => {
  if (props.center) {
    return (
      <Container>
        <StyledCircularProgress {...props} />
      </Container>
    );
  }
  return <StyledCircularProgress {...props} />;
};

export default index;
