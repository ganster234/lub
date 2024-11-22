import { useEffect, useState, useRef } from "react";
import {
  OuproGet,
  OuProlGet,
  OuprowebGet,
  OuprowebAdd,
  OuProlAdd,
} from "@/api/useApi";
import { Form, Input, Select, Button, Row, Col, Radio, message } from "antd";
import { usebegin } from "@/store/contextmodel";
import Modaltow from "@/component/Modaltow";
import "./stylecss.css";

const { Option } = Select;

const App = (props: { tblType: string }) => {
  const Logininformation = usebegin((state: any) => state.Logininformation);
  const [form] = Form.useForm();
  const selectArr = ["练等级", "打段位"]; //"打金", "抽卡", , "打道具"
  const [gameSlet, setgameSlet] = useState([]); //游戏下拉列表
  const [trendingPlaces, settrendingPlaces] = useState([]); //活动链接下拉
  const [riseinprice, setriseinprice] = useState(0); //价格
  const [tasktype, settasktype] = useState(""); //选中类型后
  const [onmode, setonmode] = useState(""); //上号方式选中后
  const [gametitle, setgametitle] = useState(""); //游戏名称sid

  const modalRef = useRef<any>(null); //弹窗dom

  const [Name, setName] = useState(""); //活动名称
  const [Url, setUrl] = useState(""); //活动链接
  const [sid, setsid] = useState(""); //关联活动
  const [Riodsmle, setRiodsmle] = useState(0); //添加活动类型

  useEffect(() => {
    OuproGet().then((res: any) => {
      if (res.code == 200) {
        setgameSlet(res.data);
      }
    });
  }, []);
  const sletxuanran = (val: string) => {
    //下拉渲染
    OuprowebGet({
      Pagenum: "1",
      Pagesize: "999",
      sid: val,
    }).then((res: any) => {
      if (res.code == 200) {
        settrendingPlaces(res.data);
      }
    });
  };
  const Selecttask = (Type: string) => {
    //下拉选中类型
    settasktype(Type);
    const Lytype =
      props.tblType == "练级"
        ? "1"
        : props.tblType == "鲁币"
        ? "2"
        : props.tblType == "拉新"
        ? "3"
        : "";
    OuProlGet({
      Lytype,
      Type,
    }).then((res: any) => {
      if (res.code == 200) {
        setriseinprice(res.data[0]?.Device_Money);
      }
    });
  };
  const onFinish = (values: any) => {
    //下单
    console.log("表单提交的数据:", values);
    OuProlAdd({
      Lytype:
        props.tblType == "练级"
          ? "1"
          : props.tblType == "鲁币"
          ? "2"
          : props.tblType == "拉新"
          ? "3"
          : "",
      ...values,
    }).then((res: any) => {
      if (res.code == 200) {
        message.success("操作成功");
        form.resetFields();
      }
    });
  };
  const handleAffirm = () => {
    //添加确定按钮
    if (Url && Name && sid) {
      OuprowebAdd({
        Username: Logininformation.username,
        Usersid: Logininformation.sid,
        Url,
        Name,
        sid,
      }).then((res: any) => {
        if (res.code == 200) {
          message.success("操作成功");
          sletxuanran(gametitle);
          modalRef.current?.popupstate(false);
        }
      });
    } else {
      message.warning("请输入内容");
    }
  };
  return (
    <div>
      <Form form={form} name="order_form" onFinish={onFinish} layout="vertical">
        {/* 账号信息 */}
        <h3 className="myh4">账号信息</h3>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="Shuser"
              label="游戏账号"
              rules={[{ required: true, message: "请输入游戏账号" }]}
            >
              <Input size="large" placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Shtype"
              label="上号方式"
              rules={[{ required: true, message: "选择上号方式" }]}
            >
              <Select
                onChange={(val) => setonmode(val)}
                size="large"
                placeholder="请选择上号方式"
              >
                {["扫码上号", "账号上号", "OP上号"].map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {onmode !== "扫码上号" && (
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="Gpass"
                label="游戏密码"
                rules={[{ required: true, message: "请输入游戏密码" }]}
              >
                <Input size="large" placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Rolename"
                label="游戏角色名称"
                rules={[{ required: true, message: "请输入角色名称" }]}
              >
                <Input size="large" placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="Yzphone"
              label="验证SJ"
              rules={[{ required: true, message: "请输入验证SJ" }]}
            >
              <Input size="large" placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="Contact" label="联系方式">
              <Input size="large" placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="Qv" label="联系QQ/微信">
              <Input size="large" placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
        {props.tblType == "拉新" ? (
          <>
            <h3 className="myh4">拉新选项</h3>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="Lxurl"
                  label="分享链接"
                  rules={[{ required: true, message: "请输入内容" }]}
                >
                  <Input size="large" placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Lxnum"
                  label="拉新数量"
                  rules={[{ required: true, message: "请输入内容" }]}
                >
                  <Input type="number" size="large" placeholder="请输入" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="Lxtype"
                  label="拉新方式"
                  rules={[{ required: true, message: "请输入内容" }]}
                >
                  <Select size="large" placeholder="请选择游戏名称">
                    {["访问即可", "需要后续"].map((item: any, index) => (
                      <Option key={index} value={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <h3 className="myh4">
              {props.tblType == "鲁币" ? "领QB选项" : "练级选项"}
            </h3>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name={props.tblType == "鲁币" ? "Lbgamename" : "Gname"}
                  label="游戏名称"
                  rules={[{ required: true, message: "请选择游戏名称" }]}
                >
                  <Select
                    onChange={(val) => {
                      if (props.tblType == "鲁币") {
                        form.resetFields(["Lbhd"]);
                        const fliiter: any = gameSlet.filter((item: any) => {
                          return item.Device_Name == val;
                        });
                        sletxuanran(fliiter[0]?.Device_Sid);
                        setgametitle(val);
                      }
                    }}
                    size="large"
                    placeholder="请选择游戏名称"
                  >
                    {gameSlet.map((item: any, index) => (
                      <Option key={index} value={item.Device_Name}>
                        {item.Device_Name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={props.tblType == "鲁币" ? "Lbhd" : "Type"}
                  label={
                    props.tblType == "鲁币" ? (
                      <div>
                        活动链接
                        {props.tblType == "鲁币" && (
                          <Button
                            className=" ml-2 "
                            onClick={() => {
                              setUrl("");
                              setName("");
                              modalRef.current?.popupstate(true);
                            }}
                            size="small"
                          >
                            添加
                          </Button>
                        )}
                      </div>
                    ) : (
                      "任务类型"
                    )
                  }
                  rules={[{ required: true, message: "请选择" }]}
                >
                  <Select
                    onChange={(Type) => {
                      if (props.tblType !== "鲁币") {
                        Selecttask(Type);
                      }
                    }}
                    size="large"
                    placeholder="请选择"
                  >
                    {props.tblType == "鲁币"
                      ? trendingPlaces.map((item: any, index) => (
                          <Option key={index} value={item.Device_Sid}>
                            {item.Device_name}
                          </Option>
                        ))
                      : selectArr.map((item) => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {props.tblType !== "鲁币" && (
              <>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="Area"
                      label="游戏区服"
                      rules={[{ required: true, message: "请输入游戏区服" }]}
                    >
                      <Input size="large" placeholder="请输入" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="Areaname"
                      label="默认区服"
                      rules={[{ required: true, message: "请输入游戏区服" }]}
                    >
                      <Input size="large" placeholder="请输入" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="Startdj"
                      label="开始等级"
                      // rules={[{ required: true, message: "请输入内容" }]}
                    >
                      <Input type="number" size="large" placeholder="请输入" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="Enddj"
                      label="截止等级"
                      // rules={[{ required: true, message: "请输入内容" }]}
                    >
                      <Input type="number" size="large" placeholder="请输入" />
                    </Form.Item>
                  </Col>
                </Row>
                {tasktype == "打段位" && (
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        name="Start"
                        label="开始段位"
                        // rules={[{ required: true, message: "请输入内容" }]}
                      >
                        <Input size="large" placeholder="请输入" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="End"
                        label="截止段位"
                        // rules={[{ required: true, message: "请输入内容" }]}
                      >
                        <Input size="large" placeholder="请输入" />
                      </Form.Item>
                    </Col>
                  </Row>
                )}
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item name="Mwgrade" label="铭文等级">
                      <Input size="large" placeholder="请输入" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="Heronum" label="英雄数量">
                      <Input size="large" placeholder="请输入" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item name="Heroname" label="指定英雄">
                      <Input size="large" placeholder="请输入" />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </>
        )}
        {props.tblType !== "鲁币" && (
          <div className=" text-[#172B53] bg-[#e7ecff]  p-[20px] ">
            预估费用：
            <strong className=" text-[red] ">{riseinprice ?? "-"}</strong>
          </div>
        )}
        <Form.Item>
          <Button
            className=" bg-[#5C7FFF] w-[240px] mt-[40px] h-[46px] "
            type="primary"
            htmlType="submit"
          >
            发布订单
          </Button>
        </Form.Item>
      </Form>
      <Modaltow
        configuration={{
          isDismissable: false,
          radius: "md",
          placement: "center",
          size: "2xl",
          backdrop: "blur",
          hideCloseButton: false,
          Header: "添加活动",
          footrBut: "确认",
        }}
        affirm={handleAffirm}
        ref={modalRef}
      >
        <ul className=" ulBox ">
          <li>
            <p className="hdname">活动名称：</p>
            <Input
              allowClear
              placeholder="请输入内容"
              onChange={(val) => setName(val.target.value)}
              value={Name}
            ></Input>
          </li>
          <li>
            <p className="hdname">活动链接：</p>
            <Input
              allowClear
              placeholder="请输入内容"
              onChange={(val) => setUrl(val.target.value)}
              value={Url}
            ></Input>
          </li>
          <li>
            <p className="hdname">关联游戏：</p>
            <Select
              onChange={(val) => setsid(val)}
              className=" w-full"
              placeholder="请选择游戏名称"
            >
              {gameSlet.map((item: any, index) => (
                <Option key={index} value={item.Device_Sid}>
                  {item.Device_Name}
                </Option>
              ))}
            </Select>
          </li>
          <li>
            <p className="hdname">是否公开：</p>
            <Radio.Group
              onChange={(val: any) => {
                setRiodsmle(val.target.value);
              }}
              value={Riodsmle}
            >
              <Radio value={0}>私密</Radio>
              <Radio value={1}>公开</Radio>
            </Radio.Group>
          </li>
        </ul>
      </Modaltow>
    </div>
  );
};

export default App;
