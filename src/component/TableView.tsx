/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

import { message, Table, TablePaginationConfig } from "antd";
interface TableViewProps<T> {
  api?: any;
  dataList?: any;
  apiState?: any;
  xScroll?: number;
  rowKey?: keyof T;
  rowSelectionKey?: boolean;
  optionsPagintion?: boolean;
  columns: any[];
  size?: number;
  disableds?: keyof T;
  disabledValue?: any;
  heightValue?: number;
  summaryList?: (string | number)[];
  changeRow?: (selectedRowKeys: React.Key[]) => void;
  type?: "checkbox" | "radio" | boolean;
  compile?: (selectedRowKeys: React.Key[]) => void;
}
interface TableViewHandle {
  setState: React.Dispatch<React.SetStateAction<any>>;
  getList: (state: any) => void;
  queryList: (state?: any) => void;
  resetList: () => void;
  pagination: TablePaginationConfig;
  setPagination: React.Dispatch<React.SetStateAction<TablePaginationConfig>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  state: {
    total: number;
    dataList: any[];
  };
}
/**
 * 普通表格
 */
const TableView = forwardRef<TableViewHandle, TableViewProps<any>>(
  /***
   * api:获取数据API,
   * apiState:接口需要的查询条件(接口api需要参数必传,不需要非必须),
   * xScroll:X轴滚动
   * rowKey:每行的key,不传默认随机数,
   * rowSelectionKey:显示多选true:显示
   * optionsPagintion:显示分页true:显示
   * columns:表头(必须传)
   * size:每页多少条不传默认10
   * disableds：多选取值
   * disabledValue：多选判断条件
   * heightValue 表格高度，不传就默认撑满余下的空间
   * summaryList:显示总计
   */
  (
    {
      api,
      dataList,
      apiState,
      xScroll,
      rowKey,
      rowSelectionKey,
      optionsPagintion,
      columns,
      size,
      disableds,
      disabledValue,
      heightValue,
      summaryList,
      changeRow,
      type,
      compile,
    },
    ref
  ) => {
    /***
     * 将子组件的方法给父组件（函数编程写法），父组件 ref.current.方法名()调用
     * getList:重新查询table展示的数据,用于实现查询,
     * setPagination:手动修改分页,用于重置类的功能
     */
    useImperativeHandle(ref, () => ({
      setState,
      getList,
      queryList,
      resetList,
      pagination,
      setPagination,
      setLoading,
      selectedRowKeys,
      setSelectedRowKeys,
      state,
    }));
    const [messageApi, contextHolder] = message.useMessage();
    const [height, setHeight] = useState(800);
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys]: any = useState([]);
    const [state, setState]: any = useState({
      total: 0,
      dataList: [],
    });
    const [pagination, setPagination] = useState<TablePaginationConfig>({
      current: 1,
      pageSize: size ? size : 10,
    });

    const getResidueHeightByDOMRect = () => {
      const bodyHeight = document.body.offsetHeight; // 网页可见区域高 (包括边线的高)
      const tableBodyTop = document
        .getElementsByClassName("ant-table-body")[0]
        ?.getBoundingClientRect().top; // tableBody距离顶部距离
      const paginationHeight = 32 + 16 * 2; // 分页器高度(包括间距);
      const tabContentBottomPadding = 18; // tab子元素区域下padding
      const contentBottomPadding = 32; // content区域的底部padding
      const residueHeight =
        bodyHeight -
        tableBodyTop -
        paginationHeight -
        contentBottomPadding -
        tabContentBottomPadding;
      return residueHeight;
    };
    useEffect(() => {
      //高度自适应
      setHeight(getResidueHeightByDOMRect());
      window.onresize = () => {
        setHeight(getResidueHeightByDOMRect());
      };
      if (api) {
        getList(apiState);
      } else {
        setState({
          total: 1,
          dataList: [...dataList],
        });
      }
    }, [JSON.stringify(pagination), dataList]);

    const getList = async (state: any) => {
      const { current, pageSize } = pagination || {};
      setLoading(true);
      const result = await api({
        page: current,
        pageSize: pageSize,
        page_size: pageSize,
        ...state,
      });
      setLoading(false);
      handleResult(result);
    };

    const queryList = async (state?: any) => {
      const { current, pageSize }: any = pagination || {};
      if (current > 1 || pageSize !== size) {
        setPagination({
          current: 1,
          pageSize: size,
        });
      }
      setLoading(true);
      const result = await api({
        page: 1,
        pageSize: pageSize,
        PageSize: pageSize,
        ...state,
      });
      handleResult(result);
    };

    const resetList = async () => {
      setPagination({
        current: 1,
        pageSize: size,
      });
      setSelectedRowKeys([]);
      setLoading(true);
      const result = await api({
        page: 1,
        pageSize: size,
        // ...state,
      });
      handleResult(result);
    };

    const handleResult = (result: any) => {  //发送请求赋值
      const { code, data, msg } = result || {};
      const { all, list } = data || {};
      setLoading(false);
      if (code !== 0) return messageApi.error(msg);
      if (optionsPagintion) {
        setState((item: any) => ({
          ...item,
          total: all || 0,
          dataList: [...list],
        }));
      } else {
        setState((item: any) => ({ ...item, dataList: [...list] }));
      }
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: (newSelectedRowKeys: any) => {
        changeRow && changeRow(newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
        if (compile) {
          compile(newSelectedRowKeys);
        }
      },
      fixed: true,
      getCheckboxProps: (record: any) => ({
        disabled:
          disableds && disabledValue && record[disableds] !== disabledValue,
        // disabled: () => {
        //   let changeDisVal = false;
        //   if (disableds && disabledValue) {
        //     if (record[disableds] && record[disableds] === disabledValue) {
        //       changeDisVal = true;
        //     } else {
        //       return changeDisVal;
        //     }
        //   } else {
        //     return changeDisVal;
        //   }
        //   return changeDisVal;
        // },
      }),
    };

    const setCurrentPage = (pagination: any) => {
      setPagination({ ...pagination });
      if (pagination.pageSize !== pagination?.pageSize) {
        setState({
          total: 0,
          dataList: [],
        });
      }
    };

    const totalNum = (str: any) => {
      const { dataList } = state || {};
      // 计算总量总计
      const total = dataList.reduce(
        (acc: any, item: any) => Number(acc) + Number(item[str]),
        0
      );
      return total || "-";
    };
    return (
      <>
        {contextHolder}
        <Table
          rowClassName={(record, i) => (i % 2 === 1 ? "even" : "odd")} // 重点是这个api
          scroll={{
            x: xScroll,
            y: heightValue || height,
          }}
          rowKey={(record) => (rowKey ? record[rowKey] : Math.random())}
          loading={loading}
          rowSelection={
            rowSelectionKey
              ? {
                  type: type ? "radio" : "checkbox",
                  ...rowSelection,
                }
              : false
            // rowSelectionKey ? rowSelection : false
          }
          pagination={
            optionsPagintion
              ? {
                  ...pagination,
                  total: state.total,
                  hideOnSinglePage: false,
                  showSizeChanger: true,
                }
              : false
          }
          onChange={setCurrentPage}
          columns={[...columns]}
          dataSource={state.dataList}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                {summaryList &&
                  summaryList.map((item: any, index: any) => {
                    return item === "总计" || item === "-" ? (
                      <Table.Summary.Cell index={index} key={index}>
                        {item}
                      </Table.Summary.Cell>
                    ) : (
                      <Table.Summary.Cell index={index} key={index}>
                        {totalNum(item)}
                      </Table.Summary.Cell>
                    );
                  })}
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </>
    );
  }
);

TableView.displayName = "TableView";

export default TableView;
