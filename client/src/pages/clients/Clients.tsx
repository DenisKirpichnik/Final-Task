import React, { useEffect, useState } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";

//Styled Comp
import { DashboardWrapper } from "../../components/styled-components/dashboard";
// Components
import ClientForm from "./ClientForm";
import OrgsTable from "./OrgsTable";
import Spinner from "../../components/layout/Spinner";
import ClientsTable from "./ClientsTable";
import ClientWindow from "./ClientWindow";
import { Row, Col, Divider } from "antd";
// Actions
import { createClient, getClients, deleteClient, showClientsTable } from "../../actions/clients";
import Navbar from "../../components/layout/Navbar";
import styled from "styled-components";
//Styled Components
const ClientsDiv = styled.div`
  width: 1200px;
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

//////////////////

function Clients() {
  const currentOrg = useSelector((state: any) => state.profile.currentOrg);
  const clientLoading = useSelector((state: any) => state.client.clientLoading);
  const clients = useSelector((state: any) => state.client.clients);
  const whatToShow = useSelector((state: any) => state.client.whatToShow);
  const orgId = useSelector((state: any) => state.profile.orgId);
  //const orgId = currentOrg.id;
  const dispatch = useDispatch();

  //console.log("clients", clients);

  useEffect(() => {
    if (orgId !== 0) {
      dispatch(showClientsTable());
    }
  }, []);

  useEffect(() => {
    if (orgId !== 0) {
      dispatch(getClients(orgId));
    }
  }, []);

  useEffect(() => {
    if (orgId !== 0) {
      dispatch(getClients(orgId));
    }
  }, [dispatch]);

  if (clientLoading) return <Spinner />;

  return (
    <>
      <Navbar />
      <ClientsDiv>
        {/* TABLE TO PICK AN ORG */}
        {whatToShow === "OrgsTable" ? <OrgsTable /> : null}
        {/* CLIENT FORM TO CREATE A NEW CLIENT */}
        {whatToShow === "ClientsForm" || whatToShow === "ClientsUpdateForm" ? <ClientForm /> : null}
        {/* CLIENT WINDOW TO VIEW A CLIENT*/}
        {whatToShow === "ClientWindow" ? <ClientWindow /> : null}
        {/* CLIENT Table */}
        {whatToShow === "ClientsTable" ? <ClientsTable /> : null}
      </ClientsDiv>
    </>
  );
}

export default Clients;
