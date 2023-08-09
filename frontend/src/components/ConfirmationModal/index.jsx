import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    min-width: 300px;
    max-width: 400px;
    border-radius: 8px;
    padding: 20px;
  }
`;

const Title = styled(DialogTitle)`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 8px;
`;

const Content = styled(DialogContent)`
  text-align: center;
  padding-bottom: 20px;
`;

const Actions = styled(DialogActions)`
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin: 0 8px;
  width: 150px;
  height: 55px;
`;

const ConfirmationModal = ({ open, onClose, onContinue, onCompleteTransaction }) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <Title>Tickets already in cart</Title>
      <Content>
        <Typography variant="body1" gutterBottom>
          Do you want to complete that transaction or clear the cart and continue?
        </Typography>
      </Content>
      <Actions>
        <StyledButton onClick={onContinue} color="primary" variant="contained">
          Continue
        </StyledButton>
        <StyledButton onClick={onCompleteTransaction} color="primary" variant="contained">
          Complete Transaction
        </StyledButton>
      </Actions>
    </StyledDialog>
  );
};

export default ConfirmationModal;
