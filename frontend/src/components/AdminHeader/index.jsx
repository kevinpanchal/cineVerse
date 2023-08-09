import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { MdOutlineMenu } from "react-icons/md";
import CustomListItem from "../Header/CustomListItem";
import { removeUserAction } from "../../store/Auth/actions";
import { useDispatch } from "react-redux";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.white,
  height: "48px",
  paddingLeft: "10px",
  paddingRight: "10px",
  [theme.breakpoints.down("sm")]: {
    height: "52px",
  },
}));

const StyledTab = styled(Tab)(() => ({
  fontSize: "1rem",
}));

const StyledButtonOutline = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.secondary.main,
  color: theme.palette.secondary.main,
  "&.MuiButton-root:hover": {
    borderColor: theme.palette.secondary.main,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const links = [
  { name: "Movies", link: "/admin/movie" },
  { name: "Theatres", link: "/admin/theatre" },
  { name: "Screens", link: "/admin/screen" },
  { name: "Foods", link: "/admin/food" },
];

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const activePath = "/" + pathname.split("/")[1];
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const currentTabURL = pathname.concat(search);
  const isMainTabs = links.some((link) => link.link === activePath);

  const [value, setValue] = useState(activePath);
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setDrawerState(open);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  const handleHomeRedirect = () => {
    navigate("/admin/movie");
  };

  const handleSignOut = () => {
    dispatch(removeUserAction());
  };

  return (
    <StyledAppBar position="static">
      {isMobileScreen ? (
        <Grid container alignItems="center">
          <IconButton
            anchor="drawerButton"
            size="large"
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}>
            <MdOutlineMenu color="darkBlue" />
          </IconButton>
          <Typography
            variant="h1"
            color="primary"
            style={{ cursor: "pointer" }}
            onClick={handleHomeRedirect}>
            Cineverse
          </Typography>
          <Drawer anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
            <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
              <List>
                {links.map((text, index) => (
                  <CustomListItem
                    name={text.name}
                    link={text.link}
                    key={index}
                    isActive={text.link === activePath}
                  />
                ))}
                <Divider />
                <CustomListItem name="Logout" link="/logout" handleCLick={handleSignOut} />
              </List>
            </Box>
          </Drawer>
        </Grid>
      ) : (
        <Box>
          <Grid container justifyContent="space-between" alignItems="center">
            <div>
              <Typography
                variant="h1"
                color="primary"
                style={{ cursor: "pointer" }}
                onClick={handleHomeRedirect}>
                Cineverse
              </Typography>
            </div>
            <Grid>
              <Tabs value={isMainTabs ? value : currentTabURL} onChange={handleChange}>
                {links.map((data, key) => (
                  <StyledTab label={data.name} value={data.link} key={key} {...a11yProps(key)} />
                ))}
              </Tabs>
            </Grid>
            <div>
              <StyledButtonOutline variant="outlined" color="secondary" onClick={handleSignOut}>
                Sign Out
              </StyledButtonOutline>
            </div>
          </Grid>
        </Box>
      )}
    </StyledAppBar>
  );
};

export default Header;
