import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
// 配置路由
const Pricecontrol = lazy(() => import("./widgets/page/Pricecontrol.tsx")); //价格管理
const Setpassword = lazy(() => import("./widgets/page/Setpassword.tsx")); //修改密码
const USTD = lazy(() => import("./widgets/page/USTD.tsx")); //USTD订单
const Systemlayout = lazy(() => import("./widgets/page/Systemlayout.tsx")); //系统配置

const routeleaking = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <Pricecontrol></Pricecontrol>
      </Suspense>
    ),
  },
  {
    path: "/setpassword",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <Setpassword></Setpassword>
      </Suspense>
    ),
  },
  {
    path: "/ustd",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <USTD></USTD>
      </Suspense>
    ),
  },
  {
    path: "/systemlayout",
    element: (
      <Suspense fallback={<div>⌛加载中...</div>}>
        <Systemlayout></Systemlayout>
      </Suspense>
    ),
  },
];

const route = createBrowserRouter(routeleaking);
export default route;
