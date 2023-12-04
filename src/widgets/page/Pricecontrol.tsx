import MaterialModal from '../../component/Modal'
import { Button } from "@nextui-org/react";
export default function Pricecontrol() {
  return (
    <div>
      <MaterialModal   //使用封装弹框
        content={(onClose: any) =>
          //弹框页面
          <div >
            <p className="text-center ">内容</p>
            <p onClick={(() => {
              onClose()
            })} className="h-96 w-9/12 bg-[#FAF9F9] ">
              关闭弹框
            </p>
          </div>
        }
        children={(onOpen: any) =>
          <Button onClick={onOpen} >打开弹框</Button>
        }
      ></MaterialModal>
    </div>
  )
}