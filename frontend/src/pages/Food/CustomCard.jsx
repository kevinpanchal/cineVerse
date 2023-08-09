// Author - Roshil Ka Patel (B00917345)
import React from "react";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import CustomButton from "../../components/UI/CustomButton";
import PlusMinus from "../../components/UI/PlusMinus/PlusMinus";

function CustomCard({ data, onAdd, onIncrement, onDecrement, cartData }) {
  return (
    <Card sx={{ margin: "10px" }}>
      <CardMedia
        sx={{ minHeight: "250px", objectFit: "contain" }}
        image={data.imageUrl}
        title={data.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body1">{data.description}</Typography>
        <br />
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>$ {data.price}</Typography>
          {cartData ? (
            <PlusMinus
              increaseCount={() => {
                onIncrement({ ...cartData, count: cartData.count + 1 });
              }}
              decreaseCount={() => onDecrement({ ...cartData, count: cartData.count - 1 })}
              count={cartData.count}
            />
          ) : (
            <CustomButton variant="contained" color="secondary" onClick={() => onAdd()}>
              Buy
            </CustomButton>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CustomCard;
