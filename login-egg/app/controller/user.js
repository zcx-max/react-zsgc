const { Controller } = require('egg')
const jwt = require('jsonwebtoken')

class UserController extends Controller {
    //注册
    async registry() {


        let { ctx, service } = this;
        let { name, password } = ctx.request.body;
        console.log(ctx.request.body)
            //加密的密码
        let pwd = ctx.helper.hmac(password)
            // console.log(pwd, "注册的加密")

        let result = await service.user.getname(name)
        console.log(result, '打印的result')

        if (!name || !password) {
            return ctx.body = { code: 3, msg: '缺少参数' }
        }

        if (!result) {
            try {
                await service.user.adduser(name, pwd)
                ctx.body = { code: 1, msg: '注册成功' }
            } catch (error) {
                ctx.body = { code: 0, msg: error.message }
            }
        } else {
            ctx.body = { code: 2, msg: '该用户已经存在' }
        }
    }

    //登录
    async login() {
        let { ctx, service } = this;
        let { name, password } = ctx.request.body;
        console.log(ctx.request.body)
            //校验
        let err = this.app.validator.validate({ name: 'string' }, ctx.request.body)
        console.log(err)


        //加密
        let pwd = ctx.helper.hmac(password)
        console.log(pwd, "登录的加密")

        //容错处理
        if (err) {
            //判断用户是否存在
            let data = await service.user.login(name, pwd)
                //查到了，此用户存在
            if (data.length) {
                //'1705b'是密钥
                let token = jwt.sign({ name, password, roleid: data[0].roleid }, '1705b', { expiresIn: 60 * 60 })
                console.log('data[0]是-->', data[0])

                ctx.body = { code: 1, token, msg: '登录成功', rolename: data[0].rolename }
            } else {
                ctx.body = { code: 0, msg: '账号或密码错误' }
            }

        } else {
            ctx.body = { code: 3, msg: message }
        }
    }

    //删除用户
    async delete() {
        let { ctx, service } = this;
        let { id } = ctx.query;
        if (id) {
            console.log(ctx.info, '++++++')
                //'1705b'是密钥
            let token = ctx.request.header.token;
            let info = jwt.verify(token, '1705b')

            console.log(info)
                //超级管理员才可以删，它的roleid为1时
            if (ctx.info.roleid === 1) {
                try {
                    await service.user.deluser(id)
                    ctx.body = { code: 1, msg: '删除成功' }
                } catch (e) {
                    ctx.body = { code: 0, msg: e.message }
                }
            } else {
                ctx.body = { code: 2, msg: '没有权限' }
            }

        } else {
            ctx.body = { code: 3, msg: '缺少参数' }
        }

    }

    //用户列表
    //查询所有用户，分页

    async getlist() {
        let { ctx, service } = this;
        let { pagenum = 2, limit = 3 } = ctx.query;
        let startIndex = (pagenum - 1) * limit;
        try {
            let data = await service.user.findlist(startIndex, limit) //切记是起始索引和limit
            console.log(data, "分页")

            let total = await service.user.total();
            console.log(total[0]['count(*)']) //总条数，必须是total[0]['count(*)']


            ctx.body = { code: 1, data, total: total[0]['count(*)'] }
        } catch (e) {
            ctx.body = { code: 0, msg: e.message }
        }
    }


}
module.exports = UserController;