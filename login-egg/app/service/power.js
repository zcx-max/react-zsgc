const { Service } = require('egg')

class PowerService extends Service {
    async menu(roleid) {
        // return await this.app.mysql.query(`select * from menulist where power like '%${roleid}%'`)

        return await this.app.mysql.select('menulist')
    }
}

module.exports = PowerService;