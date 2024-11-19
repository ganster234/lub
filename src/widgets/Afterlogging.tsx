import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { Layout, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Button } from "@nextui-org/react";
const { Header, Sider, Content } = Layout;
import route from "../userouter";
import PackingMu from "@/component/Menu";
import { goFullScreen, exitFullScreen, useWindowWidth } from "@/store/utile";
import Leftsidepopup from "@/component/Leftsidepopup";
const Afterlogging = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const windowWidth = useWindowWidth(); //监听页面宽度
  const [collapsed, setCollapsed] = useState(false); //菜单关闭与展开
  const [amplification, setamplification] = useState(false); //是否放大页面
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const bigandSmle = (val: string) => {
    if (val === "放大") {
      setamplification(true);
      goFullScreen();
    } else {
      setamplification(false);
      exitFullScreen();
    }
  };
  //关闭与打开弹窗
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  return (
    <>
      <Leftsidepopup isOpen={isDialogOpen} onClose={closeDialog}>
        <div className=" h-[100vh] bg-[#5c7fff]">
          <PackingMu coll={collapsed}></PackingMu>
        </div>
      </Leftsidepopup>

      <Layout style={{ minHeight: "100vh" }}>
        {windowWidth > 600 ? (
          <Sider
            style={{ background: "#5C7FFF" }}
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
            className={windowWidth > 600 ? " mt-4 px-[16px]" : "px-[8px]"}
            style={{ background: "#f5f5f5" }}
          >
            <div className="w-full flex bg-white items-center justify-between">
              {windowWidth > 600 ? (
                <Button
                  onClick={() => setCollapsed(!collapsed)}
                  className=" bg-transparent w-[64px] h-[64px] text-[18px]"
                >
                  {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
              ) : (
                <Button
                  onClick={openDialog}
                  className=" bg-transparent  text-[20px]"
                >
                  <MenuFoldOutlined />
                </Button>
              )}

              <div className="mr-[34px] flex items-center">
                <p className="text-[20px] cursor-pointer ">
                  {amplification ? (
                    <FullscreenExitOutlined
                      onClick={() => bigandSmle("缩小")}
                    />
                  ) : (
                    <FullscreenOutlined onClick={() => bigandSmle("放大")} />
                  )}
                </p>
                <Button className=" flex ">
                  <img src="/heardeImg.png" alt="" />
                  你好，用户
                  <DownOutlined />
                </Button>
                {/* <p
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
                </p> */}
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: windowWidth > 600 ? "20px 16px" : "8px",
              padding: windowWidth > 600 ? 20 : 8,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <RouterProvider router={route} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Afterlogging;
