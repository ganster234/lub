import request from "./request";
interface UserInfotype {
  page: number | string;
  pageSize: number | string;
  account?: string;
}

//登录
export const Login = (data: any) => {
  return request("POST", "/UserLogin", data);
};
//注册
export const register = (data: any) => {
  return request("POST", "/Ouregister", data);
};
//验证码
export const verifyCode = () => {
  return request("POST", "/AppVerifyCode", {});
};
//金额列表
export const moneyList = (data: UserInfotype) => {
  return request(
    "GET",
    `/user/account/order_list?page=${data.page}&page_size=${data.pageSize
    }&account=${data.account ? data.account : ""}`
  );
};

// 订单管理
export const orderManagementList = (data: any) => request("POST", "/OuprooderGet", data);

// 资金管理
export const fundManagementList = (data: any) => request("POST", "/OuprooderTkGet", data);

// 用户管理
export const userManagementList = (data: any) => request("POST", "/OuUserGet", data); // list
export const userManagementStatus = (data: any) => request("POST", "/OuUserUp", data);  // update status
