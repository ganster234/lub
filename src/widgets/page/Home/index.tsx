import Echarts from "./Echarts";
import { useEffect, useState } from "react";
import { Card, Button } from "@nextui-org/react";

import { apiuserinfo } from "@/api/useApi";
import { homeArr } from "@/store/tableDate";
import "./index.less";
import { message } from "antd";
export default function Home() {
  const setionArr = ["账户余额", "冻结金额", "已支出金额"];
  const [information, setinformation] = useState<any>({}); //用户信息
  useEffect(() => {
    apiuserinfo().then((res: any) => {
      if (res.code == 200) {
        setinformation(res.data[0]);
      }
    });
  }, []);
  const skipfun = (item: string) => {
    const url: any = item == "账户余额" ? "/ustd?type=full" : "/ustd";
    if (item == "冻结金额") {
      message.warning("暂无页面");
    } else {
      window.location = url;
    }
  };
  return (
    <>
      <nav className=" flex navbox">
        <Card className="legtBox p-[16px] w-[60%]  mr-[16px]">
          <ul className=" topbox ">
            <li className=" herdimg ">
              {information?.Device_name ? information?.Device_name[0] : "-"}
            </li>
            <li className=" text-[#23345C] userPanel ">
              <strong className=" text-[15px] ">
                你好，{information?.Device_name || "-"}
              </strong>
              <div>
                <div>
                  用户ID：
                  {information?.Device_Sid || "-"}
                </div>
                <div>联系方式：{information?.Device_contact || "-"}</div>
              </div>
            </li>
          </ul>
          <ul className=" userModule ">
            {homeArr.map((item, index) => (
              <li className=" text-[#23345C] li " key={index}>
                <div className=" flex items-center ">
                  <img src={item.imgge} alt="" />
                  <p className=" ml-[7px] ">{item.name}</p>
                </div>
                <p className=" font-black text-[17px] mt-3 text-[#3466FF]">
                  {item.num}单
                </p>
              </li>
            ))}
          </ul>
        </Card>
        <Echarts></Echarts>
      </nav>
      <section className="selectionsing flex w-full  mt-[20px]">
        {setionArr.map((item, index) => (
          <Card
            className="cardbox p-[20px] h-[260px] w-full mr-[12px]"
            key={item}
          >
            <div className="w-full h-full flex items-center justify-between ">
              <div className="h-full flex flex-col justify-between ">
                <div className=" text-[#23345C] ">
                  <p className="text-[18px]">{item}</p>
                  <h3 className=" mt-[20%]  text-[30px]  font-bold">
                    ￥{item == "账户余额" ? information?.Device_money : "0.00"}
                  </h3>
                </div>
                <Button
                  className={`w-[120px] h-[50px] text-white rounded-md ${
                    item == "账户余额"
                      ? "bg-[#5C7FFF]"
                      : item == "冻结金额"
                      ? "bg-[#8F7AFC]"
                      : "bg-[#0CDEB2]"
                  }`}
                  onClick={() => {
                    skipfun(item);
                  }}
                >
                  {item == "账户余额"
                    ? "在线充值"
                    : item == "冻结金额"
                    ? "冻结金额订单"
                    : "已消费金额"}
                </Button>
              </div>
              <img
                className=" w-[110px] h-[110px] "
                src={`/homeimg/${index}.png`}
                alt=""
              />
            </div>
          </Card>
        ))}
      </section>
    </>
  );
}
