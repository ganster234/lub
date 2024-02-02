import Afterlogging from "./widgets/Afterlogging";
import LoginEnroll from "./widgets/LoginEnroll";
import useTokenStore from "./store/token";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd"; //配置国际化

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      {!useTokenStore.getState().token ? (
        <LoginEnroll></LoginEnroll>
      ) : (
        <Afterlogging></Afterlogging>
      )}
    </ConfigProvider>
  );
}

export default App;
