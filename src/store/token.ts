import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  token: string;
  changeToken(token: string): void;
}

const useTokenStore = create(
  persist<Store>(
    (set) => ({
      token: "",
      changeToken: (token: string) => {
        set({ token });
      },
    }),
    { name: "token" }
  )
);

export default useTokenStore;
