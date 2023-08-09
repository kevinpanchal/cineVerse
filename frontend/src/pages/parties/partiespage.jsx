import React from "react";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;

  .image-container {
    position: relative;
    width: 80%;
    height: 400px;
    max-width: 10000px;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
    animation: slideFade 5s linear infinite;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  @keyframes slideFade {
    0%,
    100% {
      transform: translateY(0%);
      opacity: 0.5;
    }
    25% {
      transform: translateY(-5%);
      opacity: 1;
    }
    75% {
      transform: translateY(5%);
      opacity: 1;
    }
  }

  .slick-slider {
    width: 100%;
  }

  .slick-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }
`;
const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const images = [
    require("./partyimage3.jpg"),
    require("./partyimage1.jpg"),
    require("./partyimage2.jpg"),
  ];

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className="image-container">
          <img src={image} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};

const Container = styled(Box)(() => ({
  margin: "2rem 0",
}));

const LeftAlignedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 50px;
`;
const TicketWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: scale(1);
  transition: all 0.3s ease;

  &::before,
  &::after,
  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 5px;
    background-color: #222;
    border-radius: 50%;
  }

  &::before {
    height: 100%;
    left: -5px;
  }

  &::after {
    height: 40%;
    left: -5px;
    top: 30%;
  }

  &:hover {
    background-color: #f9f2f4;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: scale(1.05) rotate(-2deg);
  }

  &:after {
    position: absolute;
    content: "";
    top: 5vw;
    left: 0;
    right: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    transform: scale(0.75);
    filter: blur(5vw);
    background: linear-gradient(white, white, lightpink);
    background-size: 200% 200%;
    animation: animateGlow 2s ease infinite;

    @keyframes animateGlow {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  }
`;

const TicketHeader = styled.div`
  width: 100%;
  padding: 0.5rem;
  background-color: #222;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  border-radius: 15px 15px 0 0;
  box-shadow: inset 4px 4px 0 0 #fff, inset -4px -4px 0 0 #fff;
`;

const TicketContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  text-align: center;
  font-weight: 300;
  font-family: "Chewy";

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & li {
    margin: 0.5rem 0;
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

const testimonialData = [
  {
    name: "John Doe",
    title: "Movie Enthusiast",
    comment: "Great service and easy booking process. Highly recommended!",
  },
  {
    name: "Jane Smith",
    title: "Film Lover",
    comment: "The popcorn parties were a hit! Everyone had a blast.",
  },
  {
    name: "Michael Johnson",
    title: "Cinema Fanatic",
    comment: "XSCAPE Arcade is a unique and fun experience for all ages.",
  },
];

const getRandomTestimonial = () => {
  const randomIndex = Math.floor(Math.random() * testimonialData.length);
  return testimonialData[randomIndex];
};

const generateTestimonials = (count) => {
  const testimonials = [];
  for (let i = 0; i < count; i++) {
    testimonials.push(getRandomTestimonial());
  }
  return testimonials;
};

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const TestimonialContainer = styled.div`
    width: 700px;
    margin: 50px auto;
    background-color: #f9f9f9;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  `;

  const TestimonialItem = styled.div`
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    & p {
      margin: 1rem 0;
      color: #555;
    }

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  `;

  const TestimonialName = styled.p`
    font-weight: bold;
    color: #222;
    margin-bottom: 5px;
    font-size: 1.2rem;
  `;

  const TestimonialTitle = styled.p`
    font-style: italic;
    color: #555;
  `;
  const testimonials = generateTestimonials(3);

  return (
    <TestimonialContainer>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <TestimonialItem key={index}>
            <p>{testimonial.comment}</p>
            <TestimonialName>{testimonial.name}</TestimonialName>
            <TestimonialTitle>{testimonial.title}</TestimonialTitle>
          </TestimonialItem>
        ))}
      </Slider>
    </TestimonialContainer>
  );
};
const partiespage = () => {
  const navigate = useNavigate();
  const handleCardButtonClick = () => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/parties/longtermrental");
    } else {
      navigate("/login");
    }
  };
  const navigateToXSCAPE = () => {
    window.location.href = "https://www.playdium.com/";
  };
  return (
    <Container>
      <ImageContainer>
        <ImageSlider />
      </ImageContainer>
      <Typography variant="h1" color="darkBlue" textAlign="center">
        Parties at Cineverse
      </Typography>
      <Typography variant="subtitle1" color="lightPurple" textAlign="center">
        Celebrate your special moments with us!
      </Typography>

      <TicketWrapper>
        <TicketHeader>Long Term Rental</TicketHeader>
        <TicketContent>
          <p>
            CineVerse is the perfect venue for your next big day. Whether its a birthday party,
            anniversary celebration, or any special occasion, our long-term rental packages offer
            you the opportunity to have a private movie theater experience with your loved ones.
          </p>
          <p>
            Our state-of-the-art theaters, comfortable seating, and top-notch audiovisual systems
            ensure that your event will be memorable for everyone attending.
          </p>
        </TicketContent>
        <CardButton onClick={handleCardButtonClick}>Go to Long Term Rental</CardButton>
      </TicketWrapper>
      <TicketWrapper>
        <TicketHeader>XSCAPE Arcade</TicketHeader>
        <TicketContent>
          <p>
            Want an epic party that will be talked about for years? Have it at XSCAPE! Our XSCAPE
            Arcade parties are the ultimate gaming experience for all ages.
          </p>
          <p>
            **Paid Partnership with Playdium:** We are proud to announce that we have a paid
            partnership with Playdium, a leading gaming company. This partnership allows us to
            provide you with exclusive games, offers, and discounts, making your XSCAPE Arcade party
            even more enjoyable and memorable.
          </p>
        </TicketContent>
        <CardButton onClick={navigateToXSCAPE}>Go to XSCAPE Arcade</CardButton>
      </TicketWrapper>

      <TestimonialSlider />

      <LeftAlignedContainer>
        <div className="card-content">
          <h3>More Questions?</h3>
          <p>Visit our FAQ to learn more.</p>
        </div>

        <CardButton onClick={() => navigate("/faq")}>Visit FAQ</CardButton>
      </LeftAlignedContainer>
    </Container>
  );
};
export default partiespage;
