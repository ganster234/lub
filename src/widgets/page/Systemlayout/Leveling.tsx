import { useEffect, useState } from "react";
import { OuproGet, OuProlGet } from "@/api/useApi";
import { Form, Input, Select, Button, Row, Col } from "antd";
import "./stylecss.css";

const { Option } = Select;

const App = (props: { tblType: string }) => {
  const [form] = Form.useForm();
  const selectArr = ["练等级", "打段位"]; //"打金", "抽卡", , "打道具"
  const [gameSlet, setgameSlet] = useState([]); //游戏下拉列表
  const [riseinprice, setriseinprice] = useState(0); //价格

  useEffect(() => {
    OuproGet().then((res: any) => {
      if (res.code == 200) {
        setgameSlet(res.data);
      }
    });
  }, []);
  const onFinish = (values: any) => {
    console.log("表单提交的数据:", values);
  };
  return (
    <div>
      <p>{props.tblType}</p>
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
              rules={[{ required: true, message: "请输入游戏密码" }]}
            >
              <Select size="large" placeholder="请选择上号方式">
                <Option value="扫描上号">扫描上号</Option>
                <Option value="账号上号">账号上号</Option>
                <Option value="OP上号">OP上号</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
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
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="Yzphone"
              label="验证手机"
              rules={[{ required: true, message: "请输入验证手机" }]}
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

        {/* 练级选项 */}
        <h3 className="myh4">练级选项</h3>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="Lbgamename"
              label="游戏名称"
              rules={[{ required: true, message: "请选择游戏名称" }]}
            >
              <Select size="large" placeholder="请选择游戏名称">
                {gameSlet.map((item: any, index) => (
                  <Option key={index} value={item.Device_Sid}>
                    {item.Device_Name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Lbtype"
              label="任务类型"
              rules={[{ required: true, message: "请选择任务类型" }]}
            >
              <Select
                onChange={(Type) => {
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
                }}
                size="large"
                placeholder="请选择任务类型"
              >
                {selectArr.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
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
              name="Start"
              label="开始等级"
              rules={[{ required: true, message: "请输入内容" }]}
            >
              <Input type="number" size="large" placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="End"
              label="截止等级"
              rules={[{ required: true, message: "请输入内容" }]}
            >
              <Input type="number" size="large" placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
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
        <div className=" text-[#172B53] bg-[#e7ecff]  p-[20px] ">
          预估费用：<strong className=" text-[red] ">{riseinprice}</strong>
        </div>
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
    </div>
  );
};

export default App;
