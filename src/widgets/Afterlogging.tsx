import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { RouterProvider } from "react-router-dom";
import { Layout, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;
import route from "../userouter";
import PackingMu from "@/component/Menu";
import { usebegin } from "../store/contextmodel";

const Afterlogging = () => {
  const takestore: any = usebegin();
  const [collapsed, setCollapsed] = useState(false);   //菜单关闭与展开
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  console.log(route);
  
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ background: "#15264D" }} trigger={null} collapsible collapsed={collapsed}>
        {/* 菜单 */}
        <PackingMu coll={collapsed}></PackingMu>
      </Sider>
      <Layout>
        <Header
          className=" w-full flex justify-between"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="mr-[34px] flex">
            <p className=" mr-5 ">你好，用户~~</p>
            <p onClick={(() => {
              takestore.settoken("");
              // takestore.setLogininformation("");
            })} className="cursor-pointer hover:text-[red]">
              <LogoutOutlined /> 退出
            </p>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <RouterProvider router={route} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Afterlogging;
