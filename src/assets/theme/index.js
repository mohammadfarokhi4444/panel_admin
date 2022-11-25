import { theme } from "./default";
import { createTheme } from "@mui/material";

const overrides = {
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: "3.75rem",
      lineHeight: 1.167,
    },
    h2: {
      fontWeight: 700,
      fontSize: "2.6rem",
      lineHeight: 1.167,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.6rem",
      lineHeight: 1.167,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.1rem",
      lineHeight: 1.435,
    },
    h5: {
      fontWeight: 700,
      fontSize: "0.75rem",
      lineHeight: 1.6,
    },
    h6: {
      fontWeight: 600,
      fontSize: "0.9rem",
      lineHeight: 1.6,
    },
    subtitile1: {
      fontWeight: 700,
      fontSize: "0.81rem",
      lineHeight: 1.75,
    },
    subtitile2: {
      fontWeight: 400,
      fontSize: "0.6rem",
      lineHeight: 1.57,
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.7rem",
      lineHeight: 1.8,
      fontFamily: `"IRANSans", "sans-serif", "serif" `,
    },
    body3: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.8,
      fontFamily: `"IRANSans", "sans-serif", "serif" `,
    },
    body4: {
      fontWeight: 400,
      fontSize: "0.9rem",
      lineHeight: 2.5,
      fontFamily: `"IRANSans", "sans-serif", "serif" `,
    },
    fontFamily: `"IRANSans", "sans-serif", "serif" `,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    // fontWeightBold: 700,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
};

export default {
  main: createTheme({ ...theme, ...overrides }),
};
