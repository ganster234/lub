import { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { RouterProvider } from "react-router-dom"
import { Layout, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import route from '../userouter';
import PackingMu from '../component/Menu'
import styled from "@emotion/styled";
const MyLayout = styled(Layout)`
    background-color: red !important;
`

const Afterlogging = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight:"100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <PackingMu></PackingMu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                {/* <p style={{ mt }}>w54</p> */}
                <Content
                    style={{
                        margin: '24px 16px',
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