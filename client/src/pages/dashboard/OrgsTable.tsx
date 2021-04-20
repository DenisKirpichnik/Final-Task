import { configConsumerProps } from "antd/lib/config-provider";
import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
//Actions
import { getOrganizations, setcurrentorganization } from "../../actions/profile";
import "antd/dist/antd.css";
import { Table, Tag, Space, Divider } from "antd";
import { flattenObject } from "./helper";
import styled from "styled-components";
import { Button, Input } from "antd";

import { showTable, showForm, showUpdateForm, showWindow } from "../../actions/profile";

////Styled components
const TableDiv = styled.div`
  width: 100%;
`;

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
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 600px) {
    width: 375px;
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

interface Props {}

const OrgsTable: React.FC<Props> = () => {
  //Redux state
  const dispatch = useDispatch();
  const organizations = useSelector((state: any) => state.profile.organizations);
  const currentOrg = useSelector((state: any) => state.profile.currentOrg);
  const needsUpdate = useSelector((state: any) => state.profile.needsUpdate);
  const accountId = useSelector((state: any) => state.auth.accountId);
  const whatToShow = useSelector((state: any) => state.profile.whatToShow);

  useEffect(() => {
    if (needsUpdate) {
      dispatch(getOrganizations(accountId));
    }
  }, [needsUpdate]);

  function viewOrg(e: any, orgId: number) {
    e.preventDefault();
    console.log(orgId);
    dispatch(setcurrentorganization(orgId));
    dispatch(showWindow());
  }

  function updateOrg(e: any, orgId: number) {
    e.preventDefault();
    console.log("this is the orgId", orgId);
    dispatch(setcurrentorganization(orgId));
    dispatch(showUpdateForm());
  }

  const flatten = organizations.map((el: any) => flattenObject(el));

  //Table
  const data = flatten;
  const columns = [
    {
      title: "Company Name",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   key: "phone",
    // },
    {
      key: "view",
      render: (record: any) => (
        <Space size="small">
          <StyledButton
            onClick={(e) => {
              viewOrg(e, record.id);
            }}
          >
            View
          </StyledButton>
          <StyledButton
            onClick={(e) => {
              updateOrg(e, record.id);
            }}
          >
            Update
          </StyledButton>
        </Space>
      ),
    },
  ];

  return (
    <TableDiv>
      <HorizontalFlexDiv>
        <CenterH2>List of Organizations </CenterH2>
      </HorizontalFlexDiv>
      <Divider orientation="left"></Divider>

      {organizations ? <StyledTable columns={columns} dataSource={data} /> : null}
    </TableDiv>
  );
};

export default OrgsTable;
