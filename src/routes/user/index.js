import React, {PropTypes} from 'react'
import {message,Tabs,Icon,Button,Layout,Menu,Breadcrumb} from 'antd'
import {connect} from 'dva'
const { Header, Content, Footer } = Layout

import Filter from './Filter'
import List from './List'
import ImportModal from './ImportModal'

function User({location, dispatch, user, loading}) {
  const {list,pagination,modalVisible,handleOkType,searchModel,pageInfoModel} = user

  const filterProps ={
    onSearch(values){
      dispatch({
        type:'user/query',
        payload:{
          searchModel:values
        }
      })
    },
    onResetOK(){
      dispatch({
        type:'user/updateState',
        payload:{
          searchModel:null,
          pageInfoModel:null
        }
      })
    },
    handleImport(){
      dispatch({
        type:'user/updateState',
        payload:{modalVisible:true}
      })
    },
    handleExport(){
      dispatch({
        type:'user/export'
      })
    }
  }

  const listProps = {
    dataSource:list,
    pagination,
    onPageChange(pagination, filters, sorter){
      dispatch({
        type:`user/query`,
        payload:{
          pageInfoModel:{
            page: pagination.current,
            pageSize: pagination.pageSize,
            orderKey: sorter.columnKey !== undefined ? sorter.columnKey + ' ' + sorter.order.replace('end','').trim() : undefined
          }
        }
      })
    },
    onDeleteItem(id){
      dispatch({
        type:'user/delete',
        payload:{
          id:id,
          searchModel:searchModel,
          pageInfoModel:pageInfoModel
        }
      })
    }
  }

  const importModalProps = {
    visible:modalVisible,
    handleOkType,
    handleOk(){
      dispatch({
        type:'user/import'
      })
    },
    onCancel(){
      dispatch({
        type:'user/updateState',
        payload:{
          modalVisible:false,
          handleOkType:''
        }
      })
    },
    updateUploadState(){
      dispatch({
        type:'user/updateState',
        payload:{handleOkType:'upload'}
      })
    }
  }

  return (
  <Layout>
    <Header style={{ position: 'fixed', width: '100%' }}>
      <Menu theme="dark" mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}>
        <Menu.Item key="1">菜单1</Menu.Item>
        <Menu.Item key="2">菜单2</Menu.Item>
        <Menu.Item key="3">菜单3</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <div style={{ margin: '20px 0' }}></div>
      <div style={{ background: '#fff', padding: 24, minHeight: 480 }}>
        <Filter {...filterProps} />
        <List {...listProps} />
        {modalVisible ? <ImportModal {...importModalProps}/> : ''}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Designed by @zhongss404
    </Footer>
  </Layout>
  )
}

User.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({user, loading}) => ({user,loading: loading.models.user}))(User)
