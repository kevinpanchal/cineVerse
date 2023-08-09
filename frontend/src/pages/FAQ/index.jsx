import React from "react";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";

import { faqData } from "../../mock";
import FAQItems from "../../components/FAQ/FaqItems";
import FAQTitle from "../../components/FAQ/FaqTitle";

const Wrapper = styled(Grid)({
  padding: "5rem 0",
});

const FlexBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "80%",
});

const FAQPage = () => {
  return (
    <Wrapper container justifyContent="center">
      <FlexBox>
        <FAQTitle />
        {faqData.map((faq, index) => (
          <FAQItems key={index} ques={faq.question} ans={faq.answer} index={index} />
        ))}
      </FlexBox>
    </Wrapper>
  );
};

export default FAQPage;
