import Afterlogging from "./widgets/Afterlogging";
// import LoginEnroll from "./widgets/LoginEnroll";
// import LoginEnrolltow from "./widgets/LoginEnrolltow"; //第二个登录（山)
// import LoginEnrollthree from "./widgets/LoginEnrollthree"; //第三登录 （小圆点）
import LoginRegistration from "./widgets/LoginRegistration"; //登录四  左右图片

import useTokenStore from "./store/token";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd"; //配置国际化

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      {!useTokenStore.getState().token ? (
        <LoginRegistration></LoginRegistration>
      ) : (
        // <LoginEnroll></LoginEnroll>
        <Afterlogging></Afterlogging>
      )}
    </ConfigProvider>
  );
}

export default App;
