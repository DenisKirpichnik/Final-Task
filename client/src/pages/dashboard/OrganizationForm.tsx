import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { StyledInput, SubmitButton } from "../../components/styled-components/auth";
import { OrgInput } from "../../components/styled-components/orgform";
//Ant D
import styled from "styled-components";
import "antd/dist/antd.css";
import { Row, Col, Divider, Button, Input } from "antd";
import { ArrowLeftOutlined, CloseCircleOutlined } from "@ant-design/icons";
//actions
import { createOrganization, getOrganizations, updateOrganization } from "../../actions/profile";
import { showTable, showForm, showUpdateForm, showWindow } from "../../actions/profile";
interface Props {}

///Styled Comps

const TableWrapper = styled.div`
  margin-top: -15px;
`;

const FormDiv = styled.div`
  margin-top: -15px;
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
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
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

///////

const OrganizationForm: React.FC<Props> = () => {
  const [orgId, setOrgId] = useState(0);
  const [fetchOrg, setFetchOrg] = useState(false);

  const [detailsForm, setDetails] = useState({
    country: "",
    phone: "",
    currency: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    businessphone: "",
  });
  const [orgForm, setOrgForm] = useState({
    title: "",
    logo: "",
    details: {},
  });

  const { title, logo, details } = orgForm;
  const { country, phone, currency, address, city, state, zipcode, businessphone } = detailsForm;

  //Redux state
  const dispatch = useDispatch();
  const accountId = useSelector((state: any) => state.auth.accountId);
  const currentOrg = useSelector((state: any) => state.profile.currentOrg);
  const whatToShow = useSelector((state: any) => state.profile.whatToShow);

  useEffect(() => {
    if (fetchOrg === true) dispatch(getOrganizations(accountId));
    setFetchOrg(false);
  }, [dispatch]);

  useEffect(() => {
    if (currentOrg) {
      setOrgId(currentOrg.id);
    }
  }, [detailsForm]);

  useEffect(() => {
    setOrgForm({ ...orgForm, details: detailsForm });
  }, [detailsForm]);

  useEffect(() => {
    if (currentOrg && whatToShow == "UpdateForm") {
      setOrgForm({
        title: currentOrg.title,
        logo: currentOrg.logo,
        details: { ...detailsForm },
      });
      setDetails({
        country: currentOrg.details.country,
        phone: currentOrg.details.phone,
        currency: currentOrg.details.currency,
        address: currentOrg.details.address,
        city: currentOrg.details.city,
        state: currentOrg.details.state,
        zipcode: currentOrg.details.zipcode,
        businessphone: currentOrg.details.businessphone,
      });
    }
  }, [whatToShow]);

  const style = { background: "#ffffff", padding: "8px 0" };

  //clears the form
  const clearForm = () => {
    setDetails({
      country: "",
      phone: "",
      currency: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      businessphone: "",
    });
    setOrgForm({
      title: "",
      logo: "",
      details: {},
    });
  };

  // Creates a new org
  const createOrg = async (e: any) => {
    e.preventDefault();
    dispatch(createOrganization(orgForm, accountId));
    setFetchOrg(true);
    dispatch(showTable());
    clearForm();
  };

  // Updates an org
  const updateOrg = async (e: any) => {
    e.preventDefault();
    dispatch(updateOrganization(orgId, orgForm));
    setFetchOrg(true);
    dispatch(showTable());
    clearForm();
  };

  function closeAndClearTheForm(e: any) {
    e.preventDefault();
    dispatch(showTable());
    clearForm();
  }

  return (
    <TableWrapper>
      <form onSubmit={whatToShow === "UpdateForm" ? updateOrg : createOrg}>
        <HorizontalFlexDiv>
          <CenterH2>{whatToShow === "UpdateForm" ? "Update an organization" : "Create a new organization"} </CenterH2>
        </HorizontalFlexDiv>
        <Divider orientation="left"></Divider>
        <FormDiv>
          <Row gutter={16}>
            <Col className="gutter-row" span={4}>
              <div style={style}>Company name</div>
            </Col>
            <Col className="gutter-row" span={20}>
              <div style={style}>
                <OrgInput
                  type="text"
                  placeholder="name of the company"
                  name="title"
                  value={title}
                  onChange={(e) => setOrgForm({ ...orgForm, title: e.target.value })}
                  required
                  allowClear
                ></OrgInput>
              </div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row" span={4}>
              <div style={style}>Address</div>
            </Col>
            <Col className="gutter-row" span={20}>
              <div style={style}>
                <OrgInput
                  type="text"
                  placeholder="Street Address"
                  name="address"
                  value={address}
                  onChange={(e) => setDetails({ ...detailsForm, address: e.target.value })}
                  required
                  allowClear
                ></OrgInput>
              </div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row" span={4}>
              <div style={style}></div>
            </Col>
            <Col className="gutter-row" span={10}>
              <div style={style}>
                <OrgInput
                  type="text"
                  placeholder="City"
                  name="city"
                  value={city}
                  onChange={(e) => setDetails({ ...detailsForm, city: e.target.value })}
                  allowClear
                  required
                ></OrgInput>
              </div>
            </Col>
            <Col className="gutter-row" span={10}>
              <div style={style}>
                <OrgInput
                  type="text"
                  placeholder="State"
                  name="state"
                  value={state}
                  onChange={(e) => setDetails({ ...detailsForm, state: e.target.value })}
                  allowClear
                  required
                ></OrgInput>
              </div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row" span={4}>
              <div style={style}></div>
            </Col>
            <Col className="gutter-row" span={10}>
              <div style={style}>
                <OrgInput
                  type="text"
                  placeholder="Zip Code"
                  name="zipcode"
                  value={zipcode}
                  onChange={(e) => setDetails({ ...detailsForm, zipcode: e.target.value })}
                  required
                  allowClear
                ></OrgInput>
              </div>
            </Col>
            <Col className="gutter-row" span={10}>
              <div style={style}>
                <OrgInput
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={country}
                  onChange={(e) => setDetails({ ...detailsForm, country: e.target.value })}
                  required
                  allowClear
                ></OrgInput>
              </div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row" span={4}>
              <div style={style}>Base Currency</div>
            </Col>
            <Col className="gutter-row" span={20}>
              <div style={style}>
                <OrgInput
                  type="text"
                  placeholder="Currency"
                  name="currency"
                  value={currency}
                  onChange={(e) => setDetails({ ...detailsForm, currency: e.target.value })}
                  required
                  allowClear
                ></OrgInput>
              </div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row" span={4}>
              <div style={style}>Business Phone</div>
            </Col>
            <Col className="gutter-row" span={20}>
              <div style={style}>
                <OrgInput
                  type="text"
                  placeholder="business number"
                  name="businesphone"
                  value={businessphone}
                  onChange={(e) => setDetails({ ...detailsForm, businessphone: e.target.value })}
                  required
                  allowClear
                ></OrgInput>
              </div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row" span={4}>
              <div style={style}>Mobile Phone</div>
            </Col>
            <Col className="gutter-row" span={20}>
              <div style={style}>
                <OrgInput
                  type="text"
                  placeholder="mobile number"
                  name="phone"
                  value={phone}
                  onChange={(e) => setDetails({ ...detailsForm, phone: e.target.value })}
                  required
                  allowClear
                ></OrgInput>
              </div>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col className="gutter-row" span={4}>
              <div style={style}>Logo</div>
            </Col>
            <Col className="gutter-row" span={20}>
              <div style={style}>
                <OrgInput
                  type="text"
                  placeholder="link to your logo"
                  name="logo"
                  value={logo}
                  onChange={(e) => setOrgForm({ ...orgForm, logo: e.target.value })}
                  required
                  allowClear
                ></OrgInput>
              </div>
            </Col>
          </Row>
        </FormDiv>
        <ButtonDiv>
          <BackBtn onClick={closeAndClearTheForm}>
            <ArrowLeftOutlined />
            Back
          </BackBtn>
          <CreateButton type="submit">{whatToShow === "UpdateForm" ? "Update" : "Create"} </CreateButton>
        </ButtonDiv>
      </form>
    </TableWrapper>
  );
};

export default OrganizationForm;
