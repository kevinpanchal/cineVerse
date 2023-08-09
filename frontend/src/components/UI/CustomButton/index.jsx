import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)(() => ({
  padding: "10px 20px",
  borderRadius: "10px",
}));

const CustomButton = (props) => {
  return <StyledButton {...props} />;
};

export default CustomButton;
