import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const Container = styled(Box)(({ theme }) => ({
  margin: "2rem 0",
  "& svg": {
    fontSize: "20px",
    marginRight: "15px",
    color: theme.palette.pink2,
  },
}));

const ContactInfo = ({ Icon, info }) => {
  return (
    <Container>
      <Grid container alignItems="center">
        <Grid item xs={2} lg={1}>
          <Icon />
        </Grid>
        <Grid item xs={10} lg={11}>
          <Typography variant="body1">{info}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactInfo;
