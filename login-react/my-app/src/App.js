import React, { Component } from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import route from './router/routerConfig'//配置的路径
import RouterView from './router/routerView'//封装的路由表
import './css/mystyle.css'
import 'antd/dist/antd.css'
export default class App extends Component {
    render() {
        return (
            <Router>
                <RouterView route={route}></RouterView>
            </Router>
        )
    }
}
