import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { updateItemAction } from "../../store/Cart/actionTypes";
import PlusMinus from "../UI/PlusMinus/PlusMinus";

const ItemContainer = styled(Box)(({ theme }) => ({
  padding: "10px",
  borderBottom: `1px solid ${theme.palette.grey[400]}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const ItemImage = styled("img")({
  height: "100px",
  width: "100px",
  marginRight: "20px",
});

const ItemInfoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const ItemDetails = styled(Box)({
  marginLeft: "10px",
});

const ItemPrice = styled(Box)({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
});

const SeatInfoContainer = styled(Box)({
  marginLeft: "10px",
});

const SeatNumbersTypography = styled(Typography)(({ theme }) => ({
  margin: "10px 0 0 0",
  fontWeight: theme.typography.fontWeightBold,
}));

const SeatDetailsTypography = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
}));

const ItemData = ({ order }) => {
  const dispatch = useDispatch();

  const increaseCount = () => {
    dispatch(updateItemAction({ ...order, count: order.count + 1 }));
  };

  const decreaseCount = () => {
    dispatch(updateItemAction({ ...order, count: order.count - 1 }));
  };

  return (
    <ItemContainer>
      <ItemInfoContainer>
        <ItemImage src={order.imageUrl} alt={order.name} />
        <ItemDetails>
          <Typography variant="body1">
            {order.movieId !== undefined ? "Ticket" : order.name}
          </Typography>
          {order.movieId !== undefined ? (
            <SeatInfoContainer>
              <SeatNumbersTypography>X {order.count}</SeatNumbersTypography>
              <SeatDetailsTypography>
                {order.seatNumbers.join(" ")} - {order.showTime} - {order.date}
              </SeatDetailsTypography>
            </SeatInfoContainer>
          ) : (
            <PlusMinus
              decreaseCount={() => decreaseCount(order)}
              count={order.count}
              increaseCount={() => increaseCount(order)}
            />
          )}
        </ItemDetails>
      </ItemInfoContainer>
      <ItemPrice>
        <Typography variant="body1">
          $ {order.price} x {order.count} <br />
          <b>$ {parseFloat(order.price * order.count).toFixed(2)}</b>
        </Typography>
      </ItemPrice>
    </ItemContainer>
  );
};

export default ItemData;
