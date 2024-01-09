import { useState } from "react";
import Afterlogging from "./widgets/Afterlogging";
import styled from "@emotion/styled";
import request from "./api/request";
import { Button, Input } from "@nextui-org/react";
import { message } from "antd";
import useTokenStore from "./store/token";

import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd"; //配置国际化
const Element = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/loginback.jpg");
  background-size: cover;
`;
function Login() {
  const [username, setusername] = useState(""); //账号
  const [password, setpassword] = useState(""); //密码

  const changeToken = useTokenStore((state) => state.changeToken); //调用store
  const changeUser = useTokenStore((state) => state.changeUserInfo); //调用上午
  const goLogin = () => {
    if (username == "" || password == "") {
      message.warning("请输入账号密码");
    } else {
      //登录
      changeUser({
        username: "管理员",
      });
      changeToken("token");
      message.success("登录成功");
      location.reload();
    }
  };
  return (
    <Element>
      <section>
        <div className="flex justify-center items-center">
          <img src="/loginLogo.svg" alt="" />
          <p className="inputStyle ml-[20px] text-[31px] text-white  font-extrabold">
            QQ后台管理系统
          </p>
        </div>
        <Input
          value={username}
          onValueChange={setusername}
          className="mt-[36px] inputStyle text-white"
          isClearable
          color="danger"
          variant="bordered"
          radius="sm"
          placeholder="请输入账号"
          startContent={<img src="/zhanghao.svg" alt="" />}
        />
        <Input
          value={password}
          onValueChange={setpassword}
          type="password"
          className=" mt-[30px] inputStyle text-white"
          color="danger"
          variant="bordered"
          radius="sm"
          placeholder="请输入密码"
          startContent={<img src="/mima.svg" alt="" />}
          onKeyDown={(e) => {
            if (e.nativeEvent.keyCode == 13) {
              goLogin();
            }
          }}
        />
        <Button
          className="mt-[56px] bg-[#2773F2]  w-[365px] h-[46px] text-white text-[20px] "
          onClick={goLogin}
        >
          登录
        </Button>
      </section>
    </Element>
  );
}
function App() {
  return (
    <ConfigProvider locale={zhCN}>
      {!useTokenStore.getState().token ? (
        <Login></Login>
      ) : (
        <Afterlogging></Afterlogging>
      )}
    </ConfigProvider>
  );
}

export default App;
