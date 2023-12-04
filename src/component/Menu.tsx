import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import route from "../userouter";
import styled from "@emotion/styled";
const MyMenu = styled(Menu)`
  background-color: #15264d;
  color: #949eb0;
  .ant-menu-item-selected {
    background-color: white !important;
  }
  .ant-menu-item-active {
    color: #1677ff !important;
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

  const [openKeys, setOpenKeys] = useState([window.location.pathname]);
  const items: MenuItem[] = [
    getItem("用户价格管理", "/", <img className="w-[14px] h-[14px]" src={openKeys[0] == "/" ? "/MenuIcon/Pricecontrolicon.png" : "/MenuIcon/afterPricecontrolicon.png"} />),
    getItem("修改密码", "/setpassword", <img className="w-[14px] h-[14px]" src={openKeys[0] == "/setpassword" ? "/MenuIcon/aftersetpasswd.png" : "/MenuIcon/setpasswd.png"} />),
    getItem("USTD订单", "/ustd", <img className="w-[14px] h-[14px]" src={openKeys[0] == "/ustd" ? "/MenuIcon/afterUSTD.png" : "/MenuIcon/USTD.png"} />),
    getItem("系统配置", "/systemlayout", <img className="w-[14px] h-[14px]" src={openKeys[0] == "/systemlayout" ? "/MenuIcon/aftersystem.png" : "/MenuIcon/system.png"} />),
    //   getItem("我是文件", "6", <AppstoreOutlined />, [
    //     getItem("跳转", "4"),
    //     getItem("文件", "sub3", null, [
    //       getItem("子菜单", "/cs"),
    //       getItem("子菜单2", "8"),
    //     ]),
    //   ]),
  ];

  return (
    <div>
      <div className="text-white text-md mb-2 border-b-1 border-white  font-extrabold flex justify-center h-[64px] items-center ">
        <img className=" w-[20px] h-[20px] " src="/loginLogo.svg" alt="" />
        {!props.coll ? <p className="ml-3">胖虎一家亲</p> : <></>}
      </div>
      <MyMenu
        mode="inline"
        theme="dark"
        openKeys={openKeys}
        selectedKeys={openKeys}
        // onOpenChange={onOpenChange}
        items={items}
        onClick={(el) => {
          setOpenKeys(el.keyPath);
          route.navigate(el.key);
        }}
      />
    </div>
  );
};

export default PackingMu;
