// src/components/SlideInDialog.tsx

import React, { useState, useEffect } from "react";
import "./index.css"; // 导入样式

interface SlideInDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode; // 用来接收父组件传入的内容
}

const SlideInDialog: React.FC<SlideInDialogProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  // 使用状态来控制弹窗显示与隐藏
  const [showDialog, setShowDialog] = useState<boolean>(isOpen);

  // 监听 isOpen 变化
  useEffect(() => {
    if (isOpen) {
      setShowDialog(true);
    } else {
      setTimeout(() => setShowDialog(false), 300); // 等待动画完成后隐藏
    }
  }, [isOpen]);

  return (
    <div
      className={`dialog-overlay ${showDialog ? "show" : "hide"}`}
      onClick={onClose}
    >
      <div
        className={`dialog-content ${showDialog ? "slide-in" : "slide-out"}`}
        onClick={(e) => e.stopPropagation()} // 防止点击弹窗内容关闭弹窗
      >
        {children}
      </div>
    </div>
  );
};

export default SlideInDialog;
