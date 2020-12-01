import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { grey, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#659DBD", // bluer blue
      dark: "#0D133D"
    },
    secondary: {
      light: "#79BD51",
      main: "#2C4D3F", // olive green
      dark: "#274D20"
    },
    success: {
      main: "#BC986A" //light brown
    },
    error: {
      main: "#DAAD86" //orangeish pink?
    },
    warning: {
      light: "#D5BFAC",
      main: "#EDF1ED" // yellowish beige
    },
    info: {
      main: "#F2F2F2" //beige
    }
  },
});

const themeDark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#313131",
      main: grey[800],
      contrastText: "#C44714", // dark orange
    },
    secondary: {
      main: grey[900],
      contrastText: "#C13838",
    },
    error: {
      light: red[500],
      main: "#B81C1C", // red
      dark: "#C13838", // red
      contrastText: "#fff",
    },
  },
});

const themeOverrides = {
  MuiButton: {
    root: {
      textTransform: "none",
    },
    containedPrimary: {
      "&:hover": {
        backgroundColor: theme.palette.secondary.light,
      },
      fontWeight: 500,
      color: theme.palette.info.main,
      backgroundColor: theme.palette.secondary.dark,
    },
    containedSecondary: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.info.main,
      "&:hover": {
        backgroundColor: theme.palette.warning.light,
      }
    },
    outlinedPrimary: {
      color: theme.palette.secondary.dark,
      borderColor: theme.palette.secondary.dark,
      opacity: 0.6,
      "&:hover": {
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main,
        opacity: 1,
      }
    }
  },
  MuiInput: {
    root: {
      "&$underline:after": {
        borderBottomColor: theme.palette.warning.main,
      },
    },
  },
  MuiInputLabel: {
    root: {
      color: theme.palette.secondary.dark,
      "&$focused": {
        color: theme.palette.warning.main,
      },
    },
  },
  MuiTooltip: {
    tooltip: {
      backgroundColor: "#fff",
      color: theme.palette.primary.light,
    },
    arrow: {
      color: "#fff",
    },
  },
};

const themeProps = {
  MuiTooltip: {
    arrow: true,
  },
};

theme.props = themeProps;
theme.overrides = themeOverrides;
themeDark.props = themeProps;
themeDark.overrides = themeOverrides;

const Theme = (props) => {
  const { children, darkMode } = props;
  const setTheme = darkMode ? themeDark : theme;
  return <ThemeProvider theme={setTheme}>{children}</ThemeProvider>;
};

export const withTheme = (Component) => {
  return (props) => {
    const [darkMode, setDarkMode] = useState(false);
    return (
      <Theme darkMode={darkMode}>
        <Component {...props} darkMode={darkMode} setDarkMode={setDarkMode} />
      </Theme>
    );
  };
};
