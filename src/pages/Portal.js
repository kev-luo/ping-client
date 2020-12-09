import React, { useState } from "react";
import { Tabs, Tab, Container } from "@material-ui/core";

import Login from "../components/User/Login";
import Register from "../components/User/Register";

export default function SignUpOrIn() {
  document.title="Ping | Portal"
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container style={{paddingTop: "4rem"}}>
      <Tabs
        variant="fullWidth"
        value={selectedTab}
        textColor="secondary"
        centered
        onChange={handleChange}
      >
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      {selectedTab === 0 && <Login />}
      {selectedTab === 1 && <Register />}
    </Container>
  );
}
