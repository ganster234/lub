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
export default function Login() {  //1号登录只有登录无注册
  const [username, setusername] = useState(""); //账号
  const [password, setpassword] = useState(""); //密码

  const changeToken = useTokenStore((state) => state.changeToken); //调用store
  const changeUser = useTokenStore((state) => state.changeUserInfo); //调用
  const goLogin = () => {
    if (username == "" || password == "") {
      message.warning("请输入账号密码");
    } else {
      //登录
      if (username == "1") {
        changeUser({
          username: "管理员",
        });
      } else {
        changeUser({
          username: "普通号",
        });
      }

      changeToken(
        "keXxC4NSN0+WoP77Mfr37nlb5JZfgCPr4zrEXkpiByZPwOHBBfSp/zwPIlRn/5CDAhH8paKOr9hR/kcfw3zLR5H8oGoF6VL2fPZDfMrDvC8EPQTGysCCnlM8uqABznluDs8cw9+wYR1LINSfsKAopiMSQh9SWIB6jgdI521oFNv2O4/Nvuug+0zn9M8cpMg79fOAapdEdLRYde/CPJ0lNV+mRreoAgqCyUNCgGly/bMzq11Gvpr6HULdYrqIesaH+PEsJ2MP+9o5gaCyA5KnsJMbCHV5+jvYlao2B2XHrTmj5pa9dUqUl6lQocq3Nh6T20KLUWbUWBBc8sKZAs9SyENfoa3A/i2LmLMn8LRm/pjLMZf2K03Cr3SSBUNdjpQ6laWt7LCmr7v7sk6rcP5iQz7uVAVdTmS+XZH45H+hHGwdEe0wAKgnY/ptbyK+scd2aF12gPOStrOBOkHFmGhQA33XnE3OdLrP6PFI7e1Et+CqKB1KEFVYf+0jI7tsLkYaDUHUaBhJdOaVWT2wwvnoSQz7rGxYVZR2v6dq7qaQmQYyJbphF5UyCRw5RjIXB6fedQCcq0j+97Qc6DpWMNejHw=="
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
            后台框架
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
