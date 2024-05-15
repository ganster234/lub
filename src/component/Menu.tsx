import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import route from "../userouter";
import styled from "@emotion/styled";
import useTokenStore from "@/store/token";

const MyMenu = styled(Menu)`
  color: #949eb0;
  .ant-menu-item-selected {
    background-color: #f1f0ff !important;
    border-radius: 0px;
    color: #453bc8;
    border-left: 4px solid #695dff;
  }
  .ant-menu-item-active {
    border-radius: 0px;
    color: #7f7ac4 !important;
  }
`;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => ({
  key,
  icon,
  children,
  label,
  type,
});

const menuConfig = [
  {
    label: "未封装表格试列",
    key: "/",
    icon: "Pricecontrolicon",
  },
  {
    label: "封装表格试列",
    key: "/setpassword",
    icon: "setpasswd",
  },
  {
    label: "USTD订单",
    key: "/ustd",
    icon: "USTD",
  },
  {
    label: "系统配置",
    key: "/systemlayout",
    icon: "system",
    roles: ["管理员"],
  },
  {
    label: "我是文件",
    key: "/file",
    icon: "setpasswd",
    roles: ["普通号"],
    children: [
      {
        label: "跳转",
        key: "/4",
      },
      {
        label: "文件",
        key: "/sub3",
        children: [
          {
            label: "子菜单",
            key: "/cs",
          },
          {
            label: "子菜单2",
            key: "8",
          },
        ],
      },
    ],
  },
];

const PackingMu = (props: { coll: boolean }) => {
  const userInfo: any = useTokenStore.getState().userInfo;
  const [openKeys, setOpenKeys] = useState([window.location.pathname]);

  const generateMenuItems = (itemsConfig: any, openKeys: any) => {
    return itemsConfig
      .filter(
        (item: any) => !item.roles || item.roles.includes(userInfo.username)
      )
      .map((item: any) => {
        const iconPath =
          openKeys[0] === item.key ? `after${item.icon}` : item.icon;
        const children = item.children
          ? generateMenuItems(item.children, openKeys)
          : undefined;
        return getItem(
          item.label,
          item.key,
          <img
            className="w-[14px] h-[14px]"
            src={`/MenuIcon/${iconPath}.png`}
          />,
          children
        );
      });
  };

  const menuItems = generateMenuItems(menuConfig, openKeys);

  const handleMenuClick = (el: { key: string; keyPath: string[] }) => {
    setOpenKeys(el.keyPath);
    route.navigate(el.key);
  };

  return (
    <div>
      <div className="text-white text-md mb-2 border-b-1 border-white bg-[#8178ff] font-extrabold flex justify-center h-[64px] items-center">
        {!props.coll ? (
          <p className="font-black text-[17px]">系统框架</p>
        ) : (
          <div className="cube-box48">
            <div className="cube48">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>
      <MyMenu
        mode="inline"
        defaultSelectedKeys={openKeys}
        defaultOpenKeys={openKeys}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </div>
  );
};

export default PackingMu;
