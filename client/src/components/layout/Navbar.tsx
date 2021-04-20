import React, { useState } from "react";
import "antd/dist/antd.css";
import { Menu } from "antd";
import { NavLink, Link } from "react-router-dom";
import { FundOutlined, LogoutOutlined, MailOutlined, ProjectOutlined, UserOutlined } from "@ant-design/icons";
import { checkAuth } from "../../actions/auth";
import { connect, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export const NavBarDivWrapper = styled(Menu)`
  display: flex;
  width: 100%;
  height: 50px;
  background-color: blue;
  color: white;
`;

const NavBarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
  font-size: 20px;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
  margin-top: 24px !important;
  @media (max-width: 768px) {
    width: 280px;
    font-size: 18px;
  }
  @media (max-width: 600px) {
    width: 220px;
    font-size: 16px;
  }
`;

export const StyledP = styled.p`
  color: white;
  &:hover {
    color: #ddd3d3 !important;
    transform: scale(1.1);
  }
`;

export const LogOutBtn = styled.button`
  position: absolute;
  border: none;
  padding: 10px;
  cursor: pointer;
  background-color: blue;
  margin-top: 8px;
  font-weight: bold;
  &:hover {
    transform: scale(1.1);
    color: #ddd3d3 !important;
  }
  @media (max-width: 768px) {
    margin-left: -7px;
  }
`;

function Navbar() {
  const [current, setCurrent] = useState();

  function handleClick(e: any) {
    console.log("click ", e);
    setCurrent(e.key);
  }
  const dispatch = useDispatch();

  function LogOut(e: any) {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(checkAuth());
  }

  return (
    <NavBarDivWrapper>
      <NavBarDiv>
        <NavLink exact to="/dashboard">
          <StyledP>Organizations</StyledP>
        </NavLink>
        <NavLink exact to="/clients">
          <StyledP>Clients</StyledP>
        </NavLink>
        {/* <NavLink exact to="/projects">
          <StyledP>Projects</StyledP>
        </NavLink> */}
      </NavBarDiv>
      <LogOutBtn onClick={LogOut}>
        <LogoutOutlined />
        Log out
      </LogOutBtn>
    </NavBarDivWrapper>
  );
}

export default Navbar;
