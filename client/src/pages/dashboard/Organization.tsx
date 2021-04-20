import { configConsumerProps } from "antd/lib/config-provider";
import React from "react";
import { connect } from "react-redux";
//Actions
import { setcurrentorganization } from "../../actions/profile";

import { Button, Input } from "antd";
import styled from "styled-components";

export const StyledLogo = styled.img`
  width: 40px;
  height: 40px;
`;
interface Props {
  title: string;
  id: number;
  view: boolean;
  logo: string;
  setView: (view: boolean) => void;
  setcurrentorganization: (id: number) => void;
  setOpenUpdate: (openUpdate: number) => void;
}

const Organization: React.FC<Props> = ({ title, id, setcurrentorganization, setView, view, logo, setOpenUpdate }) => {
  function viewOrg(e: any) {
    e.preventDefault();
    setcurrentorganization(id);
    setView(!view);
  }

  function updateAccount(e: any) {
    e.preventDefault();
    setcurrentorganization(id);
    setOpenUpdate(1);
  }

  return (
    <div>
      <p>{title}</p>
      <button onClick={viewOrg}>view</button>
      <button onClick={updateAccount}>update</button>
    </div>
  );
};

const MapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(MapStateToProps, { setcurrentorganization })(Organization);
