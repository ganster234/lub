import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
interface typefrom {
  configuration: {
    isDismissable: boolean; //是否点击遮罩层关闭弹窗
    radius: "lg" | "md" | "none" | "sm"; //圆角
    placement: "auto" | "bottom" | "center" | "top"; //弹窗打开位置
    size:
      | "xs"
      | "sm"
      | "md"
      | "lg"
      | "xl"
      | "2xl"
      | "3xl"
      | "4xl"
      | "5xl"
      | "full"; //弹窗大小
    backdrop: "transparent" | "opaque" | "blur"; //遮罩背景
    hideCloseButton: boolean; //是否隐藏关闭按钮
    Header: string;
    footrBut: string;
  };
  affirm?: () => void;
  children: React.ReactNode;
}
// props是接收父组件传来的参数，或者函数方法
const Modaltow = forwardRef((props: typefrom, ref) => {
  const [particulars, setparticulars] = useState<boolean>(false); //态框状态
  //useImperativeHandle方法将子组件的函数或者数据暴露给父组件
  useImperativeHandle(ref, () => ({
    popupstate,
  }));

  const popupstate = (val: boolean) => {
    //弹窗显示与关闭(给父组件)
    if (val) {
      setparticulars(true);
    } else {
      setparticulars(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={particulars} //弹窗是否打开
        onOpenChange={() => setparticulars(false)} //关闭弹窗
        isDismissable={props.configuration.isDismissable} //是否点击遮罩层关闭弹窗
        radius={props.configuration.radius || "md"} //配置圆角
        placement={props.configuration.placement || "auto"} //弹窗打开位置
        size={props.configuration.size || "lg"} //弹窗大小
        backdrop={props.configuration.backdrop || "opaque"} //弹窗遮罩背景
        hideCloseButton={props.configuration.hideCloseButton || false} //是否隐藏关闭按钮
      >
        <ModalContent>
          {props.configuration.Header ? ( //如果有标题就显示
            <ModalHeader className="flex flex-col gap-1">
              {props.configuration.Header}
            </ModalHeader>
          ) : (
            <></>
          )}
          <ModalBody>
            {/* 传送父组件来的内容*/}
            {props.children}
          </ModalBody>
          {props.configuration.footrBut ? (
            <ModalFooter>
              <Button
                color="danger"
                size="sm"
                variant="light"
                onPress={() => popupstate(false)}
              >
                取消
              </Button>
              <Button
                color="primary"
                size="sm"
                onPress={() => {
                  if (props.affirm) {
                    props?.affirm();
                  }
                }} //确定按钮调用父组件方法
              >
                {props.configuration.footrBut}
              </Button>
            </ModalFooter>
          ) : (
            <></>
          )}
        </ModalContent>
      </Modal>
    </>
  );
});
export default Modaltow;
