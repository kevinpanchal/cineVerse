import React from "react";
import SocialMedia from "./SocialMedia";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import ContactInfo from "./ContactInfo";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";

const Container = styled(Box)(({ theme }) => ({
  background: "linear-gradient(90deg, rgba(62,32,147,1) 0%, rgba(66,32,163,1) 16%)",
  borderRadius: 5,
  padding: "2rem",
  color: theme.palette.white,
  [theme.breakpoints.down("sm")]: {
    padding: "1.5rem",
  },
}));

const styles = {
  container1Section2: {
    marginTop: "5rem",
  },
};

const contactInfo = [
  { Icon: FaPhoneAlt, info: "+1 123 123 1234" },
  { Icon: MdEmail, info: "help@cineverse.com" },
  { Icon: MdLocationPin, info: "1333 South Park St, Halifax B3J2K9" },
];

const Container1 = ({ isMobileScreen }) => {
  return (
    <Container>
      <Typography variant="h3" style={{ marginBottom: "15px" }}>
        Contact Information
      </Typography>
      {!isMobileScreen && (
        <Typography variant="subtitile2">
          Please fill the form, our team will get back to you within 24 hours.
        </Typography>
      )}
      <div style={styles.container1Section2}>
        {contactInfo.map((data, key) => (
          <ContactInfo Icon={data.Icon} info={data.info} key={key} />
        ))}{" "}
      </div>
      <SocialMedia />
    </Container>
  );
};

export default Container1;
