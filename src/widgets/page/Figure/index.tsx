import { useRef, useReducer } from "react";
import { moneyList } from "@/api/useApi";
import { Input } from "antd";
import TableView from "@/component/TableView";
import { Figuretable } from "@/store/tableDate";
import { Button } from "@nextui-org/button";
import { reducer, initialState } from "@/widgets/page/Figure/state";
import Modaltow from "@/component/Modaltow";
import { debounce, throttle } from "@/store/utile";
export default function Together() {
  //列子
  const [state, dispatch] = useReducer(reducer, initialState);
  const TalbeRef: any = useRef(null); //表格dom
  const refDom = useRef<{ popupstate?: (state: boolean) => void }>(null);
  const affirm = () => {
    //确定按钮点击函数
    console.log(545);
  };
  const compile = (val: any) => {
    console.log("54_ww", val, "嗡嗡嗡");
  };
  return (
    <div>
      <Modaltow
        configuration={{
          isDismissable: true, //是否点击遮罩层关闭弹窗
          radius: "md", //圆角
          placement: "center", //弹窗打开位置
          size: "lg", //弹窗大小
          backdrop: "opaque", //遮罩背景
          hideCloseButton: false, //是否隐藏关闭按钮
          Header: "标题",
          footrBut: "确认按钮",
        }}
        affirm={affirm} //确定按钮点击函数
        ref={refDom}
      >
        <div>弹窗内容</div>
      </Modaltow>
      <div className="flex">
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
        <Button
          onClick={debounce(() => {
            console.log("Window scrolled");
          }, 1000)}
        >
          防抖
        </Button>
        <Button
          onClick={throttle(() => {
            console.log("节流");
          }, 1000)}
        >
          节流
        </Button>
        <Button
          onClick={() => {
            if (refDom.current && refDom.current.popupstate) {
              refDom.current.popupstate(true);
            }
          }}
        >
          打开弹窗
        </Button>
      </div>
      <TableView
        xScroll={800}
        compile={compile}
        ref={TalbeRef}
        api={moneyList}
        rowKey={"id"}
        size={10}
        rowSelectionKey={true}
        optionsPagintion={true}
        columns={[...Figuretable]}
      />
    </div>
  );
}
