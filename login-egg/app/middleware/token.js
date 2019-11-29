const jwt = require('jsonwebtoken')
const whitePath = ['/zhu', '/deng']
module.exports = () => {
    return async(ctx, next) => {
        if (whitePath.includes(ctx.request.path)) {
            await next()
        } else {
            let { token } = ctx.request.header
            try {
                let info = jwt.verify(token, "1705")
                console.log(info)
                await next()
            } catch (e) {
                ctx.body = { code: 1, msg: e.message }
            }
        }
    }
}