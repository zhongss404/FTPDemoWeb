import {login, userInfo, logout, getMenu} from '../services/app'
import {parse} from 'qs'
import {config} from '../utils'

export default {
  namespace: 'app',
  state: {
    login: true,
    user: {
      name: '吴彦祖',
    },
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: [],
    permissions: [],
    userPermissions: [],
  },
  subscriptions: {
    setup ({dispatch}) {
      dispatch({type: 'queryUser'})
      window.onresize = () => {
        dispatch({type: 'changeNavbar'})
      }
    },
  },
  effects: {
    *login ({
      payload,
    }, {call, put}) {
      yield put({type: 'showLoginButtonLoading'})
      const {success, userPermissions, user, message} = yield call(login, parse(payload))
      if (success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            userPermissions,
            user: {
              name: user.realname,
            },
          }
        })

        const menuRequest = {
          username: "xiaowenke",
          systemcode: config.systemCode
        }
        const menuResponse = yield call(getMenu, parse(menuRequest));
        yield put({
          type: "getMenu",
          payload: {
            permissions: menuResponse.data
          }
        })
      } else {
        message.error(message, 3);
        yield put({
          type: 'loginFail',
        })
      }
    },
    *queryUser ({
      payload,
    }, {call, put}) {
      const menuRequest = {
        username: "liming",
        systemcode: config.systemCode
      }
      const menuResponse = yield call(getMenu, parse(menuRequest));
      yield put({
        type: "getMenu",
        payload: {
          permissions: menuResponse.data
        }
      })
    },
    *logout ({
      payload,
    }, {call, put}) {
      const data = yield call(logout, parse(payload))
      if (data.success) {
        yield put({
          type: 'logoutSuccess',
        })
      }
    },
    *switchSider ({
      payload,
    }, {put}) {
      yield put({
        type: 'handleSwitchSider',
      })
    },
    *changeTheme ({
      payload,
    }, {put}) {
      yield put({
        type: 'handleChangeTheme',
      })
    },
    *changeNavbar ({
      payload,
    }, {put}) {
      if (document.body.clientWidth < 769) {
        yield put({type: 'showNavbar'})
      } else {
        yield put({type: 'hideNavbar'})
      }
    },
    *switchMenuPopver ({
      payload,
    }, {put}) {
      yield put({
        type: 'handleSwitchMenuPopver',
      })
    },
  },
  reducers: {
    getMenu (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false,
      }
    },
    logoutSuccess (state) {
      return {
        ...state,
        login: false,
      }
    },
    loginFail (state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false,
      }
    },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true,
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true,
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false,
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },
    handleNavOpenKeys (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
