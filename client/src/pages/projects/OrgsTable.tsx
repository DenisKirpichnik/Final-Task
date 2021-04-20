import React, { useEffect, useState } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

import Spinner from "../../components/layout/Spinner";
import "antd/dist/antd.css";

import { flattenObject } from "../dashboard/helper";
//Styled Comp && Ant
import styled from "styled-components";
import { getOrganizations, setcurrentorganization } from "../../actions/profile";
import { DashboardWrapper } from "../../components/styled-components/dashboard";
import { Row, Col, Divider, Table, Tag, Space } from "antd";
import { getClients, showClientsTable } from "../../actions/clients";
import { showOrgTable } from "../../actions/project";

////Styled components

export const HorizontalFlexDiv = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  height: 25px;
`;

const CenterH2 = styled.p`
  margin-left: auto;
  margin-right: auto;
  font-size: 25px;
  font-weight: 600;
  @media (max-width: 600px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledTable = styled(Table)`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 600px) {
    width: 100%;
    padding: 10px;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
  @media (max-width: 1024px) {
    width: 100%;
    padding: 10px;
  }
`;

export const StyledLogo = styled.img`
  width: 40px;
  height: 40px;
`;

export const StyledButton = styled.button`
  margin-left: 5px;
  background-color: #1ac21a;
  padding: 5px 10px;
  color: #ffffff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #46c42d;
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    font-size: 13px;
    margin-left: -10px;
    margin-right: 5px;
  }
`;
//////////////////////////////////////////

function OrgsTable() {
  const currentOrg = useSelector((state: any) => state.profile.currentOrg);
  const clientLoading = useSelector((state: any) => state.client.clientLoading);
  const organizations = useSelector((state: any) => state.profile.organizations);
  const clients = useSelector((state: any) => state.client.clients);
  const whatToShow = useSelector((state: any) => state.client.whatToShow);
  const orgId = useSelector((state: any) => state.profile.orgId);
  //const orgId = currentOrg.id;
  //console.log("clients", clients);
  //console.log("clients", whatToShow);
  const flatten = organizations.map((el: any) => flattenObject(el));

  //Table

  const dispatch = useDispatch();

  function viewClients(e: any, orgId: number) {
    e.preventDefault();
    dispatch(setcurrentorganization(orgId));
    dispatch(getClients(orgId));
    dispatch(showClientsTable());
    console.log("good click btn");
  }

  const data = flatten;
  const columns = [
    {
      title: "Company Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      key: "view",
      render: (record: any) => (
        <Space size="small">
          <StyledButton
            onClick={(e) => {
              viewClients(e, record.id);
            }}
          >
            View Clients
          </StyledButton>
        </Space>
      ),
    },
  ];

  if (clientLoading) return <Spinner />;
  return (
    <div>
      <HorizontalFlexDiv>
        <CenterH2>List of the Organizations </CenterH2>
      </HorizontalFlexDiv>
      <Divider />
      {organizations ? <StyledTable columns={columns} dataSource={data} /> : null}
    </div>
  );
}

export default OrgsTable;
