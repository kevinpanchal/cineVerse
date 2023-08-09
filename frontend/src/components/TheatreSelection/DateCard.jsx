import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styled from "@emotion/styled";

const DateSelectorContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "16px",
});

export default function DateSelector({ dates, selectedDate, onSelectDate, formatDate }) {
  const handleDateClick = (date) => {
    onSelectDate(date);
  };

  return (
    <DateSelectorContainer>
      <Tabs
        value={selectedDate}
        onChange={(event, newValue) => handleDateClick(newValue)}
        indicatorColor="primary"
        textColor="primary">
        {dates.map((date) => (
          <Tab key={date.getTime()} value={formatDate(date)} label={formatDate(date)} />
        ))}
      </Tabs>
    </DateSelectorContainer>
  );
}
