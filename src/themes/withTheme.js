import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { grey, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#22ccf2", // electric blue
    },
    secondary: {
      main: "#1999B5",
      dark: "#2E5E69"
    },
    success: {
      main: "#50bf6c" // electric green
    },
    error: {
      main: "#BF213E" //dark red
    },
    info: {
      light: "#ebedf2", // light grey 
      main: "#F2F2F2", // almost white
    }
  },
  typography: {
    fontFamily: "Fira Sans, sans-serif"
  }
});

const themeDark = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#22ccf2", // electric blue
    },
    secondary: {
      main: "#1999B5",
      dark: "#2E5E69"
    },
    success: {
      main: "#50bf6c" // electric green
    },
    error: {
      main: "#BF213E" //dark red
    },
    info: {
      light: grey[800],
      main: grey[900],
    }
  },
  typography: {
    fontFamily: "Fira Sans, sans-serif"
  }
});

const themeOverrides = {
  MuiButton: {
    root: {
      textTransform: "none",
    },
    containedPrimary: {
      "&:hover": {
        backgroundColor: theme.palette.warning.light,
      },
      fontWeight: 500,
      color: theme.palette.info.main,
      backgroundColor: theme.palette.secondary.main,
    },
    containedSecondary: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.info.main,
      "&:hover": {
        backgroundColor: theme.palette.warning.light,
      }
    },
    outlinedPrimary: {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
      opacity: 0.6,
      "&:hover": {
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main,
        opacity: 1,
      }
    },
    outlinedSecondary: {
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
      opacity: 0.6,
      "&:hover": {
        color: theme.palette.secondary.light,
        borderColor: theme.palette.secondary.light,
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
