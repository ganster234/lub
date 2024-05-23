import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { produce } from "immer";
import { message } from "antd";
import { usebegin } from "@/store/contextmodel";
import { Login, register } from "@/api/useApi";
import { Input } from "@nextui-org/react";
import { Button, Checkbox } from "@nextui-org/react";
import useTokenStore from "@/store/token";
import "./loginEnroll.css";
const Element = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  .codep {
    margin-top: 20px;
    p {
      margin-bottom: 10px;
      color: #646566;
    }
  }
  .LoginBox {
    .baidushowd {
      background-color: white;
      border-radius: 8px;
      box-sizing: border-box;
      padding: 25px;
      box-shadow: 0px 0px 20px 1px rgba(45, 140, 240, 0.3);
    }
    .chldbox {
      .linhgth {
        color: #323233;
      }
    }
  }
`;
export default function LoginRegistration() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); //监听页面宽度
  const changeToken = useTokenStore((state) => state.changeToken); //调用store
  const changeUser = useTokenStore((state) => state.changeUserInfo); //调用

  const [messageApi, contextHolder] = message.useMessage();
  const videoDOm: any = useRef(null);
  const takestore: any = usebegin();
  const [data, setdata] = useState({
    username: "", //账号
    password: "", //密码
    affirmpss: "", //确认密码
    type: "登录",
  });
  const handleResize = () => {
    //监听页面款度函数
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (takestore.disclosedBallot) {
      //记住账号密码
      setdata(
        produce((pre) => {
          pre.username = takestore.curtain; //账号
          pre.password = takestore.encipherment; //密码
        })
      );
    } else {
      setdata(
        produce((pre) => {
          pre.username = ""; //账号
          pre.password = ""; //密码
        })
      );
    }
    if (videoDOm.current) {
      videoDOm.current.play();
    }
    window.addEventListener("resize", handleResize); //监听页面宽度
    // 组件卸载时移除事件监听，以防内存泄漏
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const goLogin = () => {
    //登录完成
    if (data.type == "登录") {
      //登录
      if (data.username == "" || data.password == "") {
        messageApi.open({
          type: "warning",
          content: "请输入完整信息",
        });
      } else {
        changeUser({
          username: "管理员",
        });
        changeToken("545564");
        location.reload();
        if (takestore.disclosedBallot) {
          //记住密码
          takestore.setcurtain(data.username);
          takestore.setencipherment(data.password);
        }
        // Login({
        //   username: data.username,
        //   password: data.password,
        // }).then((res: any) => {
        //   // console.log(res);
        //   if (res.code == 200) {
        //     takestore.setuser(res.data);
        //     changeToken(res.data.data);
        //     message.success("登录成功");
        //     location.reload();
        //     if (takestore.disclosedBallot) {
        //       //记住密码
        //       takestore.setcurtain(data.username);
        //       takestore.setencipherment(data.password);
        //     }
        //   } else {
        //     message.warning(res.msg);
        //   }
        // });
      }
    } else {
      const regex = /^(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
      if (data.username == "" || data.password == "") {
        messageApi.open({
          type: "warning",
          content: "请输入注册账号或密码",
        });
      } else if (data.password !== data.affirmpss) {
        messageApi.open({
          type: "warning",
          content: "两次密码不一致",
        });
      } else if (!regex.test(data.affirmpss)) {
        message.warning("密码至少10位，且必须包含大小写字母");
      } else {
        register({
          username: data.username,
          password: data.password,
        }).then((res: any) => {
          // console.log(res);
          if (res.code == 200) {
            message.success("注册成功");
            switchover("登录");
          } else {
            message.warning(res.msg);
          }
        });
      }
    }
    // //登录
  };
  const switchover = (val: string) => {
    setdata(
      produce((pre) => {
        pre.type = val;
      })
    );
  };
  return (
    // className={windowWidth < 700 ? " bg-[#add3ff2c]" : ""}
    <Element className="background ">
      <>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
        <strong></strong>
      </>
      {contextHolder}
      <div
        className={
          "LoginBox flex justify-center min-w-[300px] z-50 " +
          (windowWidth < 700 ? "w-[100%]" : "w-[45%]")
        }
      >
        <div
          className={
            "chldbox  " +
            (windowWidth < 700
              ? "baidushowd w-[360px]"
              : "w-[470px] p-[30px] baidushowd")
          }
        >
          <h2 className="mb-[44px] text-[22px] font-bold flex justify-center text-[#092F65] ">
            {data.type == "登录" ? "账 号 登 录" : "创 建 账 号"}
          </h2>

          <div className="codep">
            <Input
              size="sm"
              value={data.username}
              placeholder={`请输入${data.type}账号`}
              onChange={(val: any) => {
                setdata(
                  produce((pre) => {
                    pre.username = val.target.value;
                  })
                );
              }}
            />
          </div>
          <div className="codep">
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <Input
                size="sm"
                type="password"
                autoComplete=""
                value={data.password}
                placeholder={`请输入${data.type}密码`}
                onChange={(val: any) => {
                  setdata(
                    produce((pre) => {
                      pre.password = val.target.value;
                    })
                  );
                }}
              />
            </form>
          </div>
          {data.type == "注册" ? (
            <>
              <div className="codep">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                  }}
                >
                  <Input
                    size="sm"
                    type="password"
                    autoComplete=""
                    value={data.affirmpss}
                    placeholder={`请再次输入${data.type}密码`}
                    onChange={(val: any) => {
                      setdata(
                        produce((pre) => {
                          pre.affirmpss = val.target.value;
                        })
                      );
                    }}
                  />
                </form>
              </div>
            </>
          ) : (
            <></>
          )}
          <br />
          <div className=" flex justify-between ">
            <Checkbox
              color={"primary"}
              isSelected={takestore.disclosedBallot}
              onValueChange={(val: boolean) => {
                takestore.setdisclosedBallot(val);
              }}
            >
              记住账户
            </Checkbox>
            <div className=" text-[12px] flex  items-center">
              {data.type == "登录" ? (
                <span className="text-foreground-500">没有账号</span>
              ) : (
                <></>
              )}
              <span
                className={"ml-2 cursor-pointer " + "text-[#695DFF] "}
                onClick={() => {
                  switchover(data.type == "登录" ? "注册" : "登录");
                  setdata(
                    produce((pre) => {
                      pre.username = ""; //账号
                      pre.password = ""; //密码
                      pre.affirmpss = ""; //确认密码
                    })
                  );
                }}
              >
                点此{data.type == "登录" ? "注册" : "登录"}
              </span>
            </div>
          </div>
          <Button
            className={
              "rounded-[5px] w-full text-[16px] h-[50px] mt-[70px] " +
              "bg-[#695DFF]"
            }
            color={"primary"}
            onClick={goLogin}
          >
            {data.type}
          </Button>
        </div>
      </div>
    </Element>
  );
}
