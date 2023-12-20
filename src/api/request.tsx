export const base = import.meta.env.PROD
  ? "http://192.168.1.73/v1"
  : "http://192.168.1.73/v1";

/**
 * 请求函数
 *
 * @export
 * @template R
 * @param {("GET" | "POST" | "PUT" | "PATCH" | "DELETE")} method
 * @param {string} url
 * @param {*} [data]
 * @param {("json" | "form")} [dataType="json"] 请求体的数据类型 POST PUT PATCH
 * @param {("json" | "text" | "blob")} [returnType="json"] 返回值的数据类型
 * @return {*}
 */
import useTokenStore from "../../src/store/token";

export default function request<R>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  data?: any,
  dataType: "json" | "form" = "json",
  returnType: "json" | "text" | "blob" = "json"
) {
  let config: any = {
    method,
    headers: {
      // Authorization: "bearer " + useTokenStore.getState().token,
      Token:useTokenStore.getState().token,
    },
  };
  if (!["GET", "DELETE"].includes(method)) {
    if (dataType === "json") {
      config.body = JSON.stringify(data);
      config.headers["Content-Type"] = "application/json";
    } else {
      config.body = new FormData();
      for (let key in data) {
        config.body.append(key, data[key]);
      }
    }
  }
  return fetch(`${base}${url}`, config).then((res) => {
    if (res.status >= 200 && res.status < 400) {
      return res[returnType]();
    } else {
      return res.text().then((err) => {
        console.log(err, "err");
        if (res.status === 401) {
          //登录过期状态   清空token
          // useTokenStore.getState().changeToken("");
        }
        // toast("danger", err);
        return Promise.reject(err);
      });
    }
  }) as Promise<R>;
}
