// 初始状态
export const initialState = {
  account: "", //输入框查询
  text: "Hello",
  myuserId: "我是ID",
  topup: false, //充值状态
};
//修改值函数
export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "settopup":
      return { ...state, topup: action.topup };
    case "setaccount":
      return { ...state, account: action.account };
    case "setText":
      return { ...state, text: action.payload };
    case "setmyuserId":
      return { ...state, myuserId: action.myuserId };
    case "reset":
      return initialState; // 重置状态
    default:
      throw new Error();
  }
};