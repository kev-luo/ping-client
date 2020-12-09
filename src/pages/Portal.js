import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Container } from "@material-ui/core";

import Login from "../components/User/Login";
import Register from "../components/User/Register";

export default function SignUpOrIn({ darkMode }) {
  document.title="Ping | Portal"
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container style={{paddingTop: "4rem"}}>
      <Tabs
        variant="fullWidth"
        value={selectedTab}
        textColor={darkMode ? "primary" : "secondary"}
        centered
        onChange={handleChange}
      >
        <Tab label="Login" className={styles.tab}/>
        <Tab label="Register" className={styles.tab}/>
      </Tabs>
      {selectedTab === 0 && <Login darkMode={darkMode}/>}
      {selectedTab === 1 && <Register darkMode={darkMode}/>}
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  tab: {
    color: theme.palette.primary.dark
  }
}))
