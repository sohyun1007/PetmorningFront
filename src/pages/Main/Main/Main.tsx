import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Layout/MainPageNavbar';
import LoginNavbar from '../../../components/Layout/LoginNavbar';
import Footer from '../../../components/Layout/Footer';
import styled from 'styled-components';
import { Intro, Vision, PetLose, Function, Service1, Service2, Service3 } from './components';

const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

type NullableString = string | null;

const setToken = (key: string, token: NullableString) => {
  if (token) {
    sessionStorage.setItem(key, token);
  }
};

const Main = () => {
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('Authorization'));
  const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem('RefreshToken'));

  useEffect(() => {
    const AuthorizationCode = new URL(window.location.href).searchParams.get('Authorization'); //url에서 AuthorizationCode를 가져옴
    const RefreshTokenCode = new URL(window.location.href).searchParams.get('RefreshToken');

    setToken('Authorization', AuthorizationCode);
    setToken('RefreshToken', RefreshTokenCode);
    setAccessToken(AuthorizationCode);
    setRefreshToken(RefreshTokenCode);
  }, [accessToken, refreshToken]);

  if (accessToken) {
    return (
      <MainContainer>
        <LoginNavbar key="first" />
        <Intro key="second" />
        <Vision key="third" />
        <PetLose key="fourth" />
        <Function key="fifth" />
        <Service1 key="six" />
        <Service2 key="seventh" />
        <Service3 key="eighth" />
        <Footer key="last" />
      </MainContainer>
    );
  } else {
    return (
      <MainContainer>
        <Navbar key="first" />
        <Intro key="second" />
        <Vision key="third" />
        <PetLose key="fourth" />
        <Function key="fifth" />
        <Service1 key="six" />
        <Service2 key="seventh" />
        <Service3 key="eighth" />
        <Footer key="last" />
      </MainContainer>
    );
  }
};

export default Main;
