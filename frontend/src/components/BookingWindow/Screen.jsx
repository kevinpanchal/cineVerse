import React from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import Seat from "./Seat";
import { Tabs } from "react-tabs";

const TabsContainer = styled(Tabs)({
  width: "80%",
  minHeight: "200px",
  background: "#F3F3F3",
  margin: "2rem auto 1.5rem",
  color: "#E8F0F2",
  boxShadow: "0px 5px 5px 0px black",
});

// const CustomTabList = styled(TabList)({
//   display: "flex",
//   alignItems: "center",
//   background: "#FFFFFF",
//   listStyle: "none",
//   justifyContent: "space-between",
//   paddingLeft: "0px",
//   color: "#000000",
//   fontSize: "1.25rem",
//   marginTop: "0",
// });

// const CustomTab = styled(Tab)(({ isSelected }) => ({
//   width: "50%",
//   padding: "0.75rem",
//   textAlign: "center",
//   color: isSelected ? "black" : "gray",
//   boxShadow: isSelected ? "0px 5px 5px 0px black" : "none",
//   cursor: "pointer",
//   "&:hover": {
//     background: "rgba(50, 224, 196, 0.15)",
//     color: "black",
//   },
// }));

const ScreenWrapper = styled(`div`)({
  display: "flex",
  marginTop: "10px",
  overflow: "auto",
  height: "100%",
  width: "80%",
  paddingTop: "50px",
  paddingLeft: "35px",
  margin: "auto",
  gap: "60px",
});

const Screen = ({ selectedSeats, bookedSeates, handleSeatClick }) => {
  const renderSeats = (
    startRow,
    endRow,
    leftRowTransform,
    leftRowSeatTransform,
    rightRowTransform,
    rightRowSeatTransform
  ) => {
    const rowName = ["A", "B", "C", "D", "E", "F"].reverse();
    const leftSeatsList = [];
    const rightSeatsList = [];
    const seats = [];

    for (let i = startRow; i <= endRow; i++) {
      const leftRowStyle = {
        transform: `skew(${leftRowTransform + i}deg)`,
        margin: "0 6px",
      };

      const rightRowStyle = {
        transform: `skew(${rightRowTransform + i}deg)`,
        margin: "0 6px",
      };

      const leftSeatStyle = {
        transform: `skew(${leftRowSeatTransform - 2 * i}deg)`,
      };

      const rightSeatStyle = {
        transform: `skew(${rightRowSeatTransform - 2 * i}deg)`,
      };

      const leftSeats = (
        <div key={`leftRow-${i}`} style={leftRowStyle}>
          {rowName.map((row, index) => {
            const seatNo = `${row}${i + 1}`;
            const isSelected = selectedSeats.includes(seatNo);
            const isBooked = bookedSeates?.includes(seatNo);

            return (
              <div
                key={`leftSeat-${i}-${index}`}
                style={leftSeatStyle}
                onClick={() => handleSeatClick(seatNo)}>
                <Seat seatNo={seatNo} isSelected={isSelected} isBooked={isBooked} />
              </div>
            );
          })}
        </div>
      );

      const rightSeats = (
        <div key={`rightRow-${i}`} style={rightRowStyle}>
          {rowName.map((row, index) => {
            const seatNo = `${row}${i + 7}`;
            const isSelected = selectedSeats.includes(seatNo);
            const isBooked = bookedSeates?.includes(seatNo);

            return (
              <div
                key={`rightSeat-${i}-${index}`}
                style={rightSeatStyle}
                onClick={() => handleSeatClick(seatNo)}>
                <Seat seatNo={seatNo} isSelected={isSelected} isBooked={isBooked} />
              </div>
            );
          })}
        </div>
      );

      leftSeatsList.push(leftSeats);
      rightSeatsList.push(rightSeats);
    }

    seats.push(
      <div style={{ display: "flex" }}>{leftSeatsList}</div>,
      <div style={{ display: "flex" }}>{rightSeatsList}</div>
    );

    return seats;
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10.5}>
        <TabsContainer>
          <div>
            <div
              style={{
                color: "black",
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "10px",
              }}>
              Selected Seats: {selectedSeats.length}
            </div>
            <ScreenWrapper>{renderSeats(0, 5, -14, 20, 8, -8)}</ScreenWrapper>
          </div>
        </TabsContainer>
      </Grid>
    </Grid>
  );
};

export default Screen;
