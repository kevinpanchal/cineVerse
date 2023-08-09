import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import React from "react";

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  marginTop: "10px",
  "& ::after": {
    borderBottom: `2px solid ${theme.palette.secondary.main} !important`,
  },
  "& .MuiInputLabel-shrink": {
    color: `${theme.palette.secondary.main} !important`,
  },
}));

const CustomInput = (props) => {
  return <StyledInput variant="standard" {...props} />;
};

export default CustomInput;
