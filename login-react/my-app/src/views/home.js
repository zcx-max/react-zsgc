import React, { Component } from 'react'
import { Table, Button, Modal, Input } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios'
import '../css/mystyle.css'



export default class home extends Component {
    state = {
        arr: [], //渲染用的数组
        id: "", //添加&修改 做判断接口的，表格有个rowKey属性，表格行 key 的取值，可以是字符串或一个函数
        name: "",
        password: "",
        visible: false, //控制弹框的

    }
    // 表格紧凑型，button按钮第一个，Modal对话框里 嵌入input, 删除修改自定义
    render() {
        let { arr, name, password } = this.state
        const columns = [
            {
                title: '用户名',
                dataIndex: 'name',
            },
            {
                title: '密码',
                dataIndex: 'password',
            },
            {
                title: '操作',
                render: (text) => <div>
                    <a
                        onClick={()=>this.changlist(text)} //必须是回调 记得带text
                    >
                        修改
                    </a>

                    <a
                        onClick={() => {
                            let { id } = text;
                            axios.get('/dellist', { params: { id } }).then(res => {
                                if (res.data.code === 1) {
                                    alert('删除成功')
                                    this.getlist()
                                } else {
                                    alert('删除失败')
                                }

                            })
                        }}
                    >
                        删除
                    </a>
                </div>

            },
           
        ];
        return (
            <div className="wrap">
                <Button type="primary" onClick={this.showModal}>添加</Button>
                <Table rowKey="id" columns={columns} dataSource={arr} size="small" />
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk} //完成
                    onCancel={this.handleCancel}//取消
                >
                    <Input placeholder="请输入用户名" value={name}  onChange={this.iptname} />
                    <Input placeholder="请输入密码" value={password} onChange={this.iptpwd} />
                </Modal>
             
            </div>

        )
    }
    componentDidMount() {
        this.getlist()
    }
    getlist() {
        axios.get('/uselist').then(res => {
            console.log(res.data)
            this.setState({
                arr: res.data
            })
        })
    }

    //点击添加打开弹框
    showModal = () => {

        this.setState({
            visible: true
        });
    };

    //点击ok完成添加
    handleOk = () => {
        let { name, password, id } = this.state;

        let url = "";

        if (id) {
            url = "/xiulist"
        } else {
            url = "/addlist"
        }

        axios({
            method:'post',
            url:url,
            data:{name,password,id}
        }).then(res=>{
            console.log(res)
            if(res.data.code === 1){
                alert(res.data.msg)
                this.getlist()
                this.reset(); //清空
            }else{
                alert(res.data.msg)
                this.getlist()
            }
        })
      
        //请求外面写的
        this.setState({
            visible: false,
            name:"",
            password:"",
            id:""
        });
    };
    //修改，切记传一个item
    changlist(item){
        this.showModal();//打开弹框
        let {name,password,id} = item; // item，item，item
        this.setState({
            name,
            password,
            id
        })
    }
    iptname =(e)=>{
        let {name} = this.state;
        this.setState({
            name:e.target.value
        })
        console.log(name,"姓名")
    }
    iptpwd =(e)=>{
        let {password} = this.state;
        this.setState({
            password:e.target.value
        })
        console.log(password,"密码")
    }

    //清空
    reset(){
        let {name,password,id} = this.state;
        this.setState({
            name:"",
            password:""
        })
    }
    //关闭弹框
    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

}
