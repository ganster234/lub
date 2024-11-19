import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import useTokenStore from "./store/token";

// 动态导入组件
const Pricecontrol = lazy(() => import("./widgets/page/Pricecontrol.tsx"));
const Figure = lazy(() => import("./widgets/page/Figure")); //封装表格试列
const USTD = lazy(() => import("./widgets/page/Ustd/index.tsx"));   //资金管理
const Systemlayout = lazy(() => import("./widgets/page/Systemlayout.tsx"));
const FundManagement = lazy(() => import("./pages/FundManagement/FundManagement"));
const OrderManagement = lazy(() => import("./pages/OrderManagement/OrderManagement.tsx"));
const UserManagement = lazy(() => import("./pages/UserManagement/UserManagement.tsx"));
const NotFound = lazy(() => import("./widgets/page/NotFound.tsx")); // 404 页面

// 获取用户信息
const userInfo: any = useTokenStore.getState().userInfo;

// 路由配置
const routeConfig = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <Pricecontrol />
      </Suspense>
    ),
  },
  {
    path: "/setpassword",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <Figure />
      </Suspense>
    ),
  },
  {
    path: "/ustd",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <USTD />
      </Suspense>
    ),
  },
  {
    path: "/systemlayout",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <Systemlayout />
      </Suspense>
    ),
    roles: ["管理员"], // 指定该路由的角色
  },
  {
    path: "/order-management",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <OrderManagement />
      </Suspense>
    ),
  },
  {
    path: "/fund-management",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <FundManagement />
      </Suspense>
    ),
  },
  {
    path: "/user-management",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <UserManagement />
      </Suspense>
    ),
  },
  {
    path: "*", // 匹配所有未定义的路径
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
];

// 根据用户角色过滤路由
const filteredRoutes = routeConfig.filter((route) => {
  if (!route.roles) return true;
  return route.roles.includes(userInfo.username);
});

// 创建路由
const route = createBrowserRouter(filteredRoutes);

export default route;
