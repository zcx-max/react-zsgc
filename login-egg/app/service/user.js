const { Service } = require('egg')

class UserService extends Service {
    //获取用户名
    async getname(name) {
            return await this.app.mysql.get('list', { name })
        }
        //添加用户
    async adduser(name, password) {
            return await this.app.mysql.insert('list', { name, password })
        }
        //获取用户,登录用的
    async login(name, password) {
            return await this.app.mysql.query('select * from list where name=? and password=?', [name, password])
        }
        //获取列表
    async getuserlist() {
            return await this.app.mysql.select('list')
        }
        //获取id
    async getid(id) {
            return await this.app.mysql.get('list', { id })
        }
        //删除
    async deluser(id) {
            return await this.app.mysql.delete('list', { uid: id })
        }
        //查询所有的做分页
    async findlist(startIndex, limit) {
            return this.app.mysql.query(`select * from list limit ${startIndex},${limit}`)
                //分页是末班字符串
        }
        //查询总条数
    async total() {
            return await this.app.mysql.query('select count(*) from list')

        }
        //练习的时候记得模糊搜索的sql语句，`select * from list where name like %{$z}%`

}

module.exports = UserService;