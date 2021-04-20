import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { connect, useDispatch, useSelector } from "react-redux";
import { StyledInput, SubmitButton } from "../../components/styled-components/auth";
import { OrgInput } from "../../components/styled-components/orgform";
//Ant D
import "antd/dist/antd.css";
import { Row, Col, Divider, Input } from "antd";

//actions
import { createOrganization, getOrganizations, updateOrganization } from "../../actions/profile";
import { createClient, showClientsTable, updateClient, getClients } from "../../actions/clients";
import { ArrowLeftOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Spinner from "../../components/layout/Spinner";

////// Styled components
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
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ClientFormWrapper = styled.div`
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px) {
    width: 100%;
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

const ClientInput = styled(Input)`
  width: 350px;
  margin-bottom: 5px;
  margin-left: 14px;
  height: 50px;
  &:selected {
    border: 1px solid black;
    outline: none;
    box-shadow: 0px 0px 2px red;
  }
  &:focus {
    border: 1px solid black;
    outline: none;
    box-shadow: 0px 0px 2px red;
  }
  &:hover {
    color: white;
    background-color: rgba(233, 240, 233, 0.707);
    border: 1px solid black;
  }
`;

export const StyledFormDiv = styled.div`
  ${ClientInput}:focus & {
    color: red;
    background-color: blue;
  }
`;

export const HorizFlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DescrP = styled.p`
  margin-top: 12px;
  font-size: 16px;
  font-weight: bold;
  width: 60px;
`;

export const CreateButton = styled.button`
  width: 150px;
  color: white;
  background-color: #1ac21a;
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  font-weight: bold;
  margin-right: -12px;
  &:hover {
    background-color: #29ae0e;
    transform: scale(1.02);
  }
  @media (max-width: 600px) {
    margin-right: 5px;
  }
`;
/////
interface Props {}

const ClientForm: React.FC<Props> = ({}) => {
  const [detailsForm, setDetails] = useState({
    phone: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });
  const [orgForm, setOrgForm] = useState({
    title: "",
    email: "",
    details: {},
  });
  const dispatch = useDispatch();
  //Redux state
  const accountId = useSelector((state: any) => state.profile.accountId);
  const currentOrg = useSelector((state: any) => state.profile.currentOrg);
  const orgId = useSelector((state: any) => state.profile.currentOrg.id);
  const whatToShow = useSelector((state: any) => state.client.whatToShow);
  const currentClient = useSelector((state: any) => state.client.currentClient);
  const clientId = useSelector((state: any) => state.client.clientId);
  const needsUpdate = useSelector((state: any) => state.client.needsUpdate);
  const clientLoading = useSelector((state: any) => state.client.clientLoading);
  useEffect(() => {
    setOrgForm({ ...orgForm, details: detailsForm });
  }, [detailsForm]);

  //test

  //   useEffect(() => {
  //     dispatch(getOrganizations(accountId));
  //   }, [dispatch]);

  const { title, email } = orgForm;
  const { phone, city, state, zipcode, country } = detailsForm;

  // clears the form
  const clearForm = () => {
    setDetails({
      phone: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    });
    setOrgForm({
      title: "",
      email: "",
      details: {},
    });
  };

  //console.log("openUpdate", openUpdate);

  useEffect(() => {
    if (currentClient && whatToShow == "ClientsUpdateForm") {
      setOrgForm({
        title: currentClient.title,
        email: currentClient.email,
        details: { ...detailsForm },
      });
      setDetails({
        phone: currentClient.details.phone,
        city: currentClient.details.city,
        state: currentClient.details.state,
        zipcode: currentClient.details.zipcode,
        country: currentClient.details.country,
      });
    }
  }, [whatToShow]);

  useEffect(() => {
    if (needsUpdate === true) {
      dispatch(getClients(orgId));
    }
  }, [needsUpdate]);

  const style = { background: "#ffffff", padding: "8px 0" };

  function closeAndClearTheForm(e: any) {
    e.preventDefault();
    dispatch(showClientsTable());
    clearForm();
  }

  // Creates a new client
  const createClient1 = (e: any) => {
    e.preventDefault();
    dispatch(createClient(orgForm, orgId));
    dispatch(showClientsTable());
    clearForm();
  };

  // Updates an org
  const updateClient1 = (e: any) => {
    e.preventDefault();
    dispatch(updateClient(orgForm, clientId));
    dispatch(showClientsTable());
    clearForm();
  };

  if (clientLoading) return <Spinner />;

  return (
    <ClientFormWrapper>
      <HorizontalFlexDiv>
        <CenterH2>{whatToShow === "ClientsUpdateForm" ? "Update a Client" : "Add a new client"} </CenterH2>
      </HorizontalFlexDiv>
      {/* <form onSubmit={openUpdate === 1 ? updateOrg : createOrg}> */}

      <form onSubmit={whatToShow === "ClientsUpdateForm" ? updateClient1 : createClient1}>
        <Divider orientation="left"></Divider>
        <StyledFormDiv>
          <HorizFlexDiv>
            <DescrP>Name</DescrP>
            <ClientInput
              type="text"
              placeholder="Client name"
              name="title"
              value={title}
              onChange={(e: any) => setOrgForm({ ...orgForm, title: e.target.value })}
              required
              allowClear
              bordered={false}
            ></ClientInput>
          </HorizFlexDiv>
          <HorizFlexDiv>
            <DescrP>Email</DescrP>
            <ClientInput
              type="text"
              placeholder="Client email"
              name="email"
              value={email}
              onChange={(e: any) => setOrgForm({ ...orgForm, email: e.target.value })}
              required
              allowClear
              bordered={false}
            ></ClientInput>
          </HorizFlexDiv>
          <HorizFlexDiv>
            <DescrP>Phone </DescrP>
            <ClientInput
              type="text"
              placeholder="Client phone number"
              name="phone"
              value={phone}
              onChange={(e: any) => setDetails({ ...detailsForm, phone: e.target.value })}
              required
              allowClear
              bordered={false}
            ></ClientInput>
          </HorizFlexDiv>
          <HorizFlexDiv>
            <DescrP>Country </DescrP>
            <ClientInput
              type="text"
              placeholder="Country"
              name="country"
              value={country}
              onChange={(e: any) => setDetails({ ...detailsForm, country: e.target.value })}
              required
              allowClear
              bordered={false}
            ></ClientInput>
          </HorizFlexDiv>
          <HorizFlexDiv>
            <DescrP>City </DescrP>
            <ClientInput
              type="text"
              placeholder="City"
              name="city"
              value={city}
              onChange={(e: any) => setDetails({ ...detailsForm, city: e.target.value })}
              required
              allowClear
              bordered={false}
            ></ClientInput>
          </HorizFlexDiv>
          <HorizFlexDiv>
            <DescrP>State </DescrP>
            <ClientInput
              type="text"
              placeholder="State"
              name="state"
              value={state}
              onChange={(e: any) => setDetails({ ...detailsForm, state: e.target.value })}
              required
              allowClear
              bordered={false}
            ></ClientInput>
          </HorizFlexDiv>
          <HorizFlexDiv>
            <DescrP>Zipcode </DescrP>
            <ClientInput
              type="text"
              placeholder="Zipcode"
              name="zipcode"
              value={zipcode}
              onChange={(e: any) => setDetails({ ...detailsForm, zipcode: e.target.value })}
              required
              allowClear
              bordered={false}
            ></ClientInput>
          </HorizFlexDiv>
          <ButtonDiv>
            <BackBtn onClick={closeAndClearTheForm}>
              <ArrowLeftOutlined />
              Back
            </BackBtn>
            <CreateButton type="submit">{whatToShow === "ClientsUpdateForm" ? "Update" : "Create"} </CreateButton>
          </ButtonDiv>
        </StyledFormDiv>
      </form>
    </ClientFormWrapper>
  );
};
export default ClientForm;
