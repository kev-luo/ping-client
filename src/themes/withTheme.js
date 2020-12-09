import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

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
    },
    containedPrimary: {
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
      fontWeight: 500,
      color: theme.palette.info.main,
      backgroundColor: theme.palette.primary.dark,
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
        borderBottomColor: theme.palette.primary.dark,
      },
    },
  },
  MuiInputLabel: {
    root: {
      color: theme.palette.primary.dark,
      "&$focused": {
        color: theme.palette.primary.dark,
      },
    },
  },
  MuiTooltip: {
    tooltip: {
      backgroundColor: "#fff",
      color: theme.palette.primary.main,
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
