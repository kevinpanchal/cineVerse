import { Box, Typography, styled } from "@mui/material";
import React, { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCartAction } from "../../store/Cart/actionTypes";

const Container = styled(Box)(() => ({
  minHeight: "calc(100vh - 44px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));

const Failure = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCartAction());
  }, []);

  return (
    <Container>
      <MdOutlineClose style={{ fontSize: "5rem", color: "#d32f2f", marginBottom: "20px" }} />
      <Typography color="secondary" variant="h1">
        Payment Failed
      </Typography>
      <Typography
        variant="subtitle1"
        color="lightPurple"
        textAlign="center"
        style={{ marginTop: "20px" }}>
        We are unable to process the payment. Can you please try again.
      </Typography>
      <Link to="/">
        <Typography
          variant="subtitle1"
          color="lightPurple"
          textAlign="center"
          style={{ marginTop: "20px" }}>
          Go Home
        </Typography>
      </Link>
    </Container>
  );
};

export default Failure;
