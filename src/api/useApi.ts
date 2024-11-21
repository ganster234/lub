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
//用户信息
export const apiuserinfo = () => {
  return request("POST", "/Userinfo");
};
//充值方式
export const oupayweb = () => {
  return request("POST", "/Oupayweb");
};
//提交充值
export const ouxdAdd = (data: any) => {
  return request("POST", "/OuxdAdd", data);
};
// 充值记录
export const oupryGet = (data: any) => {
  return request("POST", "/OupryGet", data);
};

// U充值记录
export const oupryutGet = (data: any) => {
  return request("POST", "/OupryutGet", data);
};

// 发单列表
export const OuprowebGet = (data: any) => {
  return request("POST", "/OuprowebGet", data);
};
// 添加活动
export const OuprowebAdd = (data: any) => {
  return request("POST", "/OuprowebAdd", data);
};

// 下单
export const OuProlAdd = (data: any) => {
  return request("POST", "/OuProlAdd", data);
};
// 价格
export const OuProlGet = (data: any) => {
  return request("POST", "/OuProlGet", data);
};
// 获取游戏下拉
export const OuproGet = () => {
  return request("POST", "/OuproGet");
};



//金额列表
export const moneyList = (data: UserInfotype) => {
  return request(
    "GET",
    `/user/account/order_list?page=${data.page}&page_size=${
      data.pageSize
    }&account=${data.account ? data.account : ""}`
  );
};

// 订单管理
export const orderManagementList = (data: any) =>
  request("POST", "/OuprooderGet", data);

// 资金管理
export const fundManagementList = (data: any) =>
  request("POST", "/OuprooderTkGet", data);

// 用户管理
export const userManagementList = (data: any) =>
  request("POST", "/OuUserGet", data); // list
export const userManagementStatus = (data: any) =>
  request("POST", "/OuUserUp", data); // update status
export const userManagementUpdate = (data: any) =>
  request("POST", "/UserUp", data); // update info
