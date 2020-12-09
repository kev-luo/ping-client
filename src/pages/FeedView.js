import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import StyledContainer from "../components/Styled/StyledContainer";
import TabContainer from "../components/Feed/TabContainer";
import LeftButtons from "../components/FloatingIcons/LeftButtons";
import NewPing from "../components/NewPing";
import Feed from "../components/Feed/Feed";
import Loading from "../components/Loading";
import { useAuthContext } from "../utils/useAuthContext";
import { NEW_PING_SUBSCRIPTION } from "../utils/graphql";

export default function Dashboard({ pingData, userData, darkMode }) {
  document.title="Ping | Feed"
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");

  useEffect(() => {
    const unsubscribe = pingData.subscribeToMore
      ? pingData.subscribeToMore({
          document: NEW_PING_SUBSCRIPTION,
          updateQuery: (prevPings, { subscriptionData }) => {
            if (!subscriptionData) return prevPings;
            const pingAdded = subscriptionData.data.newPing;
            return {
              ...prevPings,
              getPingsByLocation: [pingAdded, ...prevPings.getPingsByLocation],
            };
          },
        })
      : null;
    if (unsubscribe) {
      return () => unsubscribe();
    }
  }, [pingData]);

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

  const newPings =
    pathArray[2] === "new" &&
    pingData.data?.getPingsByLocation.filter((ping) => {
      const isUserPresent = ping.support.filter((supporter) => {
        return supporter.user?.id === user.id;
      });
      return isUserPresent.length === 0;
    });

  const authoredPings =
    pathArray[2] === "posted" &&
    pingData.data?.getPingsByLocation.filter((ping) => {
      return ping.author.id === pathArray[3];
    });

  return (
    <>
      <LeftButtons open={open} setOpen={setOpen} userData={userData} />
      <StyledContainer>
        {user && <TabContainer darkMode={darkMode} />}
        {pingData.data ? (
          <>
            <NewPing open={open} setOpen={setOpen} />
            <Switch>
              <Route path="/feed/all">
                <Feed
                  darkMode={darkMode}
                  data={pingData.data?.getPingsByLocation}
                  error={pingData.error}
                />
              </Route>
              <Route path="/feed/supports/:userId">
                <Feed
                  darkMode={darkMode}
                  data={supportedPings}
                  error={pingData.error}
                />
              </Route>
              <Route path="/feed/posted/:userId">
                <Feed
                  darkMode={darkMode}
                  data={authoredPings}
                  error={pingData.error}
                />
              </Route>
              <Route path="/feed/new">
                <Feed
                  darkMode={darkMode}
                  data={newPings}
                  error={pingData.error}
                />
              </Route>
            </Switch>
          </>
        ) : pingData.error ? (
          <Loading err={pingData.error} />
        ) : (
          <Loading />
        )}
      </StyledContainer>
    </>
  );
}
