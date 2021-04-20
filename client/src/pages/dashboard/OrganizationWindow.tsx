import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { deleteOrganization } from "../../actions/profile";
import { Button, Input } from "antd";
import styled from "styled-components";
import { StyledInput, SubmitButton } from "../../components/styled-components/auth";
import { useHistory } from "react-router";
import { Row, Col, Divider } from "antd";
import { ArrowLeftOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { showTable, showForm, showUpdateForm, showWindow } from "../../actions/profile";

//STYLED COMPONENTS

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
export const OrgInput = styled(Input)`
  width: 100%;
  margin-bottom: 5px;
  margin-left: 14px;
  height: 50px;
`;

const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const OrgWindowInnerDiv = styled.div`
  margin-top: -14px;
`;

const ButtonDivRightPart = styled.div``;

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
export const ViewClientsBtn = styled.button`
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

export const OrgWindowWrapper = styled.div`
  margin-top: -10px;
  width: 100%;
  min-height: 600px;
  background-color: rgb(255, 255, 255);
`;

///////////////////////////
interface Props {}

const OrganizationWindow: React.FC<Props> = () => {
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
  // Redux state
  const accountId = useSelector((state: any) => state.auth.accountId);
  const needsUpdate = useSelector((state: any) => state.profile.needsUpdate);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentOrg = useSelector((state: any) => state.profile.currentOrg);
  const whatToShow = useSelector((state: any) => state.profile.whatToShow);

  useEffect(() => {
    if (currentOrg && whatToShow == "Window") {
      //CHANGE TO  REDUX //
      setOrgForm({
        title: currentOrg.title,
        logo: currentOrg.logo,
        details: {},
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

  function deleteOrg(e: any) {
    e.preventDefault();
    dispatch(deleteOrganization(currentOrg.id));
    dispatch(showTable());
  }

  function viewClients(e: any) {
    e.preventDefault();
    dispatch(showTable());
    history.push("/clients");
  }

  return (
    <OrgWindowWrapper>
      <HorizontalFlexDiv>
        <CenterH2>Organization overview </CenterH2>
      </HorizontalFlexDiv>
      <Divider orientation="left"></Divider>
      <OrgWindowInnerDiv>
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
              ></OrgInput>
            </div>
          </Col>
        </Row>
      </OrgWindowInnerDiv>
      <ButtonDiv>
        <BackBtn onClick={() => dispatch(showTable())}>
          <ArrowLeftOutlined />
          Back
        </BackBtn>
        <ButtonDivRightPart>
          <ViewClientsBtn onClick={viewClients}>View clients</ViewClientsBtn>
          <DeleteBtn onClick={deleteOrg}>Delete Organization</DeleteBtn>
        </ButtonDivRightPart>
      </ButtonDiv>
    </OrgWindowWrapper>
  );
};

export default OrganizationWindow;
