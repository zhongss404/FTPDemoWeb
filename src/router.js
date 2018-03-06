import React, {PropTypes} from 'react'
import { Router, Route, IndexRoute, Link } from 'dva/router';

export default function({ history }) {
  const routes = [
    {
      path: '/',
      getComponent (nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/user'))
        })
      }
      },
  ]

  return <Router history={history} routes={routes} />
}
