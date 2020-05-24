"use strict";
const express = require('express');//引入express模块
const app = express();//调用方法生成应用

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var USERS = [
    { userId: '01', userName: 'admin', password: '123456' },
    { userId: '02', userName: 'aaa', password: '456789' }
];

var PRODUCTS = [
    { proId: '01', productName: 'admin', price: '100.00' },
    { proId: '02', productName: 'aaa', price: '150.00' }
];

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});

//响应GET方法
//URL，也叫做路由
//回调函数，表示收到应答后，如何处理并应答
app.get('/hello', function (req, resp) {
    resp.send('哈哈哈');
    resp.end();
});

app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});

app.get('/products', function (req, resp) {
    resp.send(PRODUCTS);
    resp.end();
});

app.get('/users/:userId', function (req, resp) {
    console.log(req.params);
    const userId = req.params.userId;
    for (let user of USERS) {
        if (user.userId === userId) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

app.get('/products/:proId', function (req, resp) {
    console.log(req.params);
    const proId = req.params.proId;
    for (let puser of PRODUCTS) {
        if (puser.proId === proId) {
            resp.send([puser]);
            break;
        }
    }
    resp.end();
});

//添加用户
app.post('/user', function (req, resp) {
    //json
    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});

//添加产品
app.post('/product', function (req, resp) {
    //json
    PRODUCTS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});

//修改用户
app.put('/user', function (req, resp) {
    //json
    let founded = false;
    for (let user of USERS) {
        if (user.userId === req.body.userId) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});

//修改用户
app.put('/product', function (req, resp) {
    //json
    let founded = false;
    for (let puser of PRODUCTS) {
        if (puser.proId === req.body.proId) {
            puser.productName = req.body.productName;
            puser.price = req.body.price;
            founded = true;
            break;
        }
    }

    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到产品！' });
    }
    resp.end();
});

//删除用户
app.delete('/user/:userId', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of USERS) {
        if (user.userId === req.params.userId) {
            USERS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }

    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});

//删除用户
app.delete('/product/:proId', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let puser of PRODUCTS) {
        if (puser.proId === req.params.proId) {
            PRODUCTS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }

    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});

//web服务器监听8080端口
app.listen(8080, function () {
    console.log('服务器在8080端口启动');
});
