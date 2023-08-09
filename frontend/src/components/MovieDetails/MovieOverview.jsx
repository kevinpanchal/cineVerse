import React from "react";
import { Container, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const slideInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled("div")(({ image }) => ({
  position: "relative",
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(10px)",
    zIndex: -1,
  },
}));

const ImageWrapper = styled("div")({
  marginRight: "24px",
  boxShadow: "0px 2px 8px rgba(99, 99, 99, 0.2)",
});

const Image = styled("img")({
  width: "250px",
  height: "300px",
  borderRadius: "10px",
  objectFit: "cover",
});

const BookButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.white,
  fontWeight: 600,
  marginTop: "1rem",
}));

const TextWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px",
  textAlign: "left",
  color: theme.palette.white,
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
  "@media only screen and (max-width: 600px)": {
    gap: "10px",
  },
}));

const DesText = styled(Typography)({
  fontSize: "12px",
  "@media only screen and (max-width: 600px)": {
    textAlign: "center",
  },
});

const RatingText = styled(Typography)({
  fontSize: "12px",
  "@media only screen and (max-width: 600px)": {
    textAlign: "center",
  },
});

const Div = styled("div")({
  display: "flex",
  padding: "4px 0",
  position: "relative",
  animation: `${slideInAnimation} 0.5s ease-in-out`,
  "@media only screen and (max-width: 600px)": {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
});

const MovieOverview = ({ data }) => {
  const languages = data.languages.join(", ");
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/theatre?id=${data._id}`);
  };

  const releaseDate = new Date(data.releaseDate).toISOString().split("T")[0];

  return (
    <Wrapper image={data.image}>
      <Container>
        <Div className="mainContainer">
          <ImageWrapper>
            <Image src={data.image} alt="movieImage" />
          </ImageWrapper>
          <TextWrapper className="textWrapper">
            <Typography variant="h3">{data.name}</Typography>
            <RatingText variant="p" className="ratingText">
              Rating: {data.movieRating.toFixed(2)}/10
            </RatingText>
            <DesText variant="p" className="desText">
              {data.duration} | {languages} | {releaseDate}
            </DesText>
            <BookButton variant="contained" size="large" onClick={handleBooking}>
              Book Now
            </BookButton>
          </TextWrapper>
        </Div>
      </Container>
    </Wrapper>
  );
};

export default MovieOverview;
