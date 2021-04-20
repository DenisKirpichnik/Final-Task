import React, { Fragment, SyntheticEvent, useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {
  BackGroundWrapper,
  MainWrapper,
  StyledInput,
  SubmitButton,
  StyledHeader,
  StyledMessage1,
  FlexDiv,
} from "../../components/styled-components/auth";
//Actions
import { loginUser, checkAuth } from "../../actions/auth";
//Comp
import Spinner from "../../components/layout/Spinner";

interface Props {
  isAuthenticated: boolean;
  loginUser: (email: string, password: string, accountId: number) => void;
  accountId: number;
  loginLoading: boolean;
}

const Login: React.FC<Props> = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector((state: RootStateOrAny) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootStateOrAny) => state.auth.loginLoading);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated]);

  const { email, password } = formData;
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement> //synthetic event google it for e:any
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  if (loading) return <Spinner />;

  return (
    <BackGroundWrapper>
      <MainWrapper>
        <StyledHeader>
          <i className="fas fa-user" /> Log into your Account
        </StyledHeader>
        <form onSubmit={onSubmit}>
          <StyledInput
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          ></StyledInput>
          <StyledInput
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          ></StyledInput>
          <SubmitButton htmlType="submit">Log in</SubmitButton>
        </form>
        <FlexDiv>
          <StyledMessage1>
            <Link to="/forgot-password">Forgot your password?</Link>
          </StyledMessage1>
          <StyledMessage1>
            <Link to="/register">Sign Up</Link>
          </StyledMessage1>
        </FlexDiv>
      </MainWrapper>
    </BackGroundWrapper>
  );
};

export default Login;
