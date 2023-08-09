import { Box, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomSpinner from "../../components/UI/CustomSpinner";
import axios from "../../utils/axios";
import { useLocation } from "react-router";
import { MdOutlineCheckCircleOutline, MdOutlineClose } from "react-icons/md";
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

const Success = () => {
  const { search } = useLocation();
  const sessionId = search.split("session_id=")[1];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const apiCheck = async () => {
    await axios
      .post("/payments/success", { sessionId })
      .then(({ data }) => {
        if (data.success) {
          setLoading(false);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    apiCheck();
    dispatch(clearCartAction());
  }, []);

  return (
    <Container>
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          {error ? (
            <>
              <MdOutlineClose
                style={{ fontSize: "5rem", color: "#d32f2f", marginBottom: "20px" }}
              />
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
            </>
          ) : (
            <>
              <MdOutlineCheckCircleOutline
                style={{ fontSize: "5rem", color: "#2e7d32", marginBottom: "20px" }}
              />
              <Typography color="secondary" variant="h1">
                Payment Successfull
              </Typography>
              <Typography
                variant="subtitle1"
                color="lightPurple"
                textAlign="center"
                style={{ marginTop: "20px" }}>
                Email with the ticket information is send to registered email address.
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
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Success;
