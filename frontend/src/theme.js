import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#FF416C" },
    secondary: { main: "#3E2093" },

    pink2: "#FAADB3",
    brown: "#574143",
    lightBrown: "#BFA5A6",
    darkBlue: "#00024A",
    lightPurple: "#9998B5",
    white: "#FFFFFF",
  },

  typography: {
    h6: {
      fontWeight: 500,
      fontSize: "0.75rem",
      fontFamily: '"Montserrat", sans-serif',
    },
    h5: {
      fontSize: "0.875rem",
      fontWeight: 500,
      fontFamily: '"Montserrat", sans-serif',
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 600,
      fontFamily: '"Montserrat", sans-serif',
    },
    h3: {
      fontSize: "1.25rem",
      lineHeight: "1.5rem",
      fontWeight: 600,
      fontFamily: '"Montserrat", sans-serif',
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 700,
      fontFamily: '"Montserrat", sans-serif',
    },
    h1: {
      fontSize: "2.125rem",
      fontWeight: 700,
      fontFamily: '"Montserrat", sans-serif',
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 500,
      fontFamily: '"Montserrat", sans-serif',
    },
    subtitle2: {
      fontSize: "0.75rem",
      fontWeight: 400,
      fontFamily: '"Montserrat", sans-serif',
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      fontFamily: '"Montserrat", sans-serif',
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "1.334em",
      fontFamily: '"Montserrat", sans-serif',
    },
    body2: {
      letterSpacing: "0.75em",
      fontWeight: 400,
      lineHeight: "1.5em",
      fontFamily: '"Montserrat", sans-serif',
    },
    links: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: "1.5em",
      fontFamily: '"Montserrat", sans-serif',
    },
  },
});

export default theme;
