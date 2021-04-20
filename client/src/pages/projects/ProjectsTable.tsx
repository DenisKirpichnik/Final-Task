import { Link, Route, Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
//Styled Comp
import { DashboardWrapper } from "../../components/styled-components/dashboard";
import styled from "styled-components";
// Components
import Spinner from "../../components/layout/Spinner";

// Actions
import {
  deleteProject,
  getProjects,
  setCurrentProject,
  showProjectForm,
  showProjectUpdateForm,
} from "../../actions/project";
import { getOrganizations, setcurrentorganization } from "../../actions/profile";
import { Row, Col, Divider, Table, Tag, Space } from "antd";
import { flattenObject } from "../dashboard/helper";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect } from "react";

// Styled Components
export const HorizontalFlexDiv = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  height: 25px;
`;

const CreateNewProjectBtn = styled.button`
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

export const DeleteBtn = styled.button`
  color: white;
  background-color: #f81717;
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  font-weight: bold;
  margin-left: 20px;
  &:hover {
    background-color: #eb3f3f;
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
////
function ProjectsTable() {
  //Redux state
  const dispatch = useDispatch();
  const projects = useSelector((state: any) => state.project.projects);
  const needsUpdate = useSelector((state: any) => state.project.needsUpdate);
  const currentClient = useSelector((state: any) => state.client.currentClient);
  const clientId = useSelector((state: any) => state.client.clientId);
  const projectLoading = useSelector((state: any) => state.project.projectLoading);
  const data = projects;
  const columns = [
    {
      title: "Project Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },

    {
      key: "view",
      render: (record: any) => (
        <Space size="small">
          <DeleteBtn
            onClick={(e) => {
              deleteProject1(e, record.id);
            }}
          >
            Delete
          </DeleteBtn>
          <StyledButton
            onClick={(e) => {
              updateProject(e, record.id);
            }}
          >
            Update
          </StyledButton>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (needsUpdate === true) {
      dispatch(getProjects(clientId));
    }
  }, [needsUpdate]);

  function deleteProject1(e: any, projectId: any) {
    e.preventDefault();
    dispatch(deleteProject(projectId));
    console.log("good click btn");
  }

  function updateProject(e: any, projectId: number) {
    e.preventDefault();
    dispatch(setCurrentProject(projectId));
    dispatch(showProjectUpdateForm());
    console.log("good click btn");
  }

  function openCreationForm(e: any) {
    e.preventDefault();
    dispatch(showProjectForm());
  }

  if (projectLoading) return <Spinner />;

  return (
    <div>
      <HorizontalFlexDiv>
        <CreateNewProjectBtn onClick={openCreationForm}>Create Project</CreateNewProjectBtn>
        <CenterH2>List of the Projects {currentClient ? `for ${currentClient.title}` : null}</CenterH2>
      </HorizontalFlexDiv>
      <Divider />
      {projects ? <StyledTable columns={columns} dataSource={data} /> : null}
    </div>
  );
}

export default ProjectsTable;
