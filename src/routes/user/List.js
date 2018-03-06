import React, {PropTypes} from 'react'
import {Table, Modal, Button,Icon} from 'antd'
import {DropOption} from '../../components'

const confirm = Modal.confirm

function List({dataSource, pagination, onPageChange, onDeleteItem}) {

  const handleMenuClick = (record, e) =>{
   if (e.key === '2') {
      confirm({
        title: `您确定要删除用户[${record.realname}]?`,
        onOk() {
          onDeleteItem(record.id)
        }
      })
    }
  }

  function dyncObtainMenus(id){
    let menus = []
    menus.push({key: '1', name: '编辑'})
    menus.push({key: '2', name: '删除'})
    return menus
  }

  const columns = [
    {
      title: '编号',
      dataIndex: 'code',
      key: 'code',
      sorter:true,
    },{
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      sorter:true,
    }, {
      title: '姓名',
      dataIndex: 'realname',
      key: 'realname',
      sorter:true,
    },{
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter:true,
    }, {
      title: '家庭地址',
      dataIndex: 'address',
      key: 'address',
      sorter:true,
    },{
      title: '操作',
      key: 'operation',
      width: 80,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)}
                           menuOptions={dyncObtainMenus(record.id)}/>
      },
    }
  ]

  return (
    <div>
      <Table
        style={{marginBottom: 8, marginTop: 8}}
        bordered
        columns={columns}
        dataSource={dataSource}
        onChange={onPageChange}
        pagination={pagination}
      />
    </div>
  )
}

List.propTypes = {
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
