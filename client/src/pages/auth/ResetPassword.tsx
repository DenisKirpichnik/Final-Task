import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, useParams, useLocation } from "react-router-dom";
import {
  BackGroundWrapper,
  MainWrapper,
  StyledInput,
  SubmitButton,
  StyledHeader,
  StyledMessage1,
  FlexDiv,
} from "../../components/styled-components/auth";
import { resetPassword } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import "antd/dist/antd.css";
import Spinner from "../../components/layout/Spinner";
interface Props {
  setAlert: (msg: string, alertType: string) => void;
  resetPassword: (formData: object, id: number, token: string) => void;
}

const ResetPassword: React.FC<Props> = ({ setAlert, resetPassword }) => {
  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
    id: 0,
    token: "",
  });
  const history = useHistory();
  const params = useParams();
  const values = Object.values(params);
  const urlid = Number(values[0]);
  const urltoken: any = values[1];
  useEffect(() => {
    setFormData({ ...formData, id: urlid, token: urltoken });
  }, []);
  const { password1, password2, id, token } = formData;

  const loading = useSelector((state: any) => state.auth.resetPassLoading);

  const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  //synthetic event google it for e:any
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (password1 !== password2) {
      setAlert("Passwords don't match", "failure");
    }
    resetPassword(formData, id, token);
    setTimeout(() => history.push("/login"), 5000);
  };

  if (loading) return <Spinner />;

  return (
    <BackGroundWrapper>
      <MainWrapper>
        <StyledHeader>
          <i className="fas fa-user" /> Reset your password
        </StyledHeader>
        <form onSubmit={onSubmit}>
          <StyledInput
            type="password"
            placeholder="New password"
            name="password1"
            value={password1}
            onChange={onChange}
            required
          ></StyledInput>
          <StyledInput
            type="password"
            placeholder="Confirm  new password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
          ></StyledInput>
          <SubmitButton htmlType="submit">Reset your password</SubmitButton>
        </form>
        <StyledMessage1>
          <Link to="/login">Log in</Link>
        </StyledMessage1>
      </MainWrapper>
    </BackGroundWrapper>
  );
};

const MapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    accountId: state.auth.accountId,
  };
};

export default connect(MapStateToProps, { setAlert, resetPassword })(ResetPassword);
