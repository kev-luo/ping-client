import React from "react";

import Ping from "../Ping";

export default function Feed({ data, error, darkMode }) {

  return (
    <>
      {data ? (
        data.map((ping) => <Ping ping={ping} key={ping.id} darkMode={darkMode}/>)
      ) : (
        <div>No Pings</div>
      )}
    </>
  );
}