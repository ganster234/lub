import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function MaterialModal(props: {
  configuration: any;
  content: any;
  affirm: any;
  children: (onOpen: () => void) => React.ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <Modal
        radius={props.configuration.radius ? props.configuration.radius : "md"}
        placement={
          props.configuration.placement
            ? props.configuration.placement
            : "center"
        }
        size={props.configuration.size ? props.configuration.size : "lg"}
        backdrop={
          props.configuration.backdrop ? props.configuration.backdrop : "opaque"
        }
        isOpen={isOpen}
        hideCloseButton={
          props.configuration.hideCloseButton
            ? props.configuration.hideCloseButton
            : false
        } //是否隐藏关闭按钮
        onOpenChange={onOpenChange}
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
            {/* 封装内容 传送*/}
            {props.content(onClose)}
          </ModalBody>
          {props.configuration.footrBut ? (
            <ModalFooter>
              <Button
                color="danger"
                size="sm"
                variant="light"
                onPress={onClose}
              >
                取消
              </Button>
              <Button
                color="primary"
                size="sm"
                onPress={() => {
                  props?.affirm(onClose); //调用父组件方法
                }}
              >
                {props.configuration.footrBut}
              </Button>
            </ModalFooter>
          ) : (
            <></>
          )}
        </ModalContent>
      </Modal>
      {props.children(onOpen)}
    </>
  );
}
