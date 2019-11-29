const { Controller } = require('egg');
const jwt = require('jsonwebtoken');

class PowerController extends Controller {
    async menu() {
        //token
        const { ctx, service } = this;
        // console.log(ctx)
        console.log(ctx.request.header.token, "***************")

        //通过请求头里存token,拿到roleid
        let token = ctx.request.header.token;
        let info = jwt.verify(token, '1705b')
        console.log(info, '???????????????')

        //查权限
        try {
            let data = await service.power.menu(info.roleid)
            console.log(data, "###############")

            ctx.body = { code: 1, data }
        } catch (e) {
            ctx.body = { code: 0, msg: e }
        }

    }
}

module.exports = PowerController;