import { useState } from "react";
import styled from "@emotion/styled";
import useTokenStore from "@/store/token";
import { Button, Input } from "@nextui-org/react";
import { message } from "antd";
const Element = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/loginback.jpg");
  background-size: cover;
`;
export default function Login() {
  const [username, setusername] = useState(""); //账号
  const [password, setpassword] = useState(""); //密码

  const changeToken = useTokenStore((state) => state.changeToken); //调用store
  const changeUser = useTokenStore((state) => state.changeUserInfo); //调用
  const goLogin = () => {
    if (username == "" || password == "") {
      message.warning("请输入账号密码");
    } else {
      //登录
      changeUser({
        username: "管理员",
      });
      changeToken(
        "keXxC4NSN0+WoP77Mfr37muDpVexh1WjIgjhAwCe5gzuaSFXtvZeSns2paM12U//K6TcRH46sW4h2ONum3vVFOVReHGuVRhYExQoLHmm7E+1d6OvOtN14e8XB2K0MUDLJ2ymL0+9jQrHb/h9jaIqjfU6BN2kUsV/nSyQW9N9nBfrsXtZauTq/UYEvurhyT+T1lmXE9rzQwCuTXGdEVUXwplQr/rZNEHR/3/LQxzYcBGHxuBjuM9CJe0yafKkw/wwFYOMGPhSd8FtPaR1ZgTcHxOrk5bkFKcjCd88cj3Oh8rZmIdlQytJdk5y1ReI+ZKzYb9uwSfhwwUP+Juek/DOEHB8fwoq0pdxPCOTuEgn08rgR9MLFxaLutsEKr0eQSepQV1T1V7YnAUmCu3ENbd88DOQ5ts4mhZrrmWAXhuKe1zVftxRhAk0BjQtcJn1EKOuMZIfBIkraGCETfpVlm0CAQRdzYAU1P/O8IHlqjmQ4RcP4vKbm1Bw6GUMrqU4NA5an8HxDzuYYz8i+tGsOtj4+qsEe1cKLGBzbJrafP2uk57l41qrsukftc5uHEqIkTiB"
      );
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
