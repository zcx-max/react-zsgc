 'use strict';

 /**
  * @param {Egg.Application} app - egg application
  */
 module.exports = app => {
     const { router, controller } = app;
     router.get('/', controller.home.index);
     //注册
     router.post('/registry', controller.user.registry)
         //登录
     router.post('/login', controller.user.login)

     router.get('/getlist', controller.user.getlist)
         //删除
     router.get('/delete', controller.user.delete)

     //请求权限
     router.get('/api/power', controller.power.menu)

     /*---------------------------------------------*/

     router.post('/zhu', controller.users.zhuce)
     router.post('/deng', controller.users.denglu)



 };