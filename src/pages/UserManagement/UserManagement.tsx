import { useEffect, useState } from 'react'
import { Table, Pagination } from 'antd'
import { usebegin } from '@/store/contextmodel'
import { userManagementList } from '@/api/useApi'

function UserManagement() {
  const Logininformation = usebegin((state: any) => state.Logininformation)

  const [data, setData] = useState<any>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(30)

  useEffect(() => {
    // 初始化数据
    init(1, pageSize)
  }, [pageSize])

  // 获取数据的方法
  function init(page: number, pageSize: number) {
    userManagementList({
      Userid: Logininformation.sid,
      Pagenum: page.toString(),
      Pagesize: pageSize.toString()
    }).then((res: any) => {
      setData(res.data) // 设置数据
      setTotal(res.pagenum) // 接口返回总数total字段
    })
  }

  // 表格列的定义
  const columns = [
    {
      title: '登录账号',
      dataIndex: 'Device_name',
      key: 'Device_name'
    },
    {
      title: '昵称',
      dataIndex: 'Device_nick',
      key: 'Device_nick'
    },
    {
      title: '联系电话',
      dataIndex: 'Device_tel',
      key: 'Device_tel'
    },
    {
      title: '状态',
      dataIndex: 'Device_state',
      key: 'Device_state'
    },
    {
      title: '账号类型',
      dataIndex: 'Device_type',
      key: 'Device_type'
    },
    {
      title: '金额',
      dataIndex: 'Device_money',
      key: 'Device_money',
      render: (text: string) => `￥${text}` // 格式化金额
    },
    {
      title: '最近在线',
      dataIndex: 'Device_time',
      key: 'Device_time'
    }
  ]

  // 分页改变页码
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page)
    setPageSize(pageSize)
    init(page, pageSize)
  }

  return (
    <>
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

export default UserManagement
