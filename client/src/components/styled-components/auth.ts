import { Button, Input } from "antd";
import styled from "styled-components";

//////Auth section //////

export const BackGroundWrapper = styled.div`
  width: 100%;
  height: 1000px;
  background-color: rgb(0, 117, 221);
`;

export const MainWrapper = styled.div`
  background-color: white;
  width: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const StyledHeader = styled.p`
  margin-left: 80px;
  width: 300px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-bottom: 5px;
  font-size: 25px !important;
`;

export const StyledInput = styled(Input)`
  width: 400px;
  margin-bottom: 5px;
  margin-left: 14px;
  height: 50px;
`;
export const SubmitButton = styled(Button)`
  padding-top: 5px;
  padding-bottom: 10px !important;
  width: 400px;
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
export const StyledMessage = styled.p`
  margin-left: 65px;
  width: 300px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 5px;
  font-size: 20px !important;
`;

export const StyledMessage1 = styled.p`
  margin-left: 50px;
  width: 350px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 5px;
  font-size: 20px !important;
`;

export const FlexDiv = styled.div`
  display: flex;
`;
