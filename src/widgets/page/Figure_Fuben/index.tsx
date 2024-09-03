import { useRef, useReducer } from "react";
import { moneyList } from "@/api/useApi";
import { Input } from "antd";
import TableView from "@/component/TableView";
import { Figuretable } from "@/store/tableDate";
import { Button } from "@nextui-org/button";
import { reducer, initialState } from "@/widgets/page/Figure/state";
export default function Together() {
  //金额列表
  const [state, dispatch] = useReducer(reducer, initialState);
  const TalbeRef: any = useRef(null); //表格dom
  const compile = (val: any) => {
    console.log("54_ww", val, "嗡嗡嗡");
  };
  return (
    <div>
      <div className=" flex  ">
        <Input
          className=" w-[200px] "
          placeholder="账户名称查询"
          value={state.account}
          onChange={(val) =>
            dispatch({ type: "setaccount", account: val.target.value })
          }
          allowClear
        ></Input>
        <Button
          className=" mx-2 "
          size="sm"
          color="primary"
          onClick={() => {
            TalbeRef?.current?.queryList({
              account: state.account,
            });
          }}
        >
          查询
        </Button>
        <Button
          size="sm"
          onClick={() => {
            TalbeRef?.current?.resetList();
            dispatch({ type: "reset" });
          }}
        >
          重置
        </Button>
      </div>
      <TableView
        xScroll={800}
        compile={compile}
        ref={TalbeRef}
        api={moneyList}
        rowKey={"id"}
        size={10}
        optionsPagintion={true}
        columns={[...Figuretable]}
      />
    </div>
  );
}
