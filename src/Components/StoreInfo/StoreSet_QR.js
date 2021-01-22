import React, { Component } from 'react';  //React Component引入
import './StoreSet_QR.css';
import $ from 'jquery';
import { Button, Container, Row, Col, Form, Carousel, InputGroup, FormControl } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
// import TimePicker from 'react-times';
// import { MuiPickersUtilsProvider, KeyboardTimePicker, } from '@material-ui/pickers';
import Divider from '@material-ui/core/Divider';
// import Button from '@material-ui/core/Button';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import QueueIcon from '@material-ui/icons/Queue';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
// import Text from 'react-svg-text';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import back from '../../images/back.svg';
import menu from '../../images/menu.png';
import creatHistory from 'history/createHashHistory';
import * as QRCode from 'easyqrcodejs';

// import ReactCanvasTxt from "react-canvas-txt";


// pick a date util library
// import MomentUtils from '@date-io/moment';
// import DateFnsUtils from '@date-io/date-fns';
// import LuxonUtils from '@date-io/luxon';;


var fileDownload = require('js-file-download');
// var QRCode = require('qrcode.react');
const Config = require("./config")
const moment = require("moment")
const Customer_URL = Config.CustomerUrl
const API_Url = Config.API_URL;



class StoreSet_QR extends Component {

    constructor(props) {
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this)
        this.getBase64 = this.getBase64.bind(this)
        this.GenerateIntermaQr = this.GenerateIntermaQr.bind(this)
        this.download = this.download.bind(this)
        this.CopyURL = this.CopyURL.bind(this)
        this.backgo = this.backgo.bind(this)
        this.GetShortUrlGetData = this.GetShortUrlGetData.bind(this)
        this.TackOut_QRcode = React.createRef();
        this.Intermal_QR = React.createRef();


        this.state = {
            StoreInfo: {},
            StoreName: "",
            DinigStyle: "",
            DiningData: "",
            setSelectedDate: null,
            StoreID: "",
            TakeOut_img: null,
            Intermal_QR_download: null,
            // Intermal_QR: null,
            // TackOut_QRcode: null,
            TakeOut_Url: null

        };
    }

    componentDidMount() {
        // var url = "car.png"  //图片的路径
        var img = new Image();
        // img.src = url;
        var StoreID = sessionStorage.getItem('StoreID');
        this.getBase64(new Image(), '外').then(function (file_Img_Url) {
            let TakeOut_Url = `${Customer_URL}/#/${StoreID}/TakeOut_Phone`
            console.log("TakeOut_Url", TakeOut_Url)
            this.GetShortUrlGetData(TakeOut_Url, StoreID, "TakeOut_Phone").then((val) => {

                TakeOut_Url = val.short_url
                console.log("TakeOut_Url", TakeOut_Url)

                // var TackOut_QRcode =
                // < div >
                //     < Row>
                //         <Col className="text-center">
                //             <QRCode value={TakeOut_Url}

                //                 id="TakeOut-QRcode"
                //                 size="100"
                //                 imageSettings={{
                //                     src: `${file_Img_Url}`,
                //                     x: null,
                //                     y: null,
                //                     height: 15,
                //                     width: 15,
                //                     excavate: true,
                //                 }}
                //             ></QRCode>
                //         </Col>
                //     </Row>
                // </div>

                var options = {
                    text: TakeOut_Url,
                    logo: file_Img_Url,
                    title: '外帶 QR code', // content 
                    titleFont: "bold 24px Arial", //font. default is "bold 16px Arial"
                    titleColor: "#004284", // color. default is "#000"
                    titleBackgroundColor: "#fff", // background color. default is "#fff"
                    titleHeight: 35, // height, including subTitle. default is 0
                    titleTop: 25, // draws y coordinates. default is 30
                };

                new QRCode(this.TackOut_QRcode.current, options);

                this.setState({ "TakeOut_Url": TakeOut_Url })
                // this.setState({ "TackOut_QRcode": TackOut_QRcode })

                // this.setState({ TakeOut_Url: TakeOut_Url }, () => {
                //     console.log("TakeOut_Url",val)
                // })
            })

            this.setState({ TakeOut_img: file_Img_Url }, () => {
                console.log(file_Img_Url)
            })
            toast.configure()
            document.title = "QRcode|設定"
            console.log("===== StartPage ======")
        }.bind(this))


    }

    GetShortUrlGetData(Url, StoreID, DinigStyle) {
        var myHeaders = new Headers();
        myHeaders.append("reurl-api-key", "4070ff49d794e33217533b663c974755ecd3b233909c04df8a38b58d65165567c4f5d6");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "url": Url });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return new Promise((resolve, reject) => {
            fetch("https://api.reurl.cc/shorten", requestOptions)
                .then(response => response.text())
                .then(function (result) {
                    var result = JSON.parse(result)
                    resolve(result)
                }.bind(this))
                .catch(error => console.log('error', error));
        })

    }
    getBase64(img, text) {//https://blog.csdn.net/onemango/article/details/92980830
        return new Promise((resolve, reject) => {
            const body = document.getElementsByTagName('body')[0];
            const canvas = document.createElement("canvas");
            let width = 64;
            let imgWidth = 48;
            var imgLeft = (width - imgWidth) / 2;
            canvas.width = width;
            // canvas.height = 100;
            if (text.length < 3) {
                canvas.height = 100//width;
            } else {
                canvas.height = 60//width;
            }
            body.appendChild(canvas)

            const cxt = canvas.getContext("2d")


            cxt.lineTo(width, width);
            // 画图
            cxt.drawImage(img, imgLeft, imgLeft, imgWidth, imgWidth);
            if (text.length == 1) {
                // 设置字体大小
                cxt.font = "85px Microsoft YaHei";

            } else if (text.length == 2) {
                cxt.font = "60px Microsoft YaHei";
            } else {
                cxt.font = "30px Microsoft YaHei";
            }
            cxt.fontStyle = "bold";
            // 设置文本的水平垂直对齐方式
            cxt.textBaseline = 'top';
            cxt.textAlign = 'center';
            // 文字颜色
            cxt.fillStyle = "#B53F45";
            // 填充文字
            cxt.fillText(text, width / 2, width / 4);

            // 转成base64
            var dataUrl = canvas.toDataURL("image/png");
            // 移除canvas节点
            body.removeChild(canvas);

            resolve(dataUrl)
        })
    }
    backgo() {
        const history = creatHistory();
        history.goBack();
    }

    handleDateChange(date) {
        date = moment(date).format("HH:mm");
        this.state.setSelectedDate = date;
        console.log(date)
    };

    GenerateIntermaQr() {
        var TableTxt = $("#IntermTable_input").val()
        var StoreID = sessionStorage.getItem('StoreID');
        if (TableTxt == "" || TableTxt == null) {
            toast.error("請填寫桌號，使QR code能順利製作。")
            $("#IntermTable_input").css("color", "red")
        } else {

            console.log("Table", TableTxt)
            // var file_Img_Url = this.getBase64(new Image(), TableTxt)
            this.getBase64(new Image(), TableTxt).then(function (file_Img_Url) {
                var url = `${Customer_URL}/#/${StoreID}/Intermal_${TableTxt}`
                var DinigStyle = `Intermal_${TableTxt}`
                this.GetShortUrlGetData(url, StoreID, DinigStyle).then((val) => {
                    $("#Intermal-QRcode").children().remove()
                    console.log("Intermal_QR", this.Intermal_QR)
                    console.log("file_Img_Url", file_Img_Url)

                    var Intermal_Url = val.short_url
                    console.log("TakeOut_Url", Intermal_Url)

                    var options = {
                        text: Intermal_Url,
                        logo: file_Img_Url,
                        title: `內用桌號：${TableTxt}`, // content 
                        titleFont: "bold 24px Arial", //font. default is "bold 16px Arial"
                        titleColor: "#004284", // color. default is "#000"
                        titleBackgroundColor: "#fff", // background color. default is "#fff"
                        titleHeight: 35, // height, including subTitle. default is 0
                        titleTop: 25, // draws y coordinates. default is 30
                    };

                    new QRCode(this.Intermal_QR.current, options);
                    // console.log("file_Img_Url _Intermal_QR", Intermal_QR)
                    var Intermal_QR_download = <Row >
                        <Col className="text-center">
                            <Button variant="success" onClick={this.download} id="Intermal-QRcode_btn" className="width_60"><GetAppIcon />  下載</Button>
                            <Button variant="success" onClick={this.CopyURL} id="Intermal-QRcode_btn" className="width_60"><AssignmentIcon />  複製</Button>
                        </Col>
                    </Row >
                    this.setState({ "Intermal_QR_download": Intermal_QR_download })
                })
            }.bind(this))
        }

    }

    download(event) {
        console.log("==== download ===")
        var QRcodeID = event.target.id.split("_")[0]
        toast.success("正在幫您下載～")
        console.log(QRcodeID)
        const canvas = $(`#${QRcodeID}`).children()[0].toDataURL("image/png").replace("image/png", "image/octet-stream");
        console.log(canvas)
        let downloadLink = document.createElement("a");
        downloadLink.href = canvas;
        downloadLink.download = `${QRcodeID}-QR.png`;
        document.body.appendChild(downloadLink);
        // console.log("downloadLink",downloadLink)
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // window.location.href= downloadLink;
        //document.body.removeChild(downloadLink);
        // fileDownload(canvas, `);
        // this.downloadRef.href = canvas
        // this.downloadRef.download = this.state.values.deviceId + "-QR.png";
        // print(canvas) 
    }

    CopyURL(event) {
        console.log("==== download ===")
        var QRcodeID = event.target.id.split("_")[0]
        toast.success("請至瀏覽器貼上網址～")
        console.log(QRcodeID)
        const canvas = $(`#${QRcodeID}`).children()[0].toDataURL("image/png").replace("image/png", "image/octet-stream");
        console.log(canvas)

        //複製區域
        let CopyArea = document.createElement("textarea");
        CopyArea.value = canvas;
        document.body.appendChild(CopyArea);
        CopyArea.select();

        console.log(CopyArea, canvas)
        //複製到剪貼簿
        document.execCommand("Copy");
        document.body.removeChild(CopyArea);
    }

    render() {
        // console.log(path)

        return (
            < div className="contact-section" >
                <header className="header" style={{ height: '100%' }}>
                    <div className="TopBar">
                        <button className="back_btn" onClick={this.backgo}>
                            <img style={{ height: '60%' }} src={back} alt="back" />
                        </button>
                        <noscript>
                            <div className="back">『您的瀏覽器不支援JavaScript功能，若網頁功能無法正常使用時，請開啟瀏覽器JavaScript狀態』</div>
                        </noscript>
                        <Link to="/">
                            <button className="menu_btn">
                                <img style={{ height: '48px', width: '48px' }} src={menu} alt="menu" />
                            </button>
                        </Link>
                    </div>
                    <div style={{ backgroundColor: '#333333', height: '80%' }}>
                        <div className="headerName" id="headerName">
                            店家設定
						</div>
                    </div>
                </header>
                <Container>

                    <Row className="Row_Title">
                        <Col className="col-3"> <Divider id="Hr_style" /> </Col>
                        <Col className="text-center"> <h4>外帶QR code</h4></Col>
                        <Col className="col-3"> <Divider id="Hr_style" /></Col>
                    </Row>
                    {/* <ReactCanvasTxt text="Hello World" /> */}
                    < div >
                        < Row>
                            <Col className="text-center">
                                <div id="TakeOut-QRcode" ref={this.TackOut_QRcode}></div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <Button variant="success" onClick={this.download} id="TakeOut-QRcode_btn" className="width_60"><GetAppIcon />  下載</Button>
                                <Button variant="success" onClick={this.CopyURL} id="TakeOut-QRcode_btn" className="width_60"><AssignmentIcon />  複製</Button>
                            </Col>
                        </Row>
                    </div>

                    {/* <Row>
                        <Col className="text-center" > */}

                    {/* <QRCode value={`${Customer_URL}/#/${this.state.StoreID}/TakeOut_Phone`}
                                id="TakeOut-QRcode"
                                size="100"
                                imageSettings={{
                                    src: `${this.state.TakeOut_img}`,
                                    x: null,
                                    y: null,
                                    height: 17,
                                    width: 19,
                                    excavate: true,
                                }}
                            ></QRCode> */}

                    {/* </Col>
                    </Row> */}
                    {/* <Row>
                        <Col className="text-center">
                            <Button variant="success" onClick={this.download} id="TakeOut-QRcode_btn" className="width_60"><GetAppIcon />  下載</Button>
                            <Button variant="success" onClick={this.CopyURL} id="TakeOut-QRcode_btn" className="width_60"><AssignmentIcon />  複製</Button>
                        </Col>

                    </Row> */}

                </Container>

                <Container>
                    <form noValidate autoComplete="off">
                        <Row className="Row_Title">
                            <Col className="col-3"> <Divider id="Hr_style" /> </Col>
                            <Col className="text-center"> <h4>內用QR code</h4></Col>
                            <Col className="col-3"> <Divider id="Hr_style" /></Col>
                        </Row>
                        <Row >
                            <Col className="text-center col-2">
                            </Col>
                            <Col className="text-center">
                                <InputGroup className="mb-3" id="FormControl_style" >
                                    <FormControl
                                        placeholder="桌號"
                                        id="IntermTable_input"
                                    />
                                    <InputGroup.Append>
                                        <Button variant="primary" onClick={this.GenerateIntermaQr}><EditIcon /> 生成</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                            <Col className="text-center col-2 ">
                            </Col>
                        </Row>
                        < div >
                            < Row>
                                <Col className="text-center">
                                    <div id="Intermal-QRcode" ref={this.Intermal_QR}></div>
                                </Col>
                            </Row>
                            {this.state.Intermal_QR_download}
                        </div>

                        {/* {
                            this.state.Intermal_QR
                        } */}
                        {/* <Row id="Title">

                            

                        </Row> */}


                        <Row >
                            < Col className="text-center" >
                                <Link to="/StoreSet"><Button variant="secondary" className="width_60"><StoreMallDirectoryIcon /> 店家設定</Button></Link>
                            </Col>
                        </Row>
                        <Row >
                            < Col className="text-center" >
                                <Link to="/StoreSet_img"><Button variant="secondary" type="submit" className="width_60"><CropOriginalIcon />  封面|設定</Button></Link>
                            </Col>
                        </Row>


                    </form>

                </Container>

            </div>

        )
    }

}

export default withRouter(StoreSet_QR);
