const jwt = require('jsonwebtoken')
module.exports = () => {
    return async(ctx, next) => {
        let arr = ['/login', '/registry', '/getlist'];
        //切记是path
        if (arr.includes(ctx.request.path)) {
            await next();
        } else {
            let token = ctx.request.header.token;
            try {
                //把token解析出来
                let info = jwt.verify(token, '1705b')
                ctx.info = info;
                await next();
            } catch (e) {
                ctx.body = {
                    code: 0,
                    msg: 'token过期'
                }
            }
        }
    }
}