import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  token: string;
  userInfo: object;
  changeToken(token: string): void;
  changeUserInfo(userInfo: object): void;
}

const useTokenStore = create(
  persist<Store>(
    (set) => ({
      token: "",
      userInfo: {},
      changeToken: (token: string) => {
        set({ token });
      },
      changeUserInfo: (userInfo: object) => {
        set({ userInfo });
      },
    }),
    { name: "token" }
  )
);

export default useTokenStore;
