import React, { useState } from "react";
import styled from "@emotion/styled";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";

const FAQItem = styled(Accordion)({
  "&.MuiAccordion-root": {
    marginBottom: "20px",
    borderRadius: 5,
    boxShadow: "0px 2px 8px rgba(99, 99, 99, 0.2)",
    "&::before": {
      backgroundColor: "transparent",
    },
  },
});

const FAQSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.white,
  borderBottom: `1px solid ${theme.palette.divider}`,
  "& .MuiAccordionSummary-content": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const FAQDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const Question = styled(Typography)({
  fontSize: "16px",
  fontWeight: 600,
  marginBottom: "0.5rem",
});

const Answer = styled(Typography)({
  fontSize: "14px",
});

const FAQItems = ({ ques, ans, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <FAQItem key={index} onClick={() => setIsExpanded(!isExpanded)}>
      <FAQSummary expandIcon={isExpanded ? "-" : "+"} aria-controls={`faq-content-${index}`}>
        <Question>{ques}</Question>
      </FAQSummary>
      <FAQDetails id={`faq-content-${index}`}>
        <Answer>{ans}</Answer>
      </FAQDetails>
    </FAQItem>
  );
};

export default FAQItems;
