import { React, useState } from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled(Box)(() => ({
  margin: "2rem 0",
  padding: "2rem",
  transition: "padding 0.3s ease-in-out",
  "@media (max-width: 768px)": {
    padding: "1rem",
  },
}));

const RentalCard = styled.div`
  /* Styles for the rental card */
  position: relative;
  width: calc(33.33% - 10px); /* Adjust the width to fill the available space in the row */
  height: 250px;
  border-radius: 14px;
  z-index: 1111;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 2px solid #ccc; /* Light grey border */
  padding: 20px;
  margin-bottom: 20px;
  margin: 0 auto;
  background-color: #f9f9f9;

  /* Screen-like effect */
  &::before {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: 80%; /* Adjusted to cover most of the card */
    border: 2px solid #ccc;
    border-radius: 14px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
    pointer-events: none; /* Disable interaction with the pseudo-element */
  }

  /* Keyboard-like effect at the bottom */
  &::after {
    content: "";
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: 30px;
    background-color: #d9d9d9; /* Light grey background */
    border-radius: 0 0 10px 10px; /* Rounded bottom corners */
  }

  /* Camera icon on top */
  &::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;
    border: 2px solid #000;
    border-radius: 50%;
    background-color: #000;
    z-index: 2; /* Bring the camera icon above the pseudo-elements */
  }

  /* Stand */
  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 8px;
    background-color: #ccc; /* Light grey stand color */
    border-radius: 0 0 8px 8px; /* Rounded bottom stand corners */
  }
`;
const CardButton = styled.button`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  margin-top: 1rem;
  background: #e91e63;
  color: #fff;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #d81c60;
    transform: scale(1.1);
  }
`;
const TypesOfScreeningsContainer = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  transition: padding 0.3s ease-in-out;
  @media (max-width: 768px) {
    padding: 1rem;
  }
  position: relative;
  width: 100%;
  height: 50vh;
  max-width: 10000px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  &:hover {
    background-color: #f1f1f1;
  }

  .cardDetailsHeader {
    color: #000;
    transition: color 0.3s ease-in-out;
  }

  &:hover .cardDetailsHeader {
    color: #e91e63;
  }

  .cardDetails {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;
    perspective: 1000px;
  }
`;
const SlideContainer = styled.div`
  /* Styles for the individual slide container */
  width: 100%;
  height: 100%;
  display: flex; /* Display as a flex container */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  transform-style: preserve-3d; /* Enable 3D transformation */
  transition: transform 0.8s;
`;

const Slide = styled.div`
  /* Styles for the slide content */
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* Hide the backface of the slide when flipping */
  transform-style: preserve-3d;
  transition: transform 0.8s;
  display: flex; /* Display as a flex container */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  flex-direction: column; /* Adjusted to column */
  padding: 1rem;
`;

const FrontSide = styled(Slide)`
  /* Styles for the front side of the slide */
  transform: ${({ flipped }) => (flipped ? "rotateY(180deg)" : "rotateY(0)")};
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  z-index: 2;
`;

const BackSide = styled(Slide)`
  /* Styles for the back side of the slide */
  transform: ${({ flipped }) => (flipped ? "rotateY(0)" : "rotateY(-180deg)")};
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  z-index: 1;
`;
const CorporateScreeningCardContent = () => (
  <div className="card one">
    <div className="cardDetails">
      <h2 className="cardDetailsHeader">Corporate Screening</h2>
      <p>
        Rent the entire auditorium for your clients or employees and make a big impression with the
        latest Hollywood movie. Complement the movie with concessions, a reception, in-theatre
        presentations, and catering before or after the show.
      </p>
      <p>
        Benefits of Corporate Screening:
        <ul>
          <li>Exclusive access to the entire auditorium</li>
          <li>Customizable showtimes to suit your schedule</li>
          <li>Opportunity to showcase your brand on the big screen</li>
          <li>Complimentary popcorn and beverages for attendees</li>
        </ul>
      </p>
    </div>
  </div>
);

const SocialGroupsCardContent = () => (
  <div className="card two">
    <div className="cardDetails">
      <h2 className="cardDetailsHeader">Social Groups</h2>
      <p>
        Looking to celebrate a loved one or make your night a little extra special? Rent out a
        theatre for a private screening of the latest films, or share your favourite classic with
        your loved ones in an auditorium all to yourselves. Pre-order your favourite snacks and
        concession items.
      </p>
      <p>
        Benefits of Social Group Screenings:
        <ul>
          <li>Private auditorium for you and your group</li>
          <li>Choose from a selection of the latest blockbuster movies or classic films</li>
          <li>Option to pre-order your favorite snacks and drinks</li>
          <li>Create cherished memories with friends and family in a unique setting</li>
        </ul>
      </p>
    </div>
  </div>
);

const MondayFrancoPhoneCardContent = () => (
  <div className="card three">
    <div className="cardDetails">
      <h2 className="cardDetailsHeader">Monday Franco Phone</h2>
      <p>
        Bring your class out to experience the French language on the big screen. Inquire today for
        more information. At participating theatres only: International Village, Dieppe,
        Fredericton, SC Sudbury, North Bay, SC St. Vital, Miramichi, & Cornwall. Some restrictions
        apply.
      </p>
      <p>
        Benefits of Monday Franco Phone Screenings:
        <ul>
          <li>Enhance language learning through immersive cinema</li>
          <li>Screen French-language films with subtitles for easier understanding</li>
          <li>Opportunity for interactive discussions after the screening</li>
          <li>Special group rates available for educational institutions</li>
        </ul>
      </p>
    </div>
  </div>
);

const TypesOfScreeningsSlider = () => {
  const slides = [
    <CorporateScreeningCardContent key={1} />,
    <SocialGroupsCardContent key={2} />,
    <MondayFrancoPhoneCardContent key={3} />,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800, // Decrease the speed for a faster flip animation
    slidesToShow: 1, // Set to 1 to prevent content duplication
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  return (
    <TypesOfScreeningsContainer>
      <Typography variant="h2" color="darkBlue" textAlign="center">
        Types of Screenings
      </Typography>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <SlideContainer
            key={index}
            style={{
              transform: currentSlide === index ? "rotateY(0)" : "rotateY(180deg)",
            }}>
            <FrontSide flipped={currentSlide !== index}>{slide}</FrontSide>
            <BackSide flipped={currentSlide === index}>{slide}</BackSide>
          </SlideContainer>
        ))}
      </Slider>
    </TypesOfScreeningsContainer>
  );
};

const longtermrental = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/parties/inquirenow");
  };
  return (
    <Container>
      <Typography variant="h1" color="darkBlue" textAlign="center">
        Long Term Rentals
      </Typography>
      <Typography variant="subtitle1" color="lightPurple" textAlign="center">
        Celebrate your special moments with us!
      </Typography>
      <TypesOfScreeningsSlider />
      <RentalCard>
        <h3>Screening Inquiry</h3>
        <p>Interested in organizing a special screening event?</p>
        <CardButton onClick={handleButtonClick}>Inquire Now</CardButton>
      </RentalCard>
    </Container>
  );
};

export default longtermrental;
