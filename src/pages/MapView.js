import React from "react";

import LeftButtons from "../components/FloatingButtons/LeftButtons"
import RightButtons from "../components/FloatingButtons/RightButtons"
import Map from "../components/Map/Map";

export default function Mapview() {
  return (
    <div>
      <LeftButtons />
      <RightButtons />
      <Map />
    </div>
  );
}
