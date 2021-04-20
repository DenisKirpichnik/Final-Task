import React, { useEffect, useState } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// Components
import OrganizationForm from "./OrganizationForm";
import OrganizationWindow from "./OrganizationWindow";
import Organization from "./Organization";

import Spinner from "../../components/layout/Spinner";
import Navbar from "../../components/layout/Navbar";
import OrgsTable from "./OrgsTable";
// Actions
import { getOrganizations } from "../../actions/profile";
import { checkAuth } from "../../actions/auth";
import { showTable, showForm, showUpdateForm, showWindow } from "../../actions/profile";

//Styled Components
export const DashboardWrapper = styled.div`
  width: 1200px;
  display: flex;
  min-height: 700px;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1024px) {
    width: 1024px;
    padding: 10px;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
  @media (max-width: 600px) {
    width: 100%;
    padding: 10px;
  }
`;

export const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const CreateNewOrgBtn = styled.button`
  width: 200px;
  position: absolute;
  margin-bottom: -10px;
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

////////////////////////////////////////
interface Props {
  isAuthenticated: boolean | null;
  logoutUser: () => void;
  accountId: number | null;
  currentProfile: any;
  token: string;
  organizations: any;
  currentOrg: any;
  update: number;
}

const Dashboard: React.FC<Props> = ({}) => {
  // Openining only 1 tab at  a time
  const [openTable, setOpenTable] = useState(true);
  const [openView, setOpenView] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  //Redux state
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const user = useSelector((state: any) => state.auth.user);
  const accountId = useSelector((state: any) => state.auth.accountId);
  const organizations = useSelector((state: any) => state.profile.organizations);
  const currentOrg = useSelector((state: any) => state.profile.currentOrg);
  const orgLoading = useSelector((state: any) => state.profile.orgLoading);
  const clients = useSelector((state: any) => state.client.clients);
  const whatToShow = useSelector((state: any) => state.profile.whatToShow);

  console.log(whatToShow);
  useEffect(() => {
    dispatch(getOrganizations(accountId));
    dispatch(checkAuth());
  }, []);

  if (isAuthenticated === false) {
    return <Redirect to="login" />;
  }

  if (orgLoading) return <Spinner />;

  function openFormCloseView(e: any) {
    dispatch(showForm());
  }

  return (
    <>
      <Navbar />
      <DashboardWrapper>
        <DashboardContainer>
          {/*I. TABLE TO SHOW ALL THE ORGS */}
          {whatToShow === "Table" ? (
            <div>
              <CreateNewOrgBtn onClick={openFormCloseView}>Create Organization</CreateNewOrgBtn>
              <OrgsTable />
            </div>
          ) : null}
          {/*II. WINDOW FOR VIEWING AN ORG*/}
          {whatToShow === "Window" ? <OrganizationWindow /> : null}
          {/*III. FORM FOR CREATING || UPDATING */}
          {whatToShow === "Form" || whatToShow === "UpdateForm" ? <OrganizationForm /> : null}
        </DashboardContainer>
      </DashboardWrapper>
    </>
  );
};

export default Dashboard;
