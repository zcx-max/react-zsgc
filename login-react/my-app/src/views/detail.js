import React, { Component } from 'react'
import axios from 'axios';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class detail extends Component {
    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu
                                key="首页"
                                title={
                                    <span>
                                        <Icon type="user" />
                                       首页
              </span>
                                }
                            >
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                             <SubMenu
                                key="预定会议室"
                                title={
                                    <span>
                                        <Icon type="user" />
                                       预定会议室
              </span>
                                }
                            >
                                <Menu.Item key="1">option1</Menu.Item>
                                
                            </SubMenu>
                            <SubMenu
                                key="我的预定"
                                title={
                                    <span>
                                        <Icon type="user" />
                                       我的预定
              </span>
                                }
                            >
                                <Menu.Item key="1">option1</Menu.Item>
                                
                            </SubMenu>
                            <SubMenu
                                key="  预定审批（管理员）"
                                title={
                                    <span>
                                        <Icon type="user" />
                                       预定审批（管理员）
              </span>
                                }
                            >
                                <Menu.Item key="1">option1</Menu.Item>
                                
                            </SubMenu>
                            
                            
                           
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            Content
        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }

    componentDidMount() {
        axios.get('/list').then(res => {
            console.log(res.data.data)
        })
    }
}
