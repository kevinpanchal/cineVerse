import React, { useState } from "react";
import { Box, Card, Grid, Typography, styled } from "@mui/material";
import CustomButton from "../../components/UI/CustomButton";
import CustomSpinner from "../../components/UI/CustomSpinner";
import { useDispatch, useSelector } from "react-redux";
import ItemData from "../../components/Summary/ItemData";
import axios from "../../utils/axios";
import { clearCartAction } from "../../store/Cart/actionTypes";
import { toast } from "react-toastify";

const styles = {
  box: {
    "&.MuiBox-root": {
      padding: "5rem 0",
    },
  },
};

const Container = styled(Box)(() => ({
  minHeight: "calc(100vh - 48px)",
  padding: "10px",
}));

const CustomCard = styled(Card)(() => ({
  padding: "10px",
}));

const Summary = () => {
  const { items } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const getTotal = () => {
    let total = 0;
    items.forEach((entry) => {
      total = total + entry.count * entry.price;
    });
    return total;
  };

  const addSeats = async () => {
    const ticketData = items.filter((item) => item !== undefined && item?.movieId !== undefined)[0];
    await axios.post(`/screen/${ticketData.movieId}/${ticketData.theatreId}`, {
      seatNumbers: ticketData.seatNumbers,
      date: ticketData.date,
      showTime: ticketData.showTime,
    });
  };

  const startCheckout = async () => {
    addSeats();
    setLoading(true);
    axios
      .post("/payments/createSesssion", { items })
      .then(({ data }) => {
        if (data.data.link) {
          window.location.href = data.data.link;
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
        setLoading(false);
      });
  };

  const clearCart = () => {
    dispatch(clearCartAction());
  };

  return (
    <Container>
      <Box sx={styles.box}>
        <Typography variant="h1" color="darkBlue" textAlign="center">
          Order Summary
        </Typography>
      </Box>
      <CustomCard>
        {items.length === 0 ? (
          <Typography variant="body1" textAlign="center" mt={2}>
            No items in cart.
          </Typography>
        ) : (
          items.map((order, key) => <ItemData order={order} key={key} />)
        )}
        {items.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
            }}>
            <Typography variant="h3">
              <b>Total</b>
            </Typography>
            <Typography variant="h3">
              <b>$ {parseFloat(getTotal()).toFixed(2)}</b>
            </Typography>
          </div>
        )}
      </CustomCard>

      <Grid container justifyContent="space-between">
        <CustomButton
          variant="contained"
          sx={{ marginTop: "10px" }}
          onClick={clearCart}
          disabled={!items.length}>
          Clear
        </CustomButton>
        {loading ? (
          <CustomSpinner />
        ) : (
          <CustomButton
            variant="contained"
            sx={{ marginTop: "10px" }}
            onClick={() => startCheckout()}
            disabled={!items.length}>
            Proceed to checkout
          </CustomButton>
        )}
      </Grid>
    </Container>
  );
};

export default Summary;
