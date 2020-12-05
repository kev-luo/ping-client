import React from "react";
import styled from "styled-components";
import { GrUnorderedList } from "react-icons/gr";
import { RiRoadMapLine } from "react-icons/ri";
import TabContainer from "../Styled/TabContainer";
import FloatingBtn from "../Styled/FloatingBtn";

const LeftTabContainer = styled(TabContainer)`
  left: 6rem;
`;

const LeftFloatingBtn = styled(FloatingBtn)`
color: #50BF6C;
  &:hover {
    color: #50BF6C;
    box-shadow: 2px 4px 6px -1px rgba(80, 191, 108, 0.75);
    transform: scale(1.1);
    ${'' /* box-shadow: 5px 4px 10px 2px #26bf47; */}
  }
  & ~ span {
    margin-left: 1rem;
  }
`;

export default function LeftTabs() {
  return (
    <LeftTabContainer>
      <ul>
        <li>
          <LeftFloatingBtn to="/map">
            <RiRoadMapLine size={20} />
          </LeftFloatingBtn>
          <span>Map</span>
        </li>
        <li>
          <LeftFloatingBtn to="/">
            <GrUnorderedList size={20} />
          </LeftFloatingBtn>
          <span>Feed</span>
        </li>
      </ul>
    </LeftTabContainer>
  );
}
