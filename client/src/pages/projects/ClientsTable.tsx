import React, { useEffect, useState } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
//Styled Comp
import { DashboardWrapper } from "../../components/styled-components/dashboard";
import styled from "styled-components";
// Components
import Spinner from "../../components/layout/Spinner";

// Actions
import {
  createClient,
  getClients,
  deleteClient,
  showOrgsTable,
  showForm,
  showUpdateForm,
  setCurrentClient,
  showWindow,
} from "../../actions/clients";
import { getOrganizations, setcurrentorganization } from "../../actions/profile";
import { Row, Col, Divider, Table, Tag, Space } from "antd";
import { flattenObject } from "../dashboard/helper";
import { ArrowLeftOutlined } from "@ant-design/icons";

//Styled Components

const ClientsTableDiv = styled.div`
  width: 100%;
`;

export const HorizontalFlexDiv = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  height: 25px;
`;

const CreateNewClientBtn = styled.button`
  width: 200px;
  position: absolute;
  margin-top: 0px;
  color: white;
  background-color: #1ac21a;
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  font-weight: bold;
  &:hover {
    background-color: #29ae0e;
    transform: scale(1.02);
  }
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

export const BackBtn = styled.button`
  color: white;
  background-color: #1ac21a;
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  font-weight: bold;
  &:hover {
    background-color: #29ae0e;
    transform: scale(1.02);
  }
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
////
interface Props {}

const ClientsTable: React.FC<Props> = () => {
  const [data, setData] = useState([]);
  //Redux state
  const dispatch = useDispatch();
  const organizations = useSelector((state: any) => state.profile.organizations);
  const currentOrg = useSelector((state: any) => state.profile.currentOrg);
  const orgId = useSelector((state: any) => state.profile.orgId);
  const clientLoading = useSelector((state: any) => state.client.clientLoading);
  const clients = useSelector((state: any) => state.client.clients);
  //const orgId = currentOrg.id;
  //const needsUpdate = useSelector((state: any) => state.profile.needsUpdate);
  const accountId = useSelector((state: any) => state.auth.accountId);
  const whatToShow = useSelector((state: any) => state.client.whatToShow);
  const currentClient = useSelector((state: any) => state.client.currentClient);
  const clientId = useSelector((state: any) => state.client.clientId);
  const needsUpdate = useSelector((state: any) => state.client.needsUpdate);

  useEffect(() => {
    if (clients) {
      setData(clients.map((client: any) => flattenObject(client)));
    }
  }, []);

  useEffect(() => {
    if (needsUpdate === true) {
      dispatch(getClients(orgId));
    }
  }, [needsUpdate]);

  function viewClient(e: any, clientId: number) {
    e.preventDefault();
    dispatch(setCurrentClient(clientId));
    dispatch(showWindow());
  }

  function updateClient(e: any, clientId: number) {
    e.preventDefault();
    dispatch(setCurrentClient(clientId));
    dispatch(showUpdateForm());
  }

  function openFormCloseView(e: any) {
    e.preventDefault();
    dispatch(showForm());
  }

  const columns = [
    {
      title: "Client Name",
      dataIndex: "title",
      key: "title",
    },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   key: "email",
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   key: "country",
    // },

    {
      key: "view",
      render: (record: any) => (
        <Space size="small">
          <StyledButton
            onClick={(e) => {
              viewClient(e, record.id);
            }}
          >
            View
          </StyledButton>
          <StyledButton
            onClick={(e) => {
              updateClient(e, record.id);
            }}
          >
            Update
          </StyledButton>
        </Space>
      ),
    },
  ];

  if (clientLoading) return <Spinner />;

  return (
    <ClientsTableDiv>
      <HorizontalFlexDiv>
        <CreateNewClientBtn onClick={openFormCloseView}>Add Client</CreateNewClientBtn>
        <CenterH2>Clients {currentOrg ? `of ${currentOrg.title}` : null} </CenterH2>
      </HorizontalFlexDiv>
      <Divider />

      {clients ? <StyledTable columns={columns} dataSource={data} /> : null}
      <BackBtn onClick={() => dispatch(showOrgsTable())}>
        <ArrowLeftOutlined />
        Back
      </BackBtn>
    </ClientsTableDiv>
  );
};

export default ClientsTable;
