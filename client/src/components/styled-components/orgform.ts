import { Button, Input } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
//////Auth section //////

export const DashboardWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 1000px;
`;

export const HorizontalFlexDiv = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  height: 50px;
`;

export const OrgInput = styled(Input)`
  width: 100%;
  margin-bottom: 5px;
  margin-left: 14px;
  height: 50px;
`;

export const CreateButton = styled(Button)`
  padding-top: 5px;
  padding-bottom: 10px !important;
  width: 33%;
  margin-left: 14px;
  margin-bottom: 5px;
  font-size: 18px !important;
  height: 42px;
  background-color: rgb(23, 235, 23);
  color: white;
  &:hover {
    color: white;
    background-color: rgb(9, 206, 9);
  }
`;
