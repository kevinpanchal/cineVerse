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
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { MdOutlineMenu } from "react-icons/md";
import CustomListItem from "./CustomListItem";
import { isLogin } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { removeUserAction } from "../../store/Auth/actions";
import { clearCartAction } from "../../store/Cart/actionTypes";

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

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  "&.MuiButton-root:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
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
  { name: "Home", link: "/" },
  { name: "Contact", link: "/contact" },
  { name: "FAQs", link: "/faq" },
  { name: "Parties", link: "/parties" },
];

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const activePath = "/" + pathname.split("/")[1];
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const currentTab = activePath.slice(1);
  const currentTabURL = pathname.concat(search);
  const isMainTabs = links.some((link) => link.link === activePath);

  const [value, setValue] = useState(activePath);

  const { user } = useSelector((state) => state.authReducer);

  const [drawerState, setDrawerState] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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

  const handleLogin = () => {
    navigate("/login", { state: { register: false } });
  };

  const handleRegister = () => {
    navigate("/login", { state: { register: true } });
  };

  const handleHomeRedirect = () => {
    navigate("/");
  };

  const handleLogOut = () => {
    dispatch(clearCartAction());
    dispatch(removeUserAction());
    navigate("/");
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
                {isLogin() ? (
                  <CustomListItem name="Logout" link="/logout" handleCLick={handleLogOut} />
                ) : (
                  <CustomListItem
                    name="Login / Register"
                    link="/login"
                    isActive={"/login" === activePath}
                  />
                )}
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
                {links.some((link) => link.link === activePath) ? null : (
                  <StyledTab label={currentTab} value={currentTabURL} {...a11yProps(4)} />
                )}
              </Tabs>
            </Grid>
            <Grid>
              {isLogin() ? (
                <>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}>
                    Hii {user.name} ▼
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}>
                    <MenuItem
                      onClick={() => {
                        navigate("/profile");
                        handleClose();
                      }}>
                      My Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/summary");
                        handleClose();
                      }}>
                      My Cart
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleLogOut();
                        handleClose();
                      }}>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <div style={{ visibility: activePath === "/login" ? "hidden" : "visible" }}>
                  <StyledButton
                    variant="contained"
                    onClick={handleLogin}
                    style={{ marginRight: "10px" }}>
                    Login
                  </StyledButton>
                  <StyledButtonOutline variant="outlined" onClick={handleRegister}>
                    Sign up
                  </StyledButtonOutline>
                </div>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </StyledAppBar>
  );
};

export default Header;
