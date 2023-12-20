import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
const MyPagination = forwardRef((props: {total:number, toEnterpage: any }, ref) => {
  const [page, setPage] = useState(1);
  // 将子组件的函数暴露给父组件
  useImperativeHandle(ref, () => ({
    childFunction,
  }));

  const childFunction = () => {
    // 子组件的函数切换到一页
    setPage(1);
  };
  const onChange: PaginationProps["onChange"] = (pageNumber, pageSize) => {
    //点击分页调用父组件发送请求
    props.toEnterpage({ pageNumber, pageSize });
    setPage(pageNumber);
  };
  return (
    <>
      <Pagination
        size="default"
        showQuickJumper
        // pageSize={20}  //每页条数
        current={page}
        total={props.total}
        onChange={onChange}
      />
    </>
  );
});
export default MyPagination;
