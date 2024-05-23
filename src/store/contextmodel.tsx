import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
const lasting = {
  //持久化
  disclosedBallot: false, //记住账户
  curtain: "", //记住账号密码
  encipherment: "", //记住密码

  Logininformation: "", //登录信息
  token: "", //登录
  Menuoption: "", //菜单选项
};
const perishability = {
  //非持久化
  strongDom: "",
};
const usebegin = create(
  devtools(
    persist(
      immer((set) => ({
        //数据持久化修改
        ...lasting,
        settoken: (val: string) =>
          set((pre: typeof lasting) => {
            pre.token = val;
          }),
        setcurtain: (val: any) =>
          set((pre: typeof lasting) => {
            pre.curtain = val;
          }),
        setencipherment: (val: any) =>
          set((pre: typeof lasting) => {
            pre.encipherment = val;
          }),
        setdisclosedBallot: (val: any) =>
          set((pre: typeof lasting) => {
            pre.disclosedBallot = val;
          }),
        setLogininformation: (val: any) =>
          set((pre: typeof lasting) => {
            pre.Logininformation = val;
          }),
      })),
      { name: "usebegin" }
    )
  )
);
const useBearStore = create((set) => ({
  //非数据持久修改
  ...perishability,
  setstrongDom: (val: any) =>
    set(
      produce((pre) => {
        pre.strongDom = val;
      })
    ),
  setMenuoption: (val: any) =>
    set(
      produce((pre) => {
        pre.Menuoption = val;
      })
    ),
}));
export { usebegin, useBearStore };
