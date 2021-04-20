import React, { useEffect } from "react";
import Spinner from "../../components/layout/Spinner";
import Navbar from "../../components/layout/Navbar";
import { useDispatch, useSelector } from "react-redux";
import OrgsTable from "./OrgsTable";
import ClientsTable from "./ClientsTable";
import ProjectsTable from "./ProjectsTable";
import ProjectForm from "./ProjectForm";
import { getProjects, showProjectsTable } from "../../actions/project";
import styled from "styled-components";
import { getClients, showClientsTable } from "../../actions/clients";

const ProjectsDiv = styled.div`
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

function Project() {
  //Redux State
  const dispatch = useDispatch();
  const clientId = useSelector((state: any) => state.client.clientId);
  const whatToShow = useSelector((state: any) => state.project.whatToShow);
  const projects = useSelector((state: any) => state.project.projects);
  const orgId = useSelector((state: any) => state.profile.orgId);
  const projectLoading = useSelector((state: any) => state.project.projectLoading);
  useEffect(() => {
    if (clientId !== 0) {
      dispatch(getProjects(clientId));
      dispatch(showProjectsTable());
    }
  }, []);

  useEffect(() => {
    if (orgId !== 0) {
      dispatch(getClients(orgId));
      dispatch(showClientsTable());
    }
  }, []);

  useEffect(() => {
    dispatch(getProjects(clientId));
  }, []);

  // console.log(projects);
  // console.log("whatToShow projects --- ", whatToShow);

  if (projectLoading) return <Spinner />;

  return (
    <>
      <Navbar />
      <ProjectsDiv>
        {/* TABLE TO SHOW ORGS */}
        {whatToShow === "OrgsTable" ? <OrgsTable /> : null}
        {/* TABLE TO SHOW CLIENTS */}
        {whatToShow === "ClientsTable" ? <ClientsTable /> : null}
        {/* TABLE TO SHOW PROJECTS */}
        {whatToShow === "ProjectsTable" ? <ProjectsTable /> : null}
        {/* FORM TO CREATE NEW RPO */}
        {whatToShow === "ProjectsForm" || whatToShow === "ProjectsUpdateForm" ? <ProjectForm /> : null}
      </ProjectsDiv>
    </>
  );
}

export default Project;
