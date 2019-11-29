import React, { Component } from 'react'

import axios from 'axios'
import { Form, Icon, Input, Button } from 'antd';

export default class login extends Component {
  state={
    name:"",
    password:"",
    list:""
  }
    render() {
        return (
            <Form >
        <Form.Item>
         
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              onChange={this.iptChange}
            />
        </Form.Item>
        <Form.Item>
         
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              onChange={this.iptChanges}
            />
        </Form.Item>
        <Form.Item>
          
          <Button type="primary" 
                  onClick={this.btn}
          >
            login
          </Button>
         
        </Form.Item>
      </Form>
        )
    }


    btn =()=>{
      let {name,password,list} = this.state
      axios.post('/login',{name,password}).then(res=>{
            console.log(res)
            
            if(res.data.code===1){
                this.setState({
                  list:res.data,
                  name:'',
                  password:''
                })
                this.props.history.push('/detail')
              
            }else{
              console.log(res.data.msg)              
            }
        })
       
    }

      //添加 获取到输入的值 ,name
      iptChange = (e) => {
        let { name } = this.state
        this.setState({
          name: e.target.value
        })
        console.log(name)

    }

      //添加 获取到输入的值，password
      iptChanges = (e) => {
        let { password } = this.state
        this.setState({
          password: e.target.value
        })
        console.log(password)

    }

  
}
