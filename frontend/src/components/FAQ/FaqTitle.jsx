import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";

const BoxWrapper = styled(Box)({
  "&.MuiBox-root": {
    padding: "5rem 0",
  },
});
const FAQTitle = () => {
  return (
    <BoxWrapper>
      <Typography variant="h1" color="darkBlue" textAlign="center">
        Frequently Asked Questions
      </Typography>
      <Typography variant="subtitle1" color="lightPurple" textAlign="center">
        Any doubt? Just check here!
      </Typography>
    </BoxWrapper>
  );
};

export default FAQTitle;
