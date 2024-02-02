import request from "./request";
interface UserInfotype {
  page: number | string;
  limit: number | string;
  account?: string;
}
const GetUserInfo = (data: UserInfotype) => {
  //请求式列
  return request("GET", `/usdt/list?account=${data.account}&status=-1&page=${data.page}&limit=${data.limit}`);
};

export { GetUserInfo };
