import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import useTokenStore from "./store/token";

// 动态导入组件
const Pricecontrol = lazy(() => import("./widgets/page/Pricecontrol.tsx"));
const Setpassword = lazy(() => import("./widgets/page/Setpassword.tsx"));
const USTD = lazy(() => import("./widgets/page/USTD.tsx"));
const Systemlayout = lazy(() => import("./widgets/page/Systemlayout.tsx"));
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
        <Setpassword />
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
