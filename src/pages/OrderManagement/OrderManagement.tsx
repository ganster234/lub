import { useEffect, useState } from 'react'
import { DatePicker, Table, Pagination } from 'antd'
import { usebegin } from '@/store/contextmodel'
import { orderManagementList } from '@/api/useApi'
import dayjs from 'dayjs'

function OrderManagement() {
  const Logininformation = usebegin((state: any) => state.Logininformation)

  // 设置默认的时间范围
  const [Stime, setStime] = useState('')
  const [Etime, setEtime] = useState('')
  const [data, setData] = useState<any>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(30)

  useEffect(() => {
    // 获取当前年份的起始日期和结束日期
    const now = dayjs()
    const currentYear = now.year()
    const startOfYear = dayjs(`${currentYear}-01-01`) // 当前年份的 1 月 1 日
    const today = now

    // 设置默认时间范围
    setStime(startOfYear.format('YYYY-MM-DD'))
    setEtime(today.format('YYYY-MM-DD'))

    // 初始化数据
    init(startOfYear.format('YYYY-MM-DD'), today.format('YYYY-MM-DD'), 1, pageSize)
  }, [pageSize])

  // 获取数据的方法
  function init(startDate: string, endDate: string, page: number, pageSize: number) {
    orderManagementList({
      Userid: Logininformation.sid,
      Stime: startDate,
      Etime: endDate,
      Pagenum: page.toString(),
      Pagesize: pageSize.toString()
    }).then((res: any) => {
      setData(res.data) // 设置数据
      setTotal(res.pagenum) // 接口返回总数total字段
    })
  }

  // 处理日期选择
  const handleDateChange = (dates: any) => {
    if (dates && dates.length === 2) {
      const [start, end] = dates
      setStime(start.format('YYYY-MM-DD'))
      setEtime(end.format('YYYY-MM-DD'))
      init(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'), currentPage, pageSize)
    } else {
      // 如果用户清空了日期选择，设置为默认的时间范围
      const now = dayjs()
      const currentYear = now.year()
      const startOfYear = dayjs(`${currentYear}-01-01`)
      const today = now

      setStime(startOfYear.format('YYYY-MM-DD'))
      setEtime(today.format('YYYY-MM-DD'))
      init(startOfYear.format('YYYY-MM-DD'), today.format('YYYY-MM-DD'), currentPage, pageSize)
    }
  }

  // 表格列的定义
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'Device_Sid',
      key: 'Device_Sid'
    },
    {
      title: '游戏区服',
      dataIndex: 'Device_server',
      key: 'Device_server'
    },
    {
      title: '标题',
      dataIndex: 'Device_title',
      key: 'Device_title'
    },
    {
      title: '价格',
      dataIndex: 'Device_money',
      key: 'Device_money'
    },
    {
      title: '时长',
      dataIndex: 'Device_time',
      key: 'Device_time'
    },
    {
      title: '昵称',
      dataIndex: 'Device_nick',
      key: 'Device_nick'
    },
    {
      title: '订单状态',
      dataIndex: 'Device_state',
      key: 'Device_state'
    }
  ]

  // 分页改变页码
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page)
    setPageSize(pageSize)
    init(Stime, Etime, page, pageSize)
  }

  return (
    <>
      {/* 日期选择器 */}
      <DatePicker.RangePicker
        onChange={handleDateChange}
        value={[Stime ? dayjs(Stime) : null, Etime ? dayjs(Etime) : null]}
        placeholder={['开始日期', '结束日期']}
      />

      {/* 表格展示 */}
      <Table
        className="my-4"
        rowKey="Device_Sid"
        columns={columns}
        dataSource={data}
        pagination={false} // 禁用分页
        scroll={{ y: 'calc(100vh - 370px)' }}
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
