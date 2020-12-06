import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StyledFeedContainer from "../components/Styled/StyledFeedContainer";
import NewPing from "../components/Feed/NewPing";
import LeftButtons from "../components/FloatingButtons/LeftButtons";
import Ping from "../components/SinglePing/Ping";

import { useQuery } from "@apollo/client";
import { FETCH_PING_QUERY, NEW_COMMENT_SUBSCRIPTION } from "../utils/graphql";

export default function SinglePing() {
  const [open, setOpen] = useState(false);
  const { pingId } = useParams();
  const { subscribeToMore, data, error } = useQuery(FETCH_PING_QUERY, {
    variables: { pingId },
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore
      ? subscribeToMore({
          document: NEW_COMMENT_SUBSCRIPTION,
          variables: { pingId },
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
  }, [subscribeToMore, pingId, data]);

  return (
    <StyledFeedContainer>
      <LeftButtons open={open} setOpen={setOpen}/>
      <NewPing open={open} setOpen={setOpen} />
      <Ping data={data} error={error} />
    </StyledFeedContainer>
  );
}
