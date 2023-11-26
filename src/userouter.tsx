import { lazy, Suspense } from 'react'

import { createBrowserRouter } from "react-router-dom";
// 配置路由
const Homeno1 = lazy(() => import("./widgets/page/Homeno1.tsx"));
const Cs = lazy(() => import("./widgets/page/Cs.tsx"))

const route = createBrowserRouter([
    {
        path: "/", //如果当前组件未加载出来就显示以下div ⌛加载中...
        element: (
            <Suspense fallback={<div>⌛加载中...</div>}>
                <Homeno1></Homeno1>
            </Suspense>
        ),
    },
    {
        path: "/cs", //如果当前组件未加载出来就显示以下div ⌛加载中...
        element: (
            <Suspense fallback={<div>⌛加载中...</div>}>
                <Cs></Cs>
            </Suspense>
        ),
    },
])
export default route