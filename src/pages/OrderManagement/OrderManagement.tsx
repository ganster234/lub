import { useEffect, useState } from 'react'
import { DatePicker } from 'antd'
import { usebegin } from '@/store/contextmodel'
import { orderManagementList } from '@/api/useApi'

function OrderManagement() {
  const Logininformation = usebegin((state: any) => state.Logininformation)

  useEffect(() => {
    init()
  }, [])

  function init() {
    orderManagementList({
      Userid: Logininformation.sid, //用户sid
      Stime: '2024-01-01', //开始时间
      Etime: '2024-12-01', //结束时间
      Pagenum: '1', //页数
      Pagesize: '30' //一页多少
    }).then((res: any) => {
      console.log(res.data)
    })
  }

  return (
    <>
      <DatePicker.RangePicker />
    </>
  )
}

export default OrderManagement
