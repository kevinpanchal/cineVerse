// Author - Roshil Ka Patel (B00917345)
import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const SuccessBtn = styled(Button)(() => ({
  borderColor: "#569d32",
  color: "#Ffffff",
  fontSize: "16px",
  backgroundColor: "#569d32",

  "&.MuiButton-root:hover": {
    border: "1px solid #569d32",
  },
  "& .MuiTouchRipple-child": {
    backgroundColor: "#569d32",
  },
  "&:hover": {
    backgroundColor: "#2e6213",
    borderColor: "#2e6213",
  },
}));

const SuccessButton = ({ ...rest }) => {
  return <SuccessBtn {...rest} />;
};

export default SuccessButton;
