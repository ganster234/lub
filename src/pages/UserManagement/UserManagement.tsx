import { useEffect, useState } from 'react'
import { Table, Pagination, Button, message, Modal, Input, Form } from 'antd'
import { usebegin } from '@/store/contextmodel'
import { userManagementList, userManagementStatus, userManagementUpdate } from '@/api/useApi'

function UserManagement() {
  const Logininformation = usebegin((state: any) => state.Logininformation)

  const [data, setData] = useState<any>([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(30)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]) // 选中的行的 key
  const [isModalVisible, setIsModalVisible] = useState(false) // 控制弹窗显示
  const [currentUser, setCurrentUser] = useState<any>(null) // 当前编辑的用户

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
      title: '用户名称',
      dataIndex: 'Device_name',
      key: 'Device_name'
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
    },
    {
      title: '账号类型',
      dataIndex: 'Device_type',
      key: 'Device_type'
    },
    {
      title: '价格',
      dataIndex: 'Device_money',
      key: 'Device_money',
      render: (text: string) => `￥${text}` // 格式化金额
    },
    {
      title: '时间',
      dataIndex: 'Device_time',
      key: 'Device_time'
    },
    {
      title: '联系电话',
      dataIndex: 'Device_tel',
      key: 'Device_tel'
    },
    {
      title: '联系方式',
      dataIndex: 'Device_contact',
      key: 'Device_contact'
    },
    {
      title: '最后登录',
      dataIndex: 'Device_lasttime',
      key: 'Device_lasttime'
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <Button onClick={() => handleEdit(record)} type="link">
          编辑
        </Button>
      )
    }
  ]

  // 分页改变页码
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page)
    setPageSize(pageSize)
    init(page, pageSize)
  }

  // 批量启用/禁用
  const handleBulkAction = (action: 'enable' | 'disable') => {
    if (selectedRowKeys.length === 0) {
      message.error('请先选择要操作的用户！')
      return
    }

    userManagementStatus({
      list: selectedRowKeys.map(id => ({
        Sid: id,
        State: action === 'enable' ? '0' : '1'
      }))
    }).then((res: any) => {
      if (res.code === 200) {
        message.success('操作成功！')
        init(currentPage, pageSize)
        setSelectedRowKeys([])
      } else {
        message.error('操作失败！')
      }
    })
  }

  // 编辑按钮点击时的处理
  const handleEdit = (record: any) => {
    setCurrentUser(record) // 设置当前编辑的用户
    setIsModalVisible(true) // 显示弹窗
  }

  // 关闭弹窗
  const handleCancel = () => {
    setIsModalVisible(false)
    setCurrentUser(null) // 清空当前用户
  }

  // 提交表单
  const handleSubmit = (values: any) => {
    const { Oldpass, Pass, Username, Tel, Contact } = values
    userManagementUpdate({
      Sid: currentUser?.Device_Sid,
      Pass: Pass || '0', // 默认设置为0
      Oldpass: Oldpass || '', // 旧密码
      Username: Username || '',
      Tel: Tel || '',
      Contact: Contact || ''
    }).then((res: any) => {
      if (res.code === 200) {
        message.success('编辑成功！')
        setIsModalVisible(false)
        init(currentPage, pageSize) // 刷新数据
      } else {
        message.error('编辑失败！')
      }
    })
  }

  // 表格的 rowSelection 配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys) // 更新选中的行的key
    }
  }

  return (
    <>
      {/* 按钮区域 */}
      <div className="my-4">
        <Button type="primary" onClick={() => handleBulkAction('enable')} className="mr-4">
          批量启用
        </Button>
        <Button danger onClick={() => handleBulkAction('disable')}>
          批量禁用
        </Button>
      </div>

      {/* 表格展示 */}
      <Table
        className="my-4"
        rowKey="Device_Sid"
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection} // 设置 rowSelection
        pagination={false} // 禁用分页
        scroll={{ y: 'calc(100vh - 260px)' }}
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

      {/* 编辑弹窗 */}
      <Modal title="编辑用户" open={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          className="mt-4"
          key={currentUser?.Device_Sid} // 使用 key 强制刷新表单
          initialValues={{
            Oldpass: '',
            Pass: '',
            Username: currentUser?.Device_name || '',
            Tel: currentUser?.Device_tel || '',
            Contact: currentUser?.Device_contact || ''
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="Username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Oldpass"
            label="旧密码"
            rules={[{ required: true, message: '请输入旧密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="Pass"
            label="新密码"
            rules={[{ required: true, message: '请输入新密码!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="Contact"
            label="联系方式"
            rules={[{ required: true, message: '请输入联系方式!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Tel"
            label="电话"
            rules={[{ required: true, message: '请输入联系电话!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UserManagement
