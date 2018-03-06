import {query,remove,importUser,exportUser} from '../services/user'
import {message} from 'antd'
import {baseURL} from '../utils/config'
import {parse} from 'qs'

export default {
  namespace: 'user',
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条记录`,
      current: 1,
      total: 0,
      pageSize: 10,
    },
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    searchModel: {},  //搜索条件封装的对象
    pageInfoModel:{},  //分页信息封装的对象
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/') {
          dispatch({
            type:'query'
          })
        }
      })
    },
  },

  effects: {
    * query({payload = {}}, {call, put}) {
      const data = yield call(query,payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            list: data.data,
            searchModel:payload.searchModel === undefined ? null : payload.searchModel,
            pageInfoModel:payload.pageInfoModel === undefined ? null : payload.pageInfoModel,
          }
        })
      }
    },
    *'delete'({payload = {}}, {call, put}) {
      yield call(remove,payload.id)
      yield put({
        type:'query',
        payload:{
          searchModel:payload.searchModel,
          pageInfoModel:payload.pageInfoModel
        }})
    },
    * 'import'({payload},{call,put}){
      const data = yield call(importUser)
      yield put({type:'updateState',payload:{modalVisible:false,handleOkType:''}})
      yield put({type:'query'})
      console.log(data.message)
      if(data.message){
        window.location.href = `${baseURL}/api/gateway/download_report?uuid=${data.message}`
      }else{
        message.success('导入成功',3)
      }
    },
    * 'export'({payload},{call,put}){
      yield call(exportUser)
      window.location.href = `${baseURL}/api/user/export`
    }
  },

  reducers: {
    updateState(state, {payload}) {
      return {...state, ...payload}
    },
    showModal (state, action) {
      return {...state, ...action.payload, modalVisible: true}
    },
    hideModal (state,action) {
      return {...state,...action.payload,modalVisible: false}
    },
  },
}
