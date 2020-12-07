import React from "react";
import { FiImage, FiFileText } from "react-icons/fi";

import Ping from "../Ping";

export default function Feed({ data, error }) {

  function containsImage(ping) {
    return ping.imageUrl ? <FiImage size={32} /> : <FiFileText size={32} />;
  }

  return (
    <>
      {data ? (
        data.map((ping) => <Ping ping={ping} key={ping.id} />)
      ) : (
        <div>No Pings</div>
      )}
    </>
  );
}