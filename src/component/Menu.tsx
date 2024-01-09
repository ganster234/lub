import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import route from "../userouter";
import styled from "@emotion/styled";
// import useTokenStore from "@/store/token";
const MyMenu = styled(Menu)`
  /* background-color: #15264d; */
  color: #949eb0;
  .ant-menu-item-selected {
    //点击后样式
    background-color: #f1f0ff !important;
    border-radius: 0px;
    color: #453bc8;
    border-left: 4px solid #695dff;
  }
  .ant-menu-item-active {
    //鼠标移入后字体颜色
    border-radius: 0px;
    color: #7f7ac4 !important;
  }
`;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const PackingMu = (props: { coll: boolean }) => {
  // console.log(useTokenStore.getState().userInfo, ""); //拿到用户信息是否是管理员判断动态路由
  const [openKeys, setOpenKeys] = useState([window.location.pathname]);
  const items: any = [
    getItem(
      "用户价格管理",
      "/",
      <img
        className="w-[14px] h-[14px]"
        src={
          openKeys[0] == "/"
            ? "/MenuIcon/Pricecontrolicon.png"
            : "/MenuIcon/afterPricecontrolicon.png"
        }
      />
    ),
    getItem(
      "修改密码",
      "/setpassword",
      <img
        className="w-[14px] h-[14px]"
        src={
          openKeys[0] == "/setpassword"
            ? "/MenuIcon/aftersetpasswd.png"
            : "/MenuIcon/setpasswd.png"
        }
      />
    ),
    getItem(
      "USTD订单",
      "/ustd",
      <img
        className="w-[14px] h-[14px]"
        src={
          openKeys[0] == "/ustd"
            ? "/MenuIcon/afterUSTD.png"
            : "/MenuIcon/USTD.png"
        }
      />
    ),
    // 配置动态路由还可以通过状态机是否管理员判断
    true
      ? getItem(
          "系统配置",
          "/systemlayout",
          <img
            className="w-[14px] h-[14px]"
            src={
              openKeys[0] == "/systemlayout"
                ? "/MenuIcon/aftersystem.png"
                : "/MenuIcon/system.png"
            }
          />
        )
      : "",
    getItem(
      "我是文件",
      "",
      <img className="w-[14px] h-[14px]" src="/MenuIcon/setpasswd.png" />,
      [
        getItem("跳转", "/4"),
        getItem("文件", "/sub3", null, [
          getItem("子菜单", "/cs"),
          getItem("子菜单2", "8"),
        ]),
      ]
    ),
  ];
  const user: any = [
    getItem(
      "用户价格管理",
      "/",
      <img
        className="w-[14px] h-[14px]"
        src={
          openKeys[0] == "/"
            ? "/MenuIcon/Pricecontrolicon.png"
            : "/MenuIcon/afterPricecontrolicon.png"
        }
      />
    ),
  ];

  return (
    <div>
      <div className="text-white text-md mb-2 border-b-1 border-white bg-[#8178ff]  font-extrabold flex justify-center h-[64px] items-center ">
        {!props.coll ? (
          <p className=" font-black text-[17px] ">新五样系统</p>
        ) : (
          <img className=" w-[20px] h-[20px] " src="/loginLogo.svg" alt="" />
        )}
      </div>
      <MyMenu
        mode="inline"
        defaultSelectedKeys={openKeys}
        defaultOpenKeys={openKeys}
        items={true ? items : user} //还可以通过此方法判断动态菜单
        onClick={(el) => {
          setOpenKeys(el.keyPath);
          route.navigate(el.key);
        }}
      />
    </div>
  );
};

export default PackingMu;
