import styled from "@emotion/styled";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  "& .MuiButtonBase-root": {
    padding: 0,
    minWidth: "100px",
    ...theme.typography.links,
  },
  "& .active": {
    color: theme.palette.primary.main,
    fontSize: "1.4rem",
    fontWeight: "600",
  },
}));

const CustomListItem = ({ name, link, isActive, handleCLick }) => {
  const navigate = useNavigate();
  const handleClickFunc = () => {
    if (link === "/logout") {
      handleCLick();
    } else {
      navigate(link);
    }
  };
  return (
    <StyledListItem>
      <ListItemButton onClick={handleClickFunc} className={isActive ? "active" : ""}>
        <ListItemText primary={name} />
      </ListItemButton>
    </StyledListItem>
  );
};

export default CustomListItem;
