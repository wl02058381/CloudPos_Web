//建立Express伺服器
var express = require('express');

//使用request模塊向http請求
var request = require('request');
//fs模塊用於對系統文件及目錄進行讀寫操作
var fs = require('fs');
//使用Express伺服器
var app = express();
var bodyParser = require('body-parser')
var cors = require('cors');
var jsonParser = bodyParser.json()
var cookieParser = require('cookie-parser')
const path = require('path');

var request = require('request');

// var https = require('https');
var http = require('http');

// require("dotenv").config();
// const LogingServerUrl = process.env["LogingServerUrl"];
// const privateKey = fs.readFileSync(process.env["PrivateKey"], 'utf8');
// const certificate = fs.readFileSync(process.env["Certificate"], 'utf8');
const DomainName = process.env["DOMAIN"] || "127.0.0.1";
const SSLPORT = process.env["PORT"] || "3333";

// const credentials = { key: privateKey, cert: certificate };

// const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer(app);


// httpsServer.listen(SSLPORT, function() {
//     console.log('HTTPS Server is running on: https://%s:%s', DomainName, SSLPORT);
// });

httpServer.listen(SSLPORT, function () {
    console.log('HTTPS Server is running on: http://%s:%s', DomainName, SSLPORT);
});

const get_ip = require('ipware')().get_ip; //取得header ＩＰ 套件


app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cookieParser())
//static中介軟體函數可使用(css,javascript,影像)
app.use(express.static('build'));
app.use(express.static('src/OrderPage'));


app.get('/', function (request, response) {
    response.clearCookie('token')
    console.log(`---- app.get | /----`)
    response.sendFile(path.join(__dirname, 'static/index.html'), function (err) {
        if (err) {
            response.status(500).send(err)
        }
    })

    // //第一個參數是狀態代碼，200表示一切正常，第二個參數是包含響應頭的對象
    // response.writeHeader(200, { 'Content-Type': 'text/html/js' });
    // //Sync 表示是同步方法讀取檔案
    // response.write(fs.readFileSync('dist/index.html'));

});
// app.get('/:id', function (request, response) {
//     var id = request.params.id;

//     let IP_value = get_ip(request).clientIp;
//     console.log(`---- app.get | :id ${id} | :style----`)
//     response.sendFile(path.join(__dirname, 'dist/index.html'), function (err) {
//         if (err) {
//             response.status(500).send(err)
//         }
//     })

// })

// app.get('/Stote/:id/DinigStyle/:style', function (request, response) {
//     var id = request.params.id;
//     var style = request.params.style;
//     let IP_value = get_ip(request).clientIp;
//     console.log(`---- app.get | :id ${id} | :style----`)

//     console.log(`redirect | ${value.Route}`)
//     response.sendFile(path.join(__dirname, 'dist/index.html'), function (err) {
//         if (err) {
//             response.status(500).send(err)
//         }
//     })

// })
