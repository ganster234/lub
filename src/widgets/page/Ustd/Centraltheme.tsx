import { useEffect, useState } from "react";
import { apiuserinfo, oupayweb } from "@/api/useApi";
import { Button } from "@nextui-org/react";
import { Radio } from "antd";
export default function Centraltheme() {
  // 充值中心
  const [information, setinformation] = useState<any>({}); //用户信息
  const [checkedafter, setcheckedafter] = useState<any>(null); //选中金额过后
  const [Topupamount, setTopupamount] = useState<any>(null); //选中金额过后
  const [payList, setpayList] = useState([]); //支付列表

  useEffect(() => {
    apiuserinfo().then((res: any) => {
      //用户信息
      if (res.code == 200) {
        setinformation(res.data[0]);
      }
    });
    oupayweb().then((res: any) => {
      //支付列表
      if (res.code == 200) {
        setpayList(res.data);
      }
    });
  }, []);
  return (
    <>
      <div className=" text-[22px] border-b-1 pb-3 border-[#F4F4F6]  ">
        <a href="/ustd">👈 返回充值列表</a>
      </div>
      <section>
        <ul className="my-[22px] bg-[#EFF2FF]  p-[20px]">
          <li className=" text-[#23365C] ">
            1、充值金额只能用于平台消费。冻结金额在订单结束后将原路返回至您的账户
          </li>
          <li className=" text-[red] ">2.若充值出现任何问题可联系客服处理。</li>
        </ul>
        <p className="mb-[15px] text-[20px] ">在线充值</p>
        <div className="flex text-[#172B53]">
          <p>充值账户：{information?.Device_name}</p>
          <p className=" ml-[40px] ">
            账户余额：
            <span className=" text-[red] ">{information?.Device_money}</span>
          </p>
        </div>
        <div className="my-4 flex text-[#172B53]">
          <p className="min-w-[70px]">支付方式：</p>
          <Radio.Group
            onChange={(val) => {
              console.log(
                val.target.value,
                "val.target.value",
                "1,3,5".split(",")
              );
              setcheckedafter(val.target.value);
            }}
          >
            {payList.map((item: any, index) => (
              <Radio value={item} key={index}>
                {item.Device_name}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        {checkedafter && (
          <div className={"flex flex-wrap mt-4 ml-[70px] "}>
            {checkedafter?.Device_money?.split(",")?.map(
              (el: number, index: number) => (
                <Button
                  className={
                    "rounded-[5px] relative mr-4 mt-4 w-[160px] h-[76px] p-[10px] flex flex-col bg-transparent border-2 border-[#E5E5E6] transition-all " +
                    (el == Topupamount
                      ? "border-[#695DFF]"
                      : "")
                  }
                  key={index}
                  onClick={() => {
                    setTopupamount(el);
                  }}
                >
                  <p className="text-[22px] font-bold ">{el}</p>
                </Button>
              )
            )}
          </div>
        )}
      </section>
    </>
  );
}
