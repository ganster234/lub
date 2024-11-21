import dayjs from "dayjs";
// 初始状态
export const initialState = {
  account: "", //输入框查询
  text: "Hello",
  dashtype: "充值记录", //状态切换
  topup: false, //充值状态
  Stime: dayjs(),
  Etime: dayjs(),
};
//修改值函数
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "setEtime":
      return { ...state, Etime: action.Etime };
    case "setStime":
      return { ...state, Stime: action.Stime };
    case "settopup":
      return { ...state, topup: action.topup };
    case "setaccount":
      return { ...state, account: action.account };
    case "setText":
      return { ...state, text: action.payload };
    case "setdashtype":
      return { ...state, dashtype: action.dashtype };
    case "reset":
      return initialState; // 重置状态
    default:
      throw new Error();
  }
};
