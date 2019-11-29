const crypto = require('crypto')
module.exports = {
    hmac(pwd) {
        const secret = '1705b';
        const hash = crypto.createHmac('sha256', secret)
            .update(pwd) //复制过来 参数要改，不是字符串
            .digest('hex');
        return hash; //切记 要返回hash
    }
}