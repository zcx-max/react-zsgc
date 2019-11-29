const { Service } = require('egg')

class UserService extends Service {
    async list() {
        return await this.app.mysql.select('list')
    }
    async findname(name) {
        return await this.app.mysql.get('list', { name })
    }

    //注册
    async registry(name, password) {
            return await this.app.mysql.insert('list', { name, password })
        }
        //登录
    async login(name, password) {
        return await this.app.mysql.query('select * from list where name=? and password=? ', [name, password])
    }
}
module.exports = UserService;