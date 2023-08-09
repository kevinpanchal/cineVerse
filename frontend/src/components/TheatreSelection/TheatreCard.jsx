import React from "react";
import styled from "@emotion/styled";
import theme from "../../theme";

const TheatreCardContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.white,
  padding: "16px",
  borderRadius: "8px",
  marginBottom: "16px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  "@media (max-width: 700px)": {
    padding: "12px",
    marginBottom: "12px",
  },
});

const TheatreName = styled("h2")({
  color: theme.palette.brown,
  fontSize: "24px",
  fontWeight: "bold",
  "@media (max-width: 700px)": {
    fontSize: "20px",
  },
});

const TimeTileContainer = styled("div")({
  display: "flex",
  gap: "19px",
  cursor: "pointer",
  flexWrap: "wrap",
  "@media (max-width: 700px)": {
    gap: "10px",
  },
});

const TimeTile = styled("div")({
  padding: "8px 16px",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  color: theme.palette.white,
  textAlign: "center",
  "@media (max-width: 700px)": {
    padding: "6px 12px",
    fontSize: "12px",
    width: "60px",
  },
});

export default function TheatreCard({ theatreName, showTimes, theatreId, handleClick }) {
  return (
    <TheatreCardContainer>
      <TheatreName>{theatreName}</TheatreName>
      <TimeTileContainer>
        {showTimes.map((showTime, index) => (
          <TimeTile key={index} onClick={() => handleClick(showTime, theatreId)}>
            {showTime}
          </TimeTile>
        ))}
      </TimeTileContainer>
    </TheatreCardContainer>
  );
}
