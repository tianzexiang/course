import { Table, TableColumnProps, Button, Space } from '@arco-design/web-react'

import './App.css'
import useRecord from './useRecord'

export default function App() {
  const { items, hasNext, hasPrev, listNext, listPrev } = useRecord()
  const columns: TableColumnProps[] = [
    {
      title: '_id',
      dataIndex: '_id'
    },
    {
      title: 'content',
      dataIndex: 'content'
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt'
    }
  ]

  return (
    <div className="wrap">
      <h1>基于cursor的分页查询</h1>
      <Table data={items} columns={columns} rowKey="_id" pagination={false} />
      <div className="page">
        <Space>
          <Button
            type="primary"
            shape="round"
            disabled={!hasPrev}
            onClick={listPrev}
          >
            Prev
          </Button>
          <Button
            type="primary"
            shape="round"
            disabled={!hasNext}
            onClick={listNext}
          >
            Next
          </Button>
        </Space>
      </div>
    </div>
  )
}
