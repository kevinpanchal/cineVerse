// Author - Roshil Ka Patel (B00917345)
import React, { useState, useMemo, useEffect } from "react";
import { Box, Button, Grid, Fab, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomCard from "./CustomCard";
import CustomButton from "../../components/UI/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { getFoodItemsAction } from "../../store/FoodAndBeverages/actions";
import CustomSpinner from "../../components/UI/CustomSpinner/index";
import { useNavigate } from "react-router";
import { addItemAction, updateItemAction } from "../../store/Cart/actionTypes";

const styles = {
  boxRoot: {
    "&.MuiBox-root": {
      marginTop: "60px",
      padding: "10px",
    },
  },
  box: {
    "&.MuiBox-root": {
      padding: "5rem 0",
    },
  },
  buttonsContainer: {
    "&.MuiBox-root": {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "center",
    },
  },
  activeButton: {
    color: "#ffffff",
    borderColor: "#e53861",
    backgroundColor: "#e53861",
  },
};

const StyledButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  //   color: theme.palette.black,
  margin: "10px",
  fontSize: "16px",
  borderRadius: "50px",
  "&.MuiButton-root:hover": {
    border: "1px solid #e53861",
  },
  "& .MuiTouchRipple-child": {
    backgroundColor: "#e53861",
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "5px",
    fontSize: "12px",
  },
}));

const CustomFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: "10px",
  left: "10px",
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: "#e53861",
    color: "#fff",
  },
}));

const buttons = ["All", "Food", "Beverages", "Combos"];

const FoodandBeverages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { foodItems, loading } = useSelector((state) => state.foodReducer);
  const { items } = useSelector((state) => state.cartReducer);

  const [selectedButton, setSelectedButton] = useState(0);

  const handleDataAdd = (item) => {
    dispatch(addItemAction(item));
  };

  const filteredData = useMemo(() => {
    if (selectedButton === 1) {
      return foodItems.filter((item) => item.category === "food");
    } else if (selectedButton === 2) {
      return foodItems.filter((item) => item.category === "beverage");
    } else if (selectedButton === 3) {
      return foodItems.filter((item) => item.category === "combo");
    } else return foodItems;
  }, [selectedButton, foodItems]);

  const onIncrement = (data) => {
    dispatch(updateItemAction(data));
  };
  const onDecrement = (data) => {
    dispatch(updateItemAction(data));
  };

  useEffect(() => {
    dispatch(getFoodItemsAction());
  }, [dispatch]);

  return (
    <Box sx={styles.boxRoot}>
      {loading ? (
        <CustomSpinner center={true} />
      ) : (
        <>
          <Box sx={styles.box}>
            <Typography variant="h1" color="darkBlue" textAlign="center">
              Food and Beverages
            </Typography>
            <Typography variant="subtitle1" color="lightPurple" textAlign="center">
              Food for the soul!
            </Typography>
          </Box>
          <Box sx={styles.buttonsContainer}>
            {buttons.map((button, key) => (
              <StyledButton
                key={key}
                variant={selectedButton === key ? "contained" : "outlined"}
                sx={selectedButton === key ? styles.activeButton : ""}
                onClick={() => setSelectedButton(key)}>
                {button}
              </StyledButton>
            ))}
          </Box>
          <Box>
            <Grid container>
              {filteredData.map((item, key) => (
                <Grid item xs={6} sm={4} lg={3} key={key} style={{ height: "100%" }}>
                  <CustomCard
                    data={item}
                    onAdd={() => handleDataAdd(item)}
                    cartData={items.filter((data) => data._id === item._id)[0]}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <CustomFab disableRipple={true}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src="/cart.svg" style={{ height: "20px", width: "20px" }} alt="cart" />
              <span style={{ marginLeft: "2px", color: "white" }}>{items.length}</span>
            </div>
          </CustomFab>
          <Grid container justifyContent="flex-end">
            <CustomButton
              variant="contained"
              disabled={items.length === 0}
              onClick={() => navigate("/summary")}>
              Continue
            </CustomButton>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default FoodandBeverages;
