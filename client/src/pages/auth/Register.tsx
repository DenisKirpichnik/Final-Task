import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  BackGroundWrapper,
  MainWrapper,
  StyledInput,
  SubmitButton,
  StyledHeader,
  StyledMessage,
} from "../../components/styled-components/auth";
import "antd/dist/antd.css";
//Components
import { registerUser, checkAuth } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import Spinner from "../../components/layout/Spinner";

//TS
interface Props {
  setAlert: (msg: string, alertType: string) => void;
  registerLoading: boolean;
}

interface formData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  password2: string;
}

const Register: React.FC<Props> = ({ setAlert }) => {
  const [formData, setFormData] = useState<formData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });

  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated]);

  const { firstname, lastname, email, password, password2 } = formData;
  const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state: any) => state.auth.registerLoading);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("Passwords do not match", "failure"));
    } else {
      dispatch(registerUser(formData));
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        password2: "",
      });
      history.push("/login");
    }
  };

  if (loading) return <Spinner />;

  return (
    <BackGroundWrapper>
      <MainWrapper>
        <StyledHeader className="lead">
          <i className="fas fa-user" /> Create Your Account
        </StyledHeader>
        <form onSubmit={onSubmit}>
          <StyledInput
            type="text"
            placeholder="Firstname"
            name="firstname"
            value={firstname}
            onChange={onChange}
            allowClear
          ></StyledInput>
          <StyledInput
            type="text"
            placeholder="Lastname"
            name="lastname"
            value={lastname}
            onChange={onChange}
            allowClear
          ></StyledInput>
          <StyledInput
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            allowClear
          ></StyledInput>
          <StyledInput
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            allowClear
          ></StyledInput>
          <StyledInput
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            allowClear
          ></StyledInput>
          <SubmitButton htmlType="submit">Register</SubmitButton>
        </form>
        <StyledMessage>
          Already have an account? <Link to="/login">Log in</Link>
        </StyledMessage>
      </MainWrapper>
    </BackGroundWrapper>
  );
};

const MapStateToProps = (state: any) => {
  return { state: state, registerLoading: state.auth.registerLoading };
};

export default connect(MapStateToProps)(Register);
