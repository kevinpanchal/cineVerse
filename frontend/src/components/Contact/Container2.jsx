import React from "react";
import CustomInput from "../UI/CustomInput";
import { Box, Grid, Typography } from "@mui/material";
import CustomButton from "../UI/CustomButton";
import CustomSpinner from "../UI/CustomSpinner";
import styled from "@emotion/styled";

const Container = styled(Box)(({ theme }) => ({
  padding: "2rem",
  "& .gridItem": {
    padding: "0 10px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "1.5rem",
  },
}));

const Container2 = ({
  isMobileScreen,
  inputFields,
  data,
  handleDataChange,
  handleOnSubmit,
  errors,
  disabled,
  // showMessage,
}) => {
  return (
    <Container>
      {isMobileScreen && (
        <Typography variant="h4" color="secondary">
          Please fill the form, our team will get back to you within 24 hours.
        </Typography>
      )}

      {/* {showMessage && (
        <Typography variant="h4" color="secondary">
          Request received, our team will contact you back soon.
        </Typography>
      )} */}
      <Grid container justifyContent="space-between">
        {inputFields.map((field, key) => (
          <Grid item xs={12} sm={6} key={key} className="gridItem">
            <CustomInput
              {...field}
              value={data[field.name]}
              onChange={(e) => handleDataChange(e, field.name)}
              error={Boolean(errors[field.name])}
              helperText={errors[field.name]}
              disabled={disabled}
            />
          </Grid>
        ))}
      </Grid>
      <Grid item xm={12} className="gridItem">
        <CustomInput
          label="Message"
          multiline={true}
          minRows={3}
          maxRows={4}
          name="message"
          value={data["message"]}
          onChange={(e) => handleDataChange(e, "message")}
          error={Boolean(errors["message"])}
          helperText={errors["message"]}
          disabled={disabled}
        />
      </Grid>
      <Grid container justifyContent="flex-end">
        {disabled ? (
          <CustomSpinner />
        ) : (
          <CustomButton
            variant="contained"
            color="secondary"
            style={{ marginTop: "20px" }}
            onClick={() => handleOnSubmit()}>
            Send Message
          </CustomButton>
        )}
      </Grid>
    </Container>
  );
};

export default Container2;
