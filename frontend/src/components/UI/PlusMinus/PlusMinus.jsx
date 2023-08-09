import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

const CustomContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginTop: "10px",
}));

const styles = {
  incDecButton: {
    display: "flex",
    alignItems: "center",
    border: "none",
    background: "none",
    fontSize: "30px",
    color: "#3E2093",
    marginRight: "5px",
    cursor: "pointer",
  },
  typo: {
    minWidth: "25px",
  },
};

const PlusMinus = ({ increaseCount, decreaseCount, count }) => {
  return (
    <CustomContainer>
      <button onClick={() => decreaseCount()} style={styles.incDecButton}>
        <CiCircleMinus />
      </button>
      <Typography variant="h4" align="center" style={styles.typo}>
        {count}
      </Typography>
      <button onClick={() => increaseCount()} style={styles.incDecButton}>
        <CiCirclePlus />
      </button>
    </CustomContainer>
  );
};

export default PlusMinus;
