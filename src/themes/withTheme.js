import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { amber, grey, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#224459", // ocean blue
    },
    secondary: {
      main: "#A1A621", // greenish yellow
      contrastText: "#fff", 
    },
    success: {
      main: "#593311" //brown
    },
    error: {
      main: "#F29C50" //sherbert orange
    },
    warning: {
      main: "#D9857E" // dark pink
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
        color: theme.palette.error.light,
      },
      fontWeight: 500,
      backgroundColor: theme.palette.secondary.main,
    },
  },
  MuiInput: {
    root: {
      "&$underline:after": {
        borderBottomColor: theme.palette.error.main,
      },
    },
  },
  MuiInputLabel: {
    root: {
      "&$focused": {
        color: theme.palette.error.light,
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
