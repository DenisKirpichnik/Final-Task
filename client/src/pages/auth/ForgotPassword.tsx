import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import {
  BackGroundWrapper,
  MainWrapper,
  StyledInput,
  SubmitButton,
  StyledHeader,
  StyledMessage1,
  FlexDiv,
} from "../../components/styled-components/auth";
import { forgotPassword } from "../../actions/auth";
import "antd/dist/antd.css";
import Spinner from "../../components/layout/Spinner";
interface Props {
  forgotPassword: (formdata: object) => void;
}

const ForgotPassword: React.FC<Props> = ({ forgotPassword }) => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const loading = useSelector((state: any) => state.auth.forgotPassLoading);

  const { email } = formData;
  console.log(formData);
  const onChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: any) => {
    e.preventDefault();
    forgotPassword(formData);
    setFormData({
      email: "",
    });
  };

  if (loading) return <Spinner />;

  return (
    <BackGroundWrapper>
      <MainWrapper>
        <StyledHeader>
          <i className="fas fa-user" /> What is my password?
        </StyledHeader>
        <h3>Type in your email</h3>
        <p>if your email is registered and confirmed, you will receive an email to reset a password</p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <StyledInput
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
            ></StyledInput>
          </div>
          <SubmitButton htmlType="submit">Reset</SubmitButton>
        </form>
        <StyledMessage1>
          Want to log in? <Link to="/login">Log in</Link>
        </StyledMessage1>
      </MainWrapper>
    </BackGroundWrapper>
  );
};

const MapStateToProps = (state: any) => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(MapStateToProps, { forgotPassword })(ForgotPassword);
