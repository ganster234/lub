import { useReducer, useEffect } from "react";
import { reducer, initialState } from "./state";
import { Tabs, Tab, Button } from "@nextui-org/react";
import Centraltheme from "./Centraltheme";
// import commonalityDate from "../../store/commonalityDate";

export default function OrderForm() {
  //充值中心
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    // 获取'type'参数的值
    const windUrlType = params.get("type");
    console.log(windUrlType);
    if (windUrlType == "full") {
      dispatch({ type: "settopup", topup: true });
    }
  }, []);
  return (
    <>
      {state.topup ? (
        <Centraltheme></Centraltheme>
      ) : (
        <div className=" w-full">
          <Tabs
            classNames={{
              tabList: "w-full p-0 border-b border-divider",
              cursor: `w-full h-[2.5px] ${"bg-[#695DFF]"}`,
              tab: "h-12",
              tabContent: "group-data-[selected=true]:text-[#485658]",
            }}
            variant="underlined"
            onSelectionChange={(el) => {
              console.log(el, "eeeeeeeee");
            }}
          >
            <Tab key="充值记录" title="充值记录"></Tab>
            <Tab key="U充值记录" title="U充值记录"></Tab>
          </Tabs>
          <Button
            onClick={() => {
              dispatch({ type: "settopup", topup: true });
            }}
          >
            充值
          </Button>
        </div>
      )}
    </>
  );
}
