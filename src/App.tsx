import { useState, useEffect } from 'react'
import Afterlogging from './widgets/Afterlogging'
import styled from "@emotion/styled";
import { usebegin } from "./store/contextmodel";
import request from './api/request'
const Element = styled.div`
  color: red;
`
function Login() {
  const takestore: any = usebegin()
  const goLogin = () => {  //登录
    request(
      "POST",
      "/user/login",
      {
        source: "18048429819",
        sourceType: "phone",
        password: "123456",
      },
      "json",
      "json"
    ).then((res: any) => {
      if (res) {
        takestore.settoken(res.token)
      }
    }).catch((err) => {
      console.log(err, '登录');
    });
  }
  return (
    <Element>
      <p onClick={goLogin}>登录~</p>
    </Element>
  )
}
function App() {
  const takestore: any = usebegin()
  return (
    <>
      {
        !takestore.token ? <Login></Login> : <Afterlogging></Afterlogging>
      }
    </>
  )
}

export default App
