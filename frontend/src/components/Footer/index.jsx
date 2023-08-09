import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Wrapper = styled("div")({
  backgroundColor: "#222",
  color: "#fff",
  padding: "1rem",
});

const FooterContainer = styled(Box)({
  display: "flex",
  paddingTop: "2rem",
  justifyContent: "space-between",
  "@media only screen and (max-width: 600px)": {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

const FooterColumn = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "30%",
  marginBottom: 0,
  "@media only screen and (max-width: 600px)": {
    width: "100%",
    marginBottom: "1.5rem",
  },
});

const FooterLink = styled(Typography)({
  color: "#fff",
  textDecoration: "none",
  marginBottom: "0.5rem",
  cursor: "pointer",
  width: "fit-content",
  "&:hover": {
    textDecoration: "underline",
  },
});

const Footer = () => {
  const navigate = useNavigate();
  const links = [
    { name: "Home", link: "/" },
    { name: "Contact", link: "/contact" },
    { name: "FAQs", link: "/faq" },
  ];

  return (
    <Wrapper>
      <FooterContainer>
        <FooterColumn>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            CineVerse
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your ultimate destination for movie bookings and entertainment.
          </Typography>
        </FooterColumn>
        <FooterColumn>
          <Typography variant="body3" marginBottom="10px" fontWeight="bold">
            Useful Links:
          </Typography>
          {links.map((link) => (
            <FooterLink key={link.name} onClick={() => navigate(link.link)}>
              {link.name}
            </FooterLink>
          ))}
        </FooterColumn>
        <FooterColumn>
          <Typography variant="body3" marginBottom="10px" fontWeight="bold">
            Contact Us:
          </Typography>
          <Typography variant="p" marginBottom="10px">
            Email: help@cineverse.com
          </Typography>
          <Typography variant="p">Phone: +1 123 123 1234</Typography>
        </FooterColumn>
      </FooterContainer>
      <Typography variant="body2" marginTop="10px" textAlign="center">
        © 2023 CineVerse. All rights reserved.
      </Typography>
    </Wrapper>
  );
};

export default Footer;
