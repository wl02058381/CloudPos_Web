//IP為API網址
//host為API的PORT
//MainWebIP為主系統網址
//MainWebhost為主系統PORT
const config = {
    Post_IP: {
        // API_IP: "http://163.18.26.237",
        // API_IP: "https://iordering.tw:3333",
        API_IP:"",
        // API_Port:"8011", //8011是POS 9011是數位共好
        ImgURL: 'https://iordering.tw:8011/Image/',
        CustomerUrl: "https://iordering.tw"
        // API_IP: "http://122.147.47.54",
        // API_Port:"8011", //8011是POS 9011是數位共好
        // ImgURL: 'http://122.147.47.54/:8011/Image/'
    },
    SSL: {
        PrivateKey: "ssl/private.key",
        Certificate: "ssl/ca.crt",
        DOMAIN: "122.147.47.54",
        PORT: "3010",
    },
};
module.exports = config;
