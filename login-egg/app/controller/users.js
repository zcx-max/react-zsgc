const { Controller } = require('egg')
const jwt = require('jsonwebtoken')
class UserController extends Controller {

    //注册
    async zhuce() {
            let { ctx, service } = this;
            let { name, password } = ctx.request.body;
            console.log(ctx.request.body)
            let data = await service.users.findname(name)
                // console.log(data)
                // const errors = this.app.validator.validate({ name: 'string' }, ctx.request.body)
                // console.log(errors)
            if (!name || !password) {
                return ctx.body = { code: 3, msg: '缺少参数' }
            }

            if (!data) {
                let pwd = ctx.helper.hmac(password)
                try {
                    await service.users.registry(name, pwd)
                    ctx.body = { code: 1, msg: '注册成功' }

                } catch (e) {
                    ctx.body = { code: 0, msg: e.message }
                }
            } else {
                ctx.body = { code: 2, msg: '该用户已经注册' }
            }
        }
        //登录
    async denglu() {
        let { ctx, service } = this;
        let { name, password } = ctx.request.body;
        let pwd = ctx.helper.hmac(password)
        if (!name || !password) {
            return ctx.body = { code: 3, msg: '缺少参数' }
        }

        if (name && password) {
            let data = await service.users.login(name, pwd)
            if (data.length) {
                let token = jwt.sign({ name, password }, "1705", { expiresIn: 60 * 60 })
                ctx.body = { code: 1, msg: '登录成功', token }
            } else {
                ctx.body = { code: 0, msg: '登录失败' }
            }

        } else {
            ctx.body = { code: 2, msg: '缺少参数' }
        }
    }

}


module.exports = UserController;