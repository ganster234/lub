import { Input, message } from "antd";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { produce } from "immer";
import { userManagementUpdate, apiuserinfo } from "@/api/useApi";

import Modifyprompt from "@/component/Modifyprompt";
const MAXdiv = styled.div`
  margin: auto;
  max-width: 500px;
  margin-top: 2%;
  ul {
    li {
      display: flex;
      align-items: center;
      margin: 24px 0;
      p {
        width: 120px;
        display: flex;
        span {
          margin-right: 5px;
        }
      }
    }
  }
`;
export default function Setpassword() {
  //修改密码
  const [data, setdata] = useState({
    tkstatus: false, //弹框
    oldpassword: "", //旧密码
    password: "", //密码
    affirmpss: "", //确认密码
    Username: "", //用户名
    Tel: "", //电话
    Contact: "", //联系方式;
    Sid: "", //Sid
  });
  useEffect(() => {
    xuanran();
  }, []);

  useEffect(() => {
    if (data.tkstatus) {
      setTimeout(() => {
        setdata(
          produce((pre) => {
            pre.tkstatus = false;
          })
        );
      }, 3000);
    }
  }, [data.tkstatus]);
  const xuanran = () => {
    apiuserinfo().then((res: any) => {
      if (res.code == 200) {
        setdata(
          produce((pre) => {
            pre.Username = res.data[0]?.Device_name;
            pre.Tel = res.data[0]?.Device_tel;
            pre.Contact = res.data[0]?.Device_contact;
            pre.Sid = res.data[0]?.Device_Sid;
          })
        );
      }
    });
  };
  const setPwd = () => {
    console.log(data);
    userManagementUpdate({
      Sid: data.Sid, //sid活动
      Username: data.Username, //昵称
      Tel: data.Tel, //电话
      Contact: data.Contact, //联系方式
      Oldpass: data.oldpassword,
      Pass: data.affirmpss,
    }).then((res: any) => {
      console.log(res);
      if (res.code == 200) {
        setdata(
          produce((pre) => {
            pre.tkstatus = true;
            pre.oldpassword = ""; //旧密码
            pre.password = ""; //密码
            pre.affirmpss = ""; //确认密码
          })
        );
      } else {
        message.warning(res.msg);
      }
    });
  };
  return (
    <>
      {data.tkstatus ? (
        <Modifyprompt advicesP={"修改成功!"}></Modifyprompt>
      ) : (
        <MAXdiv>
          <p className="text-center text-[20px] ">个人信息</p>
          <ul>
            <li>
              <p>用户名：</p>
              <Input
                value={data.Username}
                onChange={(val: any) => {
                  setdata(
                    produce((pre) => {
                      pre.Username = val.target.value;
                    })
                  );
                }}
                className="rounded-sm"
                size="large"
                placeholder="请输入内容"
              />
            </li>
            <li>
              <p>联系方式：</p>
              <Input
                value={data.Contact}
                onChange={(val: any) => {
                  setdata(
                    produce((pre) => {
                      pre.Contact = val.target.value;
                    })
                  );
                }}
                className="rounded-sm"
                size="large"
                placeholder="请输入内容"
              />
            </li>
            <li>
              <p>电话：</p>
              <Input
                value={data.Tel}
                onChange={(val: any) => {
                  setdata(
                    produce((pre) => {
                      pre.Tel = val.target.value;
                    })
                  );
                }}
                className="rounded-sm"
                size="large"
                placeholder="请输入内容"
              />
            </li>
            <li>
              <p>旧密码：</p>
              <Input.Password
                value={data.oldpassword}
                onChange={(val: any) => {
                  setdata(
                    produce((pre) => {
                      pre.oldpassword = val.target.value;
                    })
                  );
                }}
                className="rounded-sm"
                size="large"
                placeholder="请输入原始密码"
              />
            </li>

            <li>
              <p>新密码：</p>
              <Input.Password
                value={data.affirmpss}
                onChange={(val: any) => {
                  setdata(
                    produce((pre) => {
                      pre.affirmpss = val.target.value;
                    })
                  );
                }}
                className="rounded-sm"
                size="large"
                placeholder="请重复在输入一次"
              />
            </li>
          </ul>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setPwd();
              }}
              className={
                " rounded-[5px] mb-[50px] mt-[84px] font-semibold w-[362px] h-[48px] text-white bg-[#6A5DFE] "
              }
            >
              确认提交
            </Button>
          </div>
        </MAXdiv>
      )}
    </>
  );
}
