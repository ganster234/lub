import { useRef, useState, useEffect } from "react";
import { produce } from "immer";
import { payColumns } from "@/store/tableDate";
import MaterialModal from "@/component/Modal";
import { Button, Input } from "@nextui-org/react";
import Pagination from "@/component/Pagination";

import { Table } from "antd";
import { GetUserInfo } from "@/api/useApi";
export default function Pricecontrol() {
  const pageRef: any = useRef(null); //分页dom
  const [Tabledata, setTabledata] = useState([]); //表格数据
  const [page, setPage] = useState({
    current: 1, //当前页码
    pageSize: 10, // 每页数据条数
  }); //页数
  const [total, setTotal] = useState(0); //总条数
  const [seek, setseek] = useState(""); //搜索
  const [loading, setloading] = useState(false); //表格loading
  useEffect(() => {
    setloading(true);
    // console.log(page, "页数");
    getLIst();
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const getLIst = () => {
    GetUserInfo({ page: page.current, limit: page.pageSize, account: seek })
      .then((res: any) => {
        if (res.code == 200) {
          setloading(false);
          setTabledata(res.data.data);
          setTotal(res.data.total);
        }
      })
      .catch((err) => {
        console.log(err, "获取失败");
      });
  };
  const xuanran = () => {
    if (page.current === 1) {
      getLIst();
    } else {
      setPage(
        produce(page, (draft) => {
          draft.current = 1;
        })
      );
    }
  };
  const clickOK = (onClose: any) => {
    //弹框点击确定事件
    //onClose子组件弹窗传来数据
    setTimeout(() => {
      //发送请求后关闭弹窗
      onClose();
    }, 1000);
  };
  const toEnterpage = (val: any) => {
    //子组件点击页
    console.log(val, "子zzzzz我i");
    setPage(val); //赋值页码
  };
  return (
    <div>
      <Input
        value={seek}
        variant="underlined"
        onChange={(val) => {
          setseek(val.target.value);
        }}
        onBlur={() => {
          setloading(true);
          xuanran();
        }}
      ></Input>
      <MaterialModal //使用封装弹框
        configuration={{
          Header: "模态框标题",
          footrBut: "修改", //底部按钮
          size: "2xl",
          radius: "sm",
          placement: "center",
          backdrop: "blur", //opaque(黑) | blur 弹框背景
          hideCloseButton: false, ///隐藏关闭按钮
        }}
        affirm={clickOK}
        content={(onClose: any) => (
          //弹框页面
          <div className="h-[200px]">
            <p className="text-center ">内容</p>
            <p
              onClick={() => {
                onClose();
              }}
              className=" w-9/12 "
            >
              关闭弹框
            </p>
          </div>
        )}
        children={(onOpen: any) => <Button onClick={onOpen}>打开弹框</Button>}
      ></MaterialModal>
      <Table
        loading={loading} //表格加载
        className=" max-h-[750px] overflow-auto"
        rowKey="id"
        dataSource={Tabledata}
        // 表格自带分页
        onChange={(val: any) => {
          setPage({
            current: val.current,
            pageSize: val.pageSize,
          });
        }}
        pagination={{
          ...page,
          position: ["bottomCenter"],
          total: total,
          hideOnSinglePage: total < 10 ? true : false,
          showSizeChanger: true,
          simple: true,
        }}
        columns={[...payColumns]}
      />
      <Pagination toEnterpage={toEnterpage} total={total} ref={pageRef} />
    </div>
  );
}
