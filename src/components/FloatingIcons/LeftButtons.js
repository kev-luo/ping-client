import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { GrUnorderedList } from "react-icons/gr";
import { RiRoadMapLine } from "react-icons/ri";
import { HiOutlinePlus, HiOutlineUser } from "react-icons/hi";
import TabContainer from "../Styled/StyledFloatingBtnContainer";
import FloatingBtn from "../Styled/StyledFloatingBtn";

const LeftTabContainer = styled(TabContainer)`
  left: 6rem;
`;

const LeftFloatingBtn = styled(FloatingBtn)`
  color: var(--theme-primary);
  &:hover {
    box-shadow: 2px 4px 6px -1px rgba(80, 191, 108, 0.75);
    transform: scale(1.1);
  }
  & ~ span {
    margin-left: 1rem;
  }
`;

export default function LeftTabs({ open, setOpen }) {
  const { pathname } = useLocation();

  return (
    <LeftTabContainer>
      <ul>
        <li>
          {pathname === "/map" ? (
            <>
              <LeftFloatingBtn to="/">
                <GrUnorderedList size={20} />
              </LeftFloatingBtn>
              <span>Feed</span>
            </>
          ) : (
            <>
              <LeftFloatingBtn to="/map">
                <RiRoadMapLine size={20} />
              </LeftFloatingBtn>
              <span>Map</span>
            </>
          )}
        </li>
        <li>
          <LeftFloatingBtn to="/">
            <HiOutlineUser size={20} />
          </LeftFloatingBtn>
          <span>Profile</span>
        </li>
        <li>
          <LeftFloatingBtn as="button" onClick={() => setOpen(!open)}>
            <HiOutlinePlus size={20} />
          </LeftFloatingBtn>
          <span>Ping</span>
        </li>
      </ul>
    </LeftTabContainer>
  );
}
