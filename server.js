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
var moment = require('moment');
const multer = require('multer');
var https = require('https');
// var http = require('http');
const configjs = require('./config');
const APIServer = configjs.Server.APIServer;
// require("dotenv").config();
// const LogingServerUrl = process.env["LogingServerUrl"];
var privateKey = fs.readFileSync(__dirname + configjs.Server.PrivateKey);
var certificate = fs.readFileSync(__dirname + configjs.Server.Certificate);
var certificate_1 = fs.readFileSync(__dirname + configjs.Server.Certificate_1);
var certificate_2 = fs.readFileSync(__dirname +configjs.Server.Certificate_2);//process.env["Certificate"], 'utf8');
var certificate_3 = fs.readFileSync(__dirname +configjs.Server.Certificate_3);//process.env["Certificate"], 'utf8');
const DomainName = configjs.Server.DOMAIN;
const SSLPORT = configjs.Server.PORT;
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);
// const httpServer = http.createServer(app);

https.createServer({
    key: privateKey,
    cert: certificate,
    ca: [certificate_1, certificate_2, certificate_3]
}, app).listen(SSLPORT, function() {
   console.log("Started on PORT " + SSLPORT);
});
// httpsServer.listen(SSLPORT, function() {
//     console.log('HTTPS Server is running on: https://%s:%s', DomainName, SSLPORT);
// });

// httpServer.listen(SSLPORT, function () {
//     console.log('HTTPS Server is running on: http://%s:%s', DomainName, SSLPORT);
// });
////  ＝＝＝＝＝＝＝＝＝＝＝＝＝＝ stdout => Log記錄   ＝＝＝＝＝＝＝＝＝＝＝＝＝＝ 
var fs = require('fs');
var process = require('process');
var origstdout = process.stdout.write,
    origstderr = process.stderr.write,
    outfile = `node_output_${moment().format("YYYY-MM-DD")}.log`,
    errfile = 'node_error.log';
// if (
//   })) { fs.unlink(outfile); }
fs.exists(outfile, (tf) => {
    if (tf) {
        fs.unlink(outfile, function (err) {
            if (err) {
                throw err;
            }
            console.log(`檔案:${outfile}刪除成功！`);
        });
    } else {
        console.log(tf);
    }
})
// if (fs.exists(errfile)) { fs.unlink(errfile); }

process.stdout.write = function (chunk) {

    if (typeof chunk === 'object') {
        chunk = JSON.stringify(chunk)
    }

    fs.appendFile(outfile, chunk, (err) => {
        if (err) {
            console.log(err);
        }
    });
    origstdout.apply(this, arguments);
};

process.stderr.write = function (chunk) {
    fs.appendFile(errfile, chunk.replace(/\x1b\[[0-9;]*m/g, ''));
    origstderr.apply(this, arguments);
};
////  ＝＝＝＝＝＝＝＝＝＝＝＝＝＝ stdout => Log記錄 End  ＝＝＝＝＝＝＝＝＝＝＝＝＝＝ 
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
//＝＝＝＝＝＝＝＝ 顧客點餐ＡＰＩ ＝＝＝＝＝＝＝＝＝＝＝＝＝

//點餐頁面首頁
app.post("/CustomerFirstPage", function (req, res) {
    console.log("Post | /CustomerFirstPage")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/CustomerFirstPage',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })

})

//菜單頁面
app.post("/ShowMenu", function (req, res) {
    console.log("Post | /ShowMenu")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/ShowMenu',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })

})

//上傳訂單｜點擊結帳鈕
app.post("/UploadOrder", function (req, res) {
    console.log("Post | /UploadOrder")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/UploadOrder',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})

//是否營業
app.post("/AreYouOpen", function (req, res) {
    console.log("Post | /AreYouOpen")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/AreYouOpen',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})

//＝＝＝＝＝＝＝＝ 出單系統ＡＰＩ ＝＝＝＝＝＝＝＝＝＝＝＝＝

app.post("/OrderApply", function (req, res) {
    console.log("Post | /OrderApply")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/OrderApply',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})

//取得暫存表資料
app.post("/GetTempOrder", function (req, res) {
    console.log("Post | /OrderApply")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/GetTempOrder',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})

app.post("/GetSearchTempOrder", function (req, res) {
    console.log("Post | /OrderApply")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/GetSearchTempOrder',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})


app.post("/OrderHistory", function (req, res) {
    console.log("Post | /OrderHistory")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/OrderHistory',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})

app.post("/OrderCancelHistory", function (req, res) {
    console.log("Post | /OrderCancelHistory")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/OrderCancelHistory',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})


app.post("/CancleOrder", function (req, res) {
    console.log("Post | /CancleOrder")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/CancleOrder',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})


//＝＝＝＝＝＝＝＝ 登入系統ＡＰＩ ＝＝＝＝＝＝＝＝＝＝＝＝＝

app.post("/AddAccount", function (req, res) {
    console.log("Post | /AddAccount")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/AddAccount',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})
app.post("/DelAccount", function (req, res) {
    console.log("Post | /DelAccount")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/DelAccount',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})
app.post("/UpdatePwd", function (req, res) {
    console.log("Post | /UpdatePwd")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/UpdatePwd',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})
app.post("/LoginConfirm", function (req, res) {
    console.log("Post | /LoginConfirm")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/LoginConfirm',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})


//＝＝＝＝＝＝＝＝ 菜單設定ＡＰＩ ＝＝＝＝＝＝＝＝＝＝＝＝＝

app.post("/ShowSetMenu", function (req, res) {
    console.log("Post | /ShowSetMenu")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/ShowSetMenu',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})

//食物類別
app.post("/AddFoodType", function (req, res) {
    console.log("Post | /AddFoodType")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/AddFoodType',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})
app.post("/UpdateFoodType", function (req, res) {
    console.log("Post | /UpdateFoodType")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/UpdateFoodType',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})
app.post("/DelFoodType", function (req, res) {
    console.log("Post | /DelFoodType")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/DelFoodType',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})

//選擇類別
app.post("/AddChoiceType", function (req, res) {
    console.log("Post | /AddChoiceType")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/AddChoiceType',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})
app.post("/UpdateChocieType", function (req, res) {
    console.log("Post | /UpdateChocieType")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/UpdateChocieType',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})
app.post("/DelChoiceType", function (req, res) {
    console.log("Post | /DelChoiceType")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/DelChoiceType',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})


//選擇項目
app.post("/AddChoice", function (req, res) {
    console.log("Post | /AddChoice")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/AddChoice',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})
app.post("/UpdateChocie", function (req, res) {
    console.log("Post | /UpdateChocie")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/UpdateChocie',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})


app.post("/DelChoice", function (req, res) {
    console.log("Post | /DelChoice")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/DelChoice',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})

//餐點項目
app.post("/AddFood", function (req, res) {
    console.log("Post | /AddFood")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/AddFood',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})
app.post("/UpdateFood", function (req, res) {
    console.log("Post | /UpdateFood")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/UpdateFood',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})
app.post("/UpdateFoodStatus", function (req, res) {
    console.log("Post | /UpdateFood")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/UpdateFoodStatus',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})
app.post("/DelFood", function (req, res) {
    console.log("Post | /DelFood")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/DelFood',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})

//＝＝＝＝＝＝＝＝ 店家設定ＡＰＩ ＝＝＝＝＝＝＝＝＝＝＝＝＝
app.post("/ManagerFirstPage", function (req, res) {
    console.log("Post | /ManagerFirstPage")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/ManagerFirstPage',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})

app.post("/StoreName", function (req, res) {
    console.log("Post | /ManagerFirstPage")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/StoreName',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})

app.post("/AddStoreData", function (req, res) {
    console.log("Post | /AddStoreData")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/AddStoreData',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})
app.post("/UpdateStoreData", function (req, res) {
    console.log("Post | /AddStoreData")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/UpdateStoreData',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
})

/// ========================= 圖片處理 ====================================
// 初始化設定
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 20 * 1024 * 1024, // 限制 20 MB
    },
    fileFilter(req, file, callback) { // 限制檔案格式為 image
        if (!file.mimetype.match(/^image/)) {
            callback(new Error().message = '檔案格式錯誤');
        } else {
            callback(null, true);
        }
    }

});

app.post('/CreatImage', upload.single('image'), async (req, res, next) => {
    console.log("============== 圖片新增 ==============")

    try {

        var Src_All = path.join(__dirname, `${Path_ImgFolder}`)
        console.log(fs.existsSync(Src_All), Src_All)
        if (!fs.existsSync(Src_All)) { //判斷資料夾是否存在
            console.log("創建image資料夾")
            fs.mkdirSync(Src_All)//新增資料夾
        }
        console.log('file => ', req.file); // 取得檔案
        console.log(req.headers.image_id, req.headers.store_id)
        let Extention_list = req.file.originalname.split('.')
        let Extention = Extention_list[Extention_list.length - 1]
        var DBRow = {
            "ImageData": req.file.buffer,
            "StoreID": req.headers.store_id,
            "ImageID": req.headers.image_id,
            "ImageType": req.file.mimetype,
            "ImageExtention": Extention
        }
        Image.CreatImage(DBRow, Src_All).then((val) => {
            res.json(val)
            console.log(val)
        })
    } catch (err) {
        let res_val = { "Status": "Failed", "msg": err };
        console.log(res_val)

        res.json(res_val)
    }

});
var FormData = require('form-data');
var fs = require('fs');
app.post('/ImageUpload', upload.single('image'), async (req, res, next) => {
    try {
        console.log('file => ', req.file); // 取得檔案
        // var Src_All = path.join(__dirname, `${Path_ImgFolder}`)

        console.log(req.headers.image_id, req.headers.store_id)
        // let Extention_list = req.file.originalname.split('.')
        // let Extention = Extention_list[Extention_list.length - 1]
        // var DBRow = {
        //     "ImageData": req.file.buffer,
        //     "StoreID": req.headers.store_id,
        //     "ImageID": req.headers.image_id,
        //     "ImageType": req.file.mimetype,
        //     "ImageExtention": Extention
        // }
        // try {


        //     Image.UpdateImage(DBRow, Src_All).then((val) => {
        //         res.json(val)
        //         console.log(val)
        //     })
        // } catch (err) {
        //     let res_val = { "Status": "Failed", "msg": err };
        //     console.log(res_val)

        //     res.json(res_val)
        // }
        console.log("test");
        // ------------------------------------------
        // var myHeaders = new fetch.Headers();
        var myHeaders = {
            "image_id": req.headers.image_id,
            "store_id": req.headers.store_id,
        }
        // myHeaders.append("image_id", req.headers.image_id);
        // myHeaders.append("store_id", req.headers.store_id);


        // var formdata = new FormData();
        // formdata.append("image", req.file, req.headers.image_id + ".jpg");
        var request = require('request');
        var fs = require('fs');
        // console.log(req.file.originalname);
        // console.log(fs.createReadStream('/home/user/CloudPos_Web/src/images/search.jpg'))
        var options = {
            'method': 'POST',
            'url': `${APIServer}/ImageUpload`,
            'headers':
                myHeaders
            ,
            formData: {
                'image': {
                    'value': req.file.buffer,
                    'options': {
                        'filename': req.file.originalname,
                        'contentType': null
                    }
                }
            }
        };

        request(options,function (error, response, body) {
            console.log(body);            
            if (error != null) {
                console.error('error:', error, "error End"); // Print the error if one occurred
                //res.json({ "Status": "Failed", "Err": error })
            }
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body有值:', body != null); // Print the HTML for the Google homepage.
            res.json(JSON.parse(body))
            // conso
        })
    // }
        //     if (error) { new Error(error)}
        //     else{
        //     // console.log(response.body);
        //     // console.error('error:', error, "error End"); // Print the error if one occurred
        //     // //res.json({ "Status": "Failed", "Err": error })
        //     // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //     // console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        //     res.json(JSON.parse(body))}
        // });
        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: formdata,
        //     redirect: 'follow'
        // };
        //-------
        console.log(`${APIServer}/ImageUploadServer`);
        // request.post({
        //     headers: myHeaders,
        //     url: `${APIServer}/ImageUpload`,
        //     body: formdata
        // }, function (error, response, body) {
        //     if (error != null) {
        //         console.error('error:', error, "error End"); // Print the error if one occurred
        //         //res.json({ "Status": "Failed", "Err": error })
        //     }
        //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //     console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        //     res.json(JSON.parse(body))
        //     // conso
        // })
    }
    catch (e) {
        console.log(e);
    }
});


// app.post('/ImageUpload', upload.single('image'), async (req, res, next) => {

//     try {

//         var Src_All = path.join(__dirname, `${Path_ImgFolder}`)
//         console.log(fs.existsSync(Src_All), Src_All)
//         if (!fs.existsSync(Src_All)) { //判斷資料夾是否存在
//             console.log("創建image資料夾")
//             fs.mkdirSync(Src_All)//新增資料夾
//         }
//         console.log('file => ', req.file); // 取得檔案
//         console.log(req.headers.image_id, req.headers.store_id)
//         let Extention_list = req.file.originalname.split('.')
//         let Extention = Extention_list[Extention_list.length - 1]
//         let HideStatus = req.headers.HideStatus;

//         if(HideStatus == null || HideStatus == ""){
//             HideStatus = "0"
//         }else{
//             HideStatus = "1"
//         }
//         var DBRow = {
//             "ImageData": req.file.buffer,
//             "StoreID": req.headers.store_id,
//             "ImageID": req.headers.image_id,
//             "ImageType": req.file.mimetype,
//             "ImageExtention": Extention,
//             "HideStatus":HideStatus
//         }
//         Image.ImageUpload(DBRow, Src_All).then((val) => {
//             res.json(val)
//             console.log(val)
//         })
//     } catch (err) {
//         let res_val = { "Status": "Failed", "msg": err };
//         console.log(res_val)

//         res.json(res_val)
//     }

// });


app.get('/Image/:Store_Id/:Image_Id', async (req, res, next) => {
    let ImageID = req.params.Image_Id;
    let StoreID = req.params.Store_Id;
    console.log(`=========== GET | /Image/${StoreID}/${ImageID} ================`)
    try {
        console.log(APIServer + `/Image/${StoreID}/${ImageID}`)
        request
            .get(APIServer + `/Image/${StoreID}/${ImageID}`)
            .on('response', function (response) {
                console.log(response.statusCode) // 200
                console.log(response.headers['content-type']) // 'image/png'
            })
            .pipe(res)
    } catch (error) {
        console.error('error:', error, "error End"); // Print the error if one occurred
        res.status(500)
    }
});


/// ========================= 營銷系統 =========================

app.post('/FoodStatistics', (req, res) => {
    console.log("FoodStatistics")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/FoodStatistics',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
});


app.post('/OperateData', (req, res) => {
    console.log("OperateData")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/OperateData',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
});

///短網址

app.post('/GenerateURL', (req, res) => {
    console.log("GenerateURL")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/GenerateURL',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
});

app.post('/ShortUrlGetData', (req, res) => {

    console.log("ShortUrlGetData")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/ShortUrlGetData',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
});

app.post('/FindStoreImage', (req, res) => {
    console.log("FindStoreImage")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/FindStoreImage',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
});

app.post('/FindStoreImage_All', (req, res) => {
    console.log("FindStoreImage_All")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/FindStoreImage_All',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
});

app.post('/GetStoreImgStatus', (req, res) => {
    console.log("GetStoreImgStatus")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/GetStoreImgStatus',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
});

app.post('/SetStoreImgStatus', (req, res) => {
    console.log("SetStoreImgStatus")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/SetStoreImgStatus',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })

});

app.post('/SetStoreImgStatus_All', (req, res) => {
    console.log("SetStoreImgStatus_All")
    var GetRow = req.body
    request.post({
        headers: { 'content-type': 'application/json' },
        url: APIServer + '/SetStoreImgStatus_All',
        body: JSON.stringify(GetRow)
    }, function (error, response, body) {
        if (error != null) {
            console.error('error:', error, "error End"); // Print the error if one occurred
            //res.json({ "Status": "Failed", "Err": error })
        }

        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body有值:', body != null); // Print the HTML for the Google homepage.
        res.json(JSON.parse(body))
        // conso
    })
});

