import { useState } from "react";
import Afterlogging from "./widgets/Afterlogging";
import styled from "@emotion/styled";
import { usebegin } from "./store/contextmodel";
import request from "./api/request";
import { Button, Input } from "@nextui-org/react";
import { message } from "antd";
import useTokenStore from "./store/token";
const Element = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/loginback.svg");
  background-size: cover;
`;
function Login() {
  const [username, setusername] = useState(""); //账号
  const [password, setpassword] = useState(""); //密码
  const takestore: any = usebegin();
  const [messageApi, contextHolder] = message.useMessage();
  const changeToken = useTokenStore((state) => state.changeToken); //调用store
  const goLogin = () => {
    if (username == "" || password == "") {
      messageApi.warning("请输入账号密码");
      return;
    } else { //登录
      changeToken("登录成功");
      takestore.settoken("登录成功");
      messageApi.success("登录成功");
    }
  };
  return (
    <Element>
      {contextHolder}
      <section>
        <div className="flex justify-center items-center">
          <img src="/loginLogo.svg" alt="" />
          <p className="inputStyle ml-[25px] text-[31px] text-white  font-extrabold">
            胖虎一家亲管理端
          </p>
        </div>
        <Input
          value={username}
          onValueChange={setusername}
          className="mt-[36px] inputStyle text-white"
          isClearable
          color="danger"
          variant="bordered"
          radius="lg"
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
          radius="lg"
          placeholder="请输入密码"
          startContent={<img src="/mima.svg" alt="" />}
          onKeyDown={(e) => {
            if (e.nativeEvent.keyCode == 13) {
              goLogin();
            }
          }}
        />
        <Button
          className="mt-[56px] bg-[#2773F2]  w-[365px] h-[56px] text-white text-[24px] "
          onClick={goLogin}
        >
          登录
        </Button>
      </section>
    </Element>
  );
}
function App() {
  const takestore: any = usebegin();
  return (
    <>{!takestore.token ? <Login></Login> : <Afterlogging></Afterlogging>}</>
  );
}

export default App;
