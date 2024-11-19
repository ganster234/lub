import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { produce } from "immer";
const lasting = {
  //持久化
  Logininformation: "", //登录信息
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
