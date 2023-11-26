import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import route from '../userouter';
// import 
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('我是选项', '/', <AppstoreOutlined />),
    getItem('我是文件', '6', <AppstoreOutlined />, [
        getItem('跳转', '4'),
        getItem('文件', 'sub3', null, [getItem('子菜单', '/cs'), getItem('子菜单2', '8')]),
    ]),
];

// submenu keys of first level
const rootSubmenuKeys:any = [];

const PackingMu = () => {
    const [openKeys, setOpenKeys] = useState(['']);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <Menu
            mode="inline"
            theme="dark"
            openKeys={openKeys}
            selectedKeys={["/"]}
            onOpenChange={onOpenChange}
            items={items}
            onClick={((el)=>{
                route.navigate(el.key)
            })}
        />
    );
};

export default PackingMu;