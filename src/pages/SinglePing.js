import React, { useEffect, useState } from "react";

import StyledFeedContainer from "../components/Styled/StyledFeedContainer";
import NewPing from "../components/NewPing";
import LeftButtons from "../components/FloatingIcons/LeftButtons";
import PingWrapper from "../components/SinglePing/PingWrapper";

import { NEW_COMMENT_SUBSCRIPTION } from "../utils/graphql";

export default function SinglePing({ pingData, userData }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pingData.data) {
      const unsubscribe = pingData.subscribeToMore
        ? pingData.subscribeToMore({
            document: NEW_COMMENT_SUBSCRIPTION,
            variables: { pingId: pingData.data?.getPing?.id },
            updateQuery: (prevPing, { subscriptionData }) => {
              if (!subscriptionData) return prevPing;
              return {
                ...prevPing,
                getPing: subscriptionData.getPing,
              };
            },
          })
        : null;
        if (unsubscribe) {
          return () => unsubscribe();
        }
    }
  }, [pingData]);

  return (
    <StyledFeedContainer>
      <LeftButtons open={open} setOpen={setOpen} userData={userData} />
      <NewPing open={open} setOpen={setOpen} />
      <PingWrapper data={pingData.data} error={pingData.error} />
    </StyledFeedContainer>
  );
}
