import { useEffect, useState } from "react";
import { apiuserinfo, oupayweb, ouxdAdd } from "@/api/useApi";
import { Button } from "@nextui-org/react";
import { Radio, Input, message } from "antd";
export default function Centraltheme() {
  // 充值中心
  const [information, setinformation] = useState<any>({}); //用户信息
  const [checkedafter, setcheckedafter] = useState<any>(null); //选中支付方式过后
  const [Topupamount, setTopupamount] = useState<any>(null); //选中金额过后
  const [Code, setCode] = useState(""); //交易单号
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
  const present = () => {
    //立即提交/充值
    if (Topupamount == null || checkedafter == null) {
      return message.warning("选择支付方式后选择支付金额");
    }
    if (checkedafter?.Device_type == "usdt" && Code == "") {
      return message.warning("请输入交易单号");
    }
    // console.log("发请求", Topupamount, checkedafter);
    // console.log(information, "用户信息");
    ouxdAdd({
      Usersid: information?.Device_Sid,
      Username: information?.Device_name,
      Num: "1",
      Money: Topupamount,
      Btmoney: "显示" + Topupamount,
      Code,
      Type: checkedafter?.Device_type,
    }).then((res: any) => {
      //支付列表
      if (res.code == 200) {
        const decodedUrl = decodeURIComponent(res.orderweburl);
        window.open(decodedUrl);
        setCode("");
      }
    });
  };
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
              setTopupamount(null);
              setCode("");
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
        {checkedafter?.Device_type == "usdt" && (
          <ul>
            <li className="text-[#172B53] p-[10px]  border-1 bg-[#FDF3F5] border-[#EF2F56]">
              请在钱包内向下方收款账户打款充值的U金额，打款成功后24小时内充值成功。
              <span className=" text-[red] ">
                （ USTD汇率{information?.Device_hl}）
              </span>
            </li>
            <li className=" my-[15px] ">
              收款账户：{checkedafter?.Device_url}
            </li>
            <li className=" flex items-center">
              <p className="w-[70px]">交易号：</p>
              <Input
                value={Code}
                onChange={(val: any) => setCode(val.target.value)}
                className=" max-w-[500px] "
                placeholder="请输入交易号"
              ></Input>
            </li>
          </ul>
        )}

        {checkedafter && (
          <div className={"flex flex-wrap mt-4 "}>
            {checkedafter?.Device_money?.split(",")?.map(
              (el: number, index: number) => (
                <Button
                  className={
                    "rounded-[5px] relative mr-4 mt-4 w-[160px] h-[76px] p-[10px] flex flex-col bg-transparent border-2 border-[#E5E5E6] transition-all " +
                    (el == Topupamount
                      ? "border-[#EF2F56] bg-[#FDF3F5] border-2 text-[#EF2F56]"
                      : "")
                  }
                  key={index}
                  onClick={() => setTopupamount(el)}
                >
                  <p className="text-[22px] font-bold ">{el}</p>
                </Button>
              )
            )}
          </div>
        )}
        <Button
          className={
            "bg-[#695DFF] rounded-[5px] text-white mt-[100px] w-[375px] h-[50px]"
          }
          onClick={present}
        >
          {checkedafter?.Device_type == "usdt" ? "立即提交" : "立即充值"}
        </Button>
      </section>
    </>
  );
}
