import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function MaterialModal(props: { content: any; children: (onOpen: () => void) => React.ReactNode; }) {
  const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
  return (
    <>
      <Modal className="h-96" radius="lg" placement="center" backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalBody className="px-0 py-0 ">
            {/* 封装内容 传送*/}
            {props.content(onClose)}
          </ModalBody>
        </ModalContent>
      </Modal>
      {props.children(onOpen)}
    </>
  );
}
