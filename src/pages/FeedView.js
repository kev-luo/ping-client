import React, { useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import StyledFeedContainer from "../components/Styled/StyledFeedContainer";
import TabContainer from "../components/Feed/TabContainer";
import LeftButtons from "../components/FloatingIcons/LeftButtons";
import NewPing from "../components/Feed/NewPing";
import Feed from "../components/Feed/Feed";
import { useAuthContext } from "../utils/useAuthContext";

export default function Dashboard({ pingData, userData }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");

  const supportedPings =
    pathArray[2] === "supports" &&
    pingData.data?.getPingsByLocation.filter((ping) => {
      const isUserPresent = ping.support.filter((supporter) => {
        return (
          supporter.user?.id === pathArray[3] && supporter.supported === true
        );
      });
      return isUserPresent.length > 0;
    });

  // const newPings = pingData.data?.getPingsByLocation.filter((ping) => {
  //   const isUserPresent = ping.support.filter((supporter) => {
  //     return supporter.user?.id === pathArray[3];
  //   });
  //   return isUserPresent.length === 0;
  // });

  const authoredPings =
    pathArray[2] === "posted" &&
    pingData.data?.getPingsByLocation.filter((ping) => {
      return ping.author.id === pathArray[3];
    });

  return (
    <StyledFeedContainer>
      {user && <TabContainer />}
      <LeftButtons open={open} setOpen={setOpen} userData={userData} />
      <NewPing open={open} setOpen={setOpen} />
      <Switch>
        <Route path="/feed/all">
          <Feed data={pingData.data?.getPingsByLocation} error={pingData.error} />
        </Route>
        <Route path="/feed/supports/:userId">
          <Feed data={supportedPings} error={pingData.error} />
        </Route>
        <Route path="/feed/posted/:userId">
          <Feed data={authoredPings} error={pingData.error} />
        </Route>
        <Route path="/feed/new">
          <Feed data={pingData.data?.getPingsByLocation} error={pingData.error} />
        </Route>
      </Switch>
    </StyledFeedContainer>
  );
}
