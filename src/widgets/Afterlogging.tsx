import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Layout, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  DownOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
const { Header, Sider, Content } = Layout;
import route from "../userouter";
import PackingMu from "@/component/Menu";
import { goFullScreen, exitFullScreen, useWindowWidth } from "@/store/utile";
import Leftsidepopup from "@/component/Leftsidepopup";
import { apiuserinfo } from "@/api/useApi";
const Afterlogging = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const windowWidth = useWindowWidth(); //监听页面宽度
  const [collapsed, setCollapsed] = useState(false); //菜单关闭与展开
  const [amplification, setamplification] = useState(false); //是否放大页面
  const [information, setinformation] = useState<any>({}); //用户信息
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    apiuserinfo().then((res: any) => {
      if (res.code == 200) {
        setinformation(res.data[0]);
      }
    });
  }, []);
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
            className={windowWidth > 600 ? "mt-4 px-[16px]" : "mt-2 px-[8px]"}
            style={{
              background: "#f5f5f5",
              height: 48,
            }}
          >
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
              }}
              className="w-full h-[48px] flex bg-white items-center justify-between"
            >
              {windowWidth > 600 ? (
                <Button
                  onClick={() => setCollapsed(!collapsed)}
                  className=" bg-transparent w-[64px] h-[50px] text-[18px]"
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

              <div className="mr-[10px] flex items-center">
                <p className="text-[#25235C] text-[15px]">
                  余额：
                  <span className="  text-[red] ">
                    {information?.Device_money}元
                  </span>
                </p>
                <div className="w-3 h-full mx-2 bg-[#f5f5f5] text-[#f5f5f5]  ">
                  o
                </div>
                <a
                  href="/ustd?type=full"
                  className=" cursor-pointer text-[#28265e]  font-extrabold text-[16px]"
                >
                  充
                </a>
                {windowWidth > 600 && (
                  <>
                    <div className="w-3 h-full mx-2 bg-[#f5f5f5] text-[#f5f5f5]  ">
                      o
                    </div>
                    <p className="text-[20px] cursor-pointer ">
                      {amplification ? (
                        <FullscreenExitOutlined
                          onClick={() => bigandSmle("缩小")}
                        />
                      ) : (
                        <FullscreenOutlined
                          onClick={() => bigandSmle("放大")}
                        />
                      )}
                    </p>
                  </>
                )}

                <div className="w-3 h-full mx-2 bg-[#f5f5f5] text-[#f5f5f5]  ">
                  o
                </div>
                <Popover placement="bottom">
                  <PopoverTrigger>
                    <Button className="  bg-transparent  p-0 flex h-[50px]">
                      <img src="/heardeImg.png" alt="" />
                      {windowWidth > 600 && <p>{information?.Device_name}</p>}
                      <DownOutlined />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className=" rounded-md ">
                    <div className="px-1 py-1">
                      <p
                        onClick={() => {
                          //退出登录
                          route.navigate("/");
                          localStorage.removeItem("token");
                          location.reload();
                        }}
                        className="logOff h-[20px] cursor-pointer hover:text-[red]"
                      >
                        <LogoutOutlined /> 退出登录
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
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
