import { Tabs, Tab } from "@nextui-org/react";
import Leveling from "./Leveling";
export default function Systemlayout() {
  // 我要发单
  return (
    <div>
      <div>
        <Tabs
          classNames={{
            tabList: "w-full p-0 border-b border-divider",
            cursor: `w-full h-[2.5px] ${"bg-[#695DFF]"}`,
            tab: "h-12",
            tabContent: "group-data-[selected=true]:text-[#485658]",
          }}
          variant="underlined"
        >
          <Tab key="练级" title="练级">
            <Leveling tblType={"练级"}></Leveling>
          </Tab>
          <Tab key="鲁币" title="鲁币">
            <Leveling tblType={"鲁币"}></Leveling>
          </Tab>
          <Tab key="拉新" title="拉新">
            <Leveling tblType={"拉新"}></Leveling>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
