import React from "react";
import styled from "styled-components";
import { HiOutlineUser, HiOutlinePlus } from "react-icons/hi";
import TabContainer from "../Styled/TabContainer";
import FloatingBtn from "../Styled/FloatingBtn";
import { useDarkModeContext } from "../../utils/DarkContext";

const RightTabContainer = styled(TabContainer)`
  right: 6rem;
  li {
    flex-direction: row-reverse;
  }
`;

const RightFloatingBtn = styled(FloatingBtn)`
  color: #22CCF2;
  &:hover {
    box-shadow: 2px 4px 6px -1px rgba(34, 204, 242, 0.75);
    transform: scale(1.1);
    ${'' /* box-shadow: 5px 4px 10px 2px #26bf47; */}
  }
  & ~ span {
    margin-right: 1rem;
  }
`;

export default function LeftTabs() {
  const { dispatch } = useDarkModeContext();
  return (
    <RightTabContainer>
      <ul>
        <li>
          <RightFloatingBtn
            as="button"
            onClick={() => dispatch({ type: "TOGGLE_DARKMODE" })}
          >
            <HiOutlinePlus size={20} />
          </RightFloatingBtn>
          <span className="description">Ping</span>
        </li>
        <li>
          <RightFloatingBtn
            as="button"
            onClick={() => dispatch({ type: "TOGGLE_DARKMODE" })}
          >
            <HiOutlineUser size={20} />
          </RightFloatingBtn>
          <span className="description">Profile</span>
        </li>
      </ul>
    </RightTabContainer>
  );
}
