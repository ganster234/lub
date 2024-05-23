import request from "./request";
interface UserInfotype {
  page: number | string;
  limit: number | string;
  account?: string;
}
const GetUserInfo = (data: UserInfotype) => {
  //请求式列
  return request(
    "GET",
    `/usdt/list?account=${data.account}&status=-1&page=${data.page}&limit=${data.limit}`
  );
};
export const Login = (data: any) => {
  //登录
  return request("POST", "/v1/login", data);
};
export const register = (data: any) => {
  //注册
  return request("POST", "/v1/register", data);
};

export { GetUserInfo };
