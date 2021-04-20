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
import { createProject, getProjects, showProjectsTable, updateProject } from "../../actions/project";

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
`;
/////
interface Props {}

const ProjectForm: React.FC<Props> = ({}) => {
  const [dataForm, setDataForm] = useState({
    title: "",
    description: "",
    type: "",
  });
  const { title, description, type } = dataForm;

  //Redux state
  const dispatch = useDispatch();
  const accountId = useSelector((state: any) => state.profile.accountId);
  const currentOrg = useSelector((state: any) => state.profile.currentOrg);
  const orgId = useSelector((state: any) => state.profile.orgId);
  const currentClient = useSelector((state: any) => state.client.currentClient);
  const clientId = useSelector((state: any) => state.client.clientId);
  const needsUpdate = useSelector((state: any) => state.project.needsUpdate);
  const projectLoading = useSelector((state: any) => state.client.projectLoading);
  const currentProject = useSelector((state: any) => state.project.currentProject);
  const projectId = useSelector((state: any) => state.project.projectId);
  const whatToShow = useSelector((state: any) => state.project.whatToShow);

  const clearForm = () => {
    setDataForm({
      title: "",
      description: "",
      type: "",
    });
  };

  useEffect(() => {
    if (needsUpdate === true) {
      dispatch(getProjects(clientId));
    }
  }, [needsUpdate]);

  useEffect(() => {
    if (currentProject && whatToShow == "ProjectsUpdateForm") {
      setDataForm({
        title: currentProject.title,
        description: currentProject.description,
        type: currentProject.type,
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
    dispatch(showProjectsTable());
    clearForm();
  }

  // Creates a new client
  const createProject1 = (e: any) => {
    e.preventDefault();
    dispatch(createProject(dataForm, clientId));
    dispatch(showProjectsTable());
    clearForm();
  };

  // Updates an org
  const updateProject1 = (e: any) => {
    e.preventDefault();
    dispatch(updateProject(dataForm, projectId));
    dispatch(showProjectsTable());
    clearForm();
  };

  if (projectLoading) return <Spinner />;

  return (
    <ClientFormWrapper>
      <HorizontalFlexDiv>
        <CenterH2>{whatToShow === "ProjectsUpdateForm" ? "Update a Project" : "Add a new project"} </CenterH2>
      </HorizontalFlexDiv>
      {/* <form onSubmit={openUpdate === 1 ? updateOrg : createOrg}> */}

      <form onSubmit={whatToShow === "ProjectsUpdateForm" ? updateProject1 : createProject1}>
        <Divider orientation="left"></Divider>
        <StyledFormDiv>
          <HorizFlexDiv>
            <DescrP>Name</DescrP>
            <ClientInput
              type="text"
              placeholder="Client name"
              name="title"
              value={title}
              onChange={(e: any) => setDataForm({ ...dataForm, title: e.target.value })}
              required
              allowClear
              bordered={false}
            ></ClientInput>
          </HorizFlexDiv>
          <HorizFlexDiv>
            <DescrP>Email</DescrP>
            <ClientInput
              type="text"
              placeholder="description"
              name="description"
              value={description}
              onChange={(e: any) => setDataForm({ ...dataForm, description: e.target.value })}
              required
              allowClear
              bordered={false}
            ></ClientInput>
          </HorizFlexDiv>
          <HorizFlexDiv>
            <DescrP>Phone </DescrP>
            <ClientInput
              type="text"
              placeholder="Type"
              name="type"
              value={type}
              onChange={(e: any) => setDataForm({ ...dataForm, type: e.target.value })}
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
            <CreateButton type="submit">{whatToShow === "ProjectsUpdateForm" ? "Update" : "Create"} </CreateButton>
          </ButtonDiv>
        </StyledFormDiv>
      </form>
    </ClientFormWrapper>
  );
};
export default ProjectForm;
