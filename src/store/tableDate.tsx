export const payColumns = [
  {
    title: "账号",
    dataIndex: "account",
  },
  {
    title: "状态",
    dataIndex: "status",
  },
  {
    title: "平台号",
    dataIndex: "price",
  },
];
export const Figuretable = [
  {
    title: "状态",
    dataIndex: "status",
    render: (record: number) => <>{record == 1 ? "处理完成" : record}</>,
  },
  {
    title: "账户",
    dataIndex: "account",
    render: (record: number) => <>{record || "-"}</>,
  },
];
export const menus_List = [
  //手机端菜单
  {
    key: "/",
    label: "USTD订单",
  },
  {
    key: "/setpassword",
    label: "封装表格试列",
  },
  // {
  //   key: "/setpassword",
  //   label: "账号绑定",
  // },
];