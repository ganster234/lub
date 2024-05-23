import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Layout, theme, Popover } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button } from "@nextui-org/react";
import { menus_List } from "@/store/tableDate";
const { Header, Sider, Content } = Layout;
import route from "../userouter";
import PackingMu from "@/component/Menu";

const Afterlogging = () => {
  const [routeUrl, setrouteUrl] = useState(""); //路由信息(手机端点击搞亮)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); //监听页面宽度（做适配）
  const [collapsed, setCollapsed] = useState(false); //菜单关闭与展开
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleResize = () => {
    //监听页面款度函数
    setWindowWidth(window.innerWidth);
    if (window.innerWidth < 800) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize); //监听页面宽度
    // 组件卸载时移除事件监听，以防内存泄漏
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {windowWidth > 600 ? (
        <Sider
          style={{ background: "#FFFFFF" }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <PackingMu coll={collapsed}></PackingMu>
        </Sider>
      ) : (
        <></>
      )}
      <Layout>
        <Header
          className=" w-full flex items-center justify-between"
          style={{ padding: 0, background: colorBgContainer }}
        >
          {windowWidth > 600 ? (
            <Button
              onClick={() => setCollapsed(!collapsed)}
              className=" bg-transparent w-[64px] h-[64px] text-[18px]"
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          ) : (
            <Popover
              trigger="click"
              content={
                <ul>
                  {menus_List.map((item, index) => (
                    <li
                      className="my-2 flex justify-center items-center"
                      key={index}
                    >
                      <Button
                        style={{
                          padding: "8px 12px",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        className={
                          item.key == routeUrl
                            ? "bg-[#9dbffa6b] transition-all"
                            : "bg-transparent transition-all"
                        }
                        onClick={() => {
                          setrouteUrl(item.key);
                          route.navigate(item.key);
                        }}
                      >
                        {item.label}
                      </Button>
                    </li>
                  ))}
                </ul>
              }
            >
              <Button className=" bg-transparent  text-[20px]">
                <MenuFoldOutlined />
              </Button>
            </Popover>
          )}

          <div className="mr-[34px] flex">
            <p className=" mr-5 ">你好，用户~~</p>
            <p
              onClick={() => {
                //退出登录
                route.navigate("/");
                // localStorage.clear();
                localStorage.removeItem("token");
                location.reload();
              }}
              className="logOff cursor-pointer hover:text-[red]"
            >
              <LogoutOutlined /> 退出
            </p>
          </div>
        </Header>
        <Content
          style={{
            margin: windowWidth > 600 ? "24px 16px" : "8px",
            padding: windowWidth > 600 ? 24 : 8,
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
