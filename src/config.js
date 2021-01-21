//IP為API網址
//host為API的PORT
//MainWebIP為主系統網址
//MainWebhost為主系統PORT
const config = {
    Post_IP: {
        // API_IP: "http://163.18.26.237",
        API_IP: "https://CloudPos.54ucl.com",
        API_Port:"8011",
        ImgURL: 'https://CloudPos.54ucl.com:8011/Image/'
    },
    SSL: {
        PrivateKey: "ssl/private.key",
        Certificate: "ssl/ca.crt",
        DOMAIN: "163.18.26.237",
        PORT: "3010",
    },
};
module.exports = config;
