import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Container = styled(Box)(({ theme }) => ({
  "& svg": {
    fontSize: "20px",
    color: theme.palette.white,
  },
  "& .round": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "30px",
    width: "30px",
    borderRadius: "50px",
    border: `1px solid ${theme.palette.white}`,
    marginRight: "15px",
  },

  "& .round:hover": {
    border: `1px solid ${theme.palette.pink2}`,
    backgroundColor: theme.palette.pink2,
    cursor: "pointer",
  },
}));

const socialIcons = [
  { Icon: FaInstagram, link: "" },
  { Icon: FaFacebookF, link: "" },
  { Icon: FaTwitter, link: "" },
  { Icon: FaLinkedinIn, link: "" },
];

const SocialMedia = () => {
  return (
    <Container>
      <Grid container>
        {socialIcons.map((Data, key) => (
          <div className="round" key={key}>
            <Data.Icon />
          </div>
        ))}
      </Grid>
    </Container>
  );
};

export default SocialMedia;
