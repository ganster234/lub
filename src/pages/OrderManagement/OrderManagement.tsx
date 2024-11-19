import { useEffect, useState } from 'react'
import { DatePicker, Table, Pagination } from 'antd'
import { usebegin } from '@/store/contextmodel'
import { orderManagementList } from '@/api/useApi'

function OrderManagement() {
  const Logininformation = usebegin((state: any) => state.Logininformation)

  const [Stime, setStime] = useState('2024-01-01')
  const [Etime, setEtime] = useState('2024-12-01')
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(30)

  useEffect(() => {
    init()
  }, [Stime, Etime, currentPage, pageSize])
  // 获取数据的方法
  function init() {
    orderManagementList({
      Userid: Logininformation.sid,
      Stime: Stime,
      Etime: Etime,
      Pagenum: currentPage.toString(),
      Pagesize: pageSize.toString()
    }).then((res: any) => {
      setData(res.data) // 设置数据
      setTotal(res.total) // 假设接口返回总数total字段
    })
  }

  // 处理日期选择
  const handleDateChange = (dates: any) => {
    if (dates && dates.length === 2) {
      // 如果用户选择了开始和结束日期，更新状态
      const [start, end] = dates
      setStime(start.format('YYYY-MM-DD'))
      setEtime(end.format('YYYY-MM-DD'))
    } else {
      // 如果用户清空了日期选择，设置为默认的时间范围
      setStime('2024-01-01')
      setEtime('2024-12-01')
    }
  }

  // 表格列的定义
  const columns = [
    {
      title: '设备ID',
      dataIndex: 'Device_Sid',
      key: 'Device_Sid'
    },
    {
      title: '设备服务器',
      dataIndex: 'Device_server',
      key: 'Device_server'
    },
    {
      title: '设备标题',
      dataIndex: 'Device_title',
      key: 'Device_title'
    },
    {
      title: '金额',
      dataIndex: 'Device_money',
      key: 'Device_money'
    },
    {
      title: '时间',
      dataIndex: 'Device_time',
      key: 'Device_time'
    },
    {
      title: '昵称',
      dataIndex: 'Device_nick',
      key: 'Device_nick'
    },
    {
      title: '状态',
      dataIndex: 'Device_state',
      key: 'Device_state'
    }
  ]
  // 分页改变页码
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  return (
    <>
      {/* 日期选择器 */}
      <DatePicker.RangePicker className="mb-4" onChange={handleDateChange} />

      {/* 表格展示 */}
      <Table
        columns={columns}
        dataSource={data}
        rowKey="Device_Sid"
        pagination={false} // 禁用分页
      />

      {/* 分页器 */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={handlePageChange}
        showSizeChanger
        showQuickJumper
      />
    </>
  )
}

export default OrderManagement
