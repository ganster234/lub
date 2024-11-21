import { useReducer, useEffect, useRef } from "react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
import { reducer, initialState } from "./state";
import { Tabs, Tab, Button } from "@nextui-org/react";
import { Input, DatePicker, Space } from "antd";
import Centraltheme from "./Centraltheme";
import TableView from "@/component/TableView";
import { usebegin } from "@/store/contextmodel";
import { oupryGet, oupryutGet } from "@/api/useApi";

import { Figuretable, refillcard } from "@/store/tableDate";

export default function OrderForm() {
  //充值中心
  const Logininformation = usebegin((state: any) => state.Logininformation);
  const { RangePicker } = DatePicker;
  const [state, dispatch] = useReducer(reducer, initialState);
  const TalbeRef = useRef<any>(null);
  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    // 获取'type'参数的值
    const windUrlType = params.get("type");
    if (windUrlType == "full") {
      dispatch({ type: "settopup", topup: true });
    }
  }, []);
  useEffect(() => {
    TalbeRef?.current?.queryList({
      Usersid: Logininformation.sid,
      Stime: dayjs().format("YYYY-MM-DD"),
      Etime: dayjs().format("YYYY-MM-DD"),
    });
  }, [state.dashtype]);
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
              dispatch({ type: "reset" });
              dispatch({ type: "setdashtype", dashtype: el });
            }}
          >
            <Tab key="充值记录" title="充值记录"></Tab>
            <Tab key="U充值记录" title="U充值记录"></Tab>
          </Tabs>

          <ul className="mt-[8px] flex items-end navDom">
            <li>
              <Input
                className="mt-[8px]  Aboutaccount"
                placeholder="账户查询"
                value={state.account}
                onChange={(val) =>
                  dispatch({ type: "setaccount", account: val.target.value })
                }
                allowClear
              ></Input>
            </li>
            <li className=" mx-[8px] ">
              <Space direction="vertical" size={10}>
                <RangePicker
                  allowClear={false}
                  value={[state.Stime, state.Etime]}
                  onChange={async (time: any) => {
                    if (time) {
                      dispatch({ type: "setEtime", Etime: time[1] });
                      dispatch({ type: "setStime", Stime: time[0] });
                    } else {
                      dispatch({
                        type: "setEtime",
                        Etime: dayjs(),
                      });
                      dispatch({
                        type: "setStime",
                        Stime: dayjs(),
                      });
                    }
                  }}
                />
              </Space>
            </li>
            <Button
              size="sm"
              color="primary"
              onClick={() => {
                TalbeRef?.current?.queryList({
                  Usersid: Logininformation.sid,
                  name: state.account,
                  Stime: dayjs(state.Stime).format("YYYY-MM-DD"),
                  Etime: dayjs(state.Etime).format("YYYY-MM-DD"),
                });
              }}
            >
              查询
            </Button>
            <Button
              className=" mx-2 "
              size="sm"
              onClick={() => {
                dispatch({ type: "reset" });
                TalbeRef?.current?.resetList();
              }}
            >
              重置
            </Button>
            <Button
              size="sm"
              color="danger"
              onClick={() => dispatch({ type: "settopup", topup: true })}
            >
              充值
            </Button>
          </ul>
          <TableView
            rowSelectionKey={false}
            bordered={true}
            xScroll={600}
            ref={TalbeRef}
            api={state.dashtype == "充值记录" ? oupryGet : oupryutGet}
            rowKey={"Device_Sid"}
            size={10}
            optionsPagintion={true}
            columns={state.dashtype == "充值记录" ? refillcard : Figuretable}
          />
        </div>
      )}
    </>
  );
}
