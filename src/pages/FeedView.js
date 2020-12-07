import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import StyledFeedContainer from "../components/Styled/StyledFeedContainer";
import TabContainer from "../components/Feed/TabContainer";
import LeftButtons from "../components/FloatingIcons/LeftButtons";
import NewPing from "../components/Feed/NewPing";
import Feed from "../components/Feed/Feed";
import { useAuthContext } from "../utils/useAuthContext";

export default function Dashboard({ pingData, userData }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();

  return (
    <StyledFeedContainer>
      {user && <TabContainer />}
      <LeftButtons open={open} setOpen={setOpen} userData={userData} />
      <NewPing open={open} setOpen={setOpen} />
      <Switch>
        <Route path="/feed/all">
          <Feed data={pingData.data} error={pingData.error} />
        </Route>
        <Route path="/feed/supports/:userId">
          <Feed data={pingData.data} error={pingData.error} />
        </Route>
        <Route path="/feed/posted/:userId">
          <Feed data={pingData.data} error={pingData.error} />
        </Route>
        <Route path="/feed/new">
          <Feed data={pingData.data} error={pingData.error} />
        </Route>
      </Switch>
    </StyledFeedContainer>
  );
}
