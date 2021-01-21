import React, { Component } from 'react';  //React Component引入
import './StoreSet_QR.css';
import $ from 'jquery';
import { Button, Container, Row, Col, Form, Carousel, InputGroup, FormControl, ThemeProvider } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import TimePicker from 'react-times';
import Divider from '@material-ui/core/Divider';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import creatHistory from 'history/createHashHistory';
import ReactCanvasTxt from "react-canvas-txt";
import back from '../../images/back.svg';
import menu from '../../images/menu.png';
import {
    CopyToClipboard
} from 'react-copy-to-clipboard'

// pick a date util library
// import MomentUtils from '@date-io/moment';
// import DateFnsUtils from '@date-io/date-fns';
// import LuxonUtils from '@date-io/luxon';;


var fileDownload = require('js-file-download');
var QRCode = require('qrcode.react');
const Config = require("./config")
const moment = require("moment")
const Customer_URL = Config.CustomerUrl
const API_Url = Config.API_URL;


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
class StorePage extends Component {

    constructor(props) {
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this)
        this.getBase64 = this.getBase64.bind(this)
        this.GenerateIntermaQr = this.GenerateIntermaQr.bind(this)
        this.download = this.download.bind(this)
        this.backgo = this.backgo.bind(this)
        this.CopyURL = this.CopyURL.bind(this)
        this.state = {
            StoreInfo: {},
            StoreName: "",
            DinigStyle: "",
            DiningData: "",
            setSelectedDate: null,
            StoreID: "",
            TakeOut_img: null,
            Intermal_QR: null,
        };
    }

    getBase64(img, text) {//https://blog.csdn.net/onemango/article/details/92980830
        return new Promise((resolve, reject) => {
            const body = document.getElementsByTagName('body')[0];
            const canvas = document.createElement("canvas");
            let width = 64;
            let imgWidth = 48;
            var imgLeft = (width - imgWidth) / 2;
            canvas.width = width;
            canvas.height = width;
            body.appendChild(canvas)

            const cxt = canvas.getContext("2d")


            cxt.lineTo(width, width);
            // 画图
            cxt.drawImage(img, imgLeft, imgLeft, imgWidth, imgWidth);
            // 设置字体大小
            cxt.font = "30px Microsoft YaHei";
            // cxt.fontStyle = "bold";
            // 设置文本的水平垂直对齐方式
            cxt.textBaseline = 'top';
            cxt.textAlign = 'center';
            // 文字颜色
            cxt.fillStyle = "#000000";
            // 填充文字
            cxt.fillText(text, width / 2, width / 4);
            // 轉成base64
            var dataUrl = canvas.toDataURL("image/png");
            // 移除canvas節點
            body.removeChild(canvas);

            resolve(dataUrl)
        })

    }
    backgo() {
        const history = creatHistory();
        history.goBack();
    }
    componentDidMount() {
        // var url = "car.png"  //图片的路径
        var img = new Image();
        // img.src = url;
        this.getBase64(new Image(), '外帶').then(file_Img_Url => {
            this.setState({ TakeOut_img: file_Img_Url }, () => {
                console.log(file_Img_Url)
            })
        })

        toast.configure()
        document.title = "QRcode|設定"
        console.log("===== StartPage ======")
        var StoreID = sessionStorage.getItem('StoreID');
        // var StoreID = getParameterByName("s");
        this.setState({
            StoreID: StoreID
        });
    }
    handleDateChange(date) {
        date = moment(date).format("HH:mm");
        this.state.setSelectedDate = date;
        console.log(date)
    };
    CopyURL(event) {
        console.log("==== download ===")
        var QRcodeID = event.target.id.split("_")[0]
        toast.success("正在幫您下載～")
        console.log(QRcodeID)
        const canvas = $(`#${QRcodeID}`)[0].toDataURL("image/png").replace("image/png", "image/octet-stream");
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
    GenerateIntermaQr() {
        var StoreID = sessionStorage.getItem('StoreID');
        var TableTxt = $("#IntermTable_input").val()
        if (TableTxt == "" || TableTxt == null) {
            toast.error("請填寫桌號，使QR code能順利製作。")
            $("#IntermTable_input").css("color", "red")
        } else {
            console.log("Table", TableTxt)
            var file_Img_Url = this.getBase64(new Image(), TableTxt)
            var Intermal_QR =
                < div >
                    < Row>
                        <Col className="text-center">
                            <QRCode value={`${Customer_URL}/#/${StoreID}/Intermal_${TableTxt}`}
                                id="Intermal-QRcode"
                                size="100"
                                imageSettings={{
                                    src: `${file_Img_Url}`,
                                    x: null,
                                    y: null,
                                    height: 15,
                                    width: 15,
                                    excavate: true,
                                }}
                            >
                            </QRCode>
                        </Col>
                    </Row>
                    <Row >
                        <Col className="text-center">
                            <Button variant="success" onClick={this.download} id="Intermal-QRcode_btn" className="width_60"><GetAppIcon />  下載</Button>
                            <Button variant="success" onClick={this.CopyURL} id="Intermal-QRcode_btn" className="width_60"><GetAppIcon />  複製</Button>
                        </Col>
                    </Row >
                </div>
            this.setState({ "Intermal_QR": Intermal_QR })
        }
    }
    download(event) {
        console.log("==== download ===")
        var QRcodeID = event.target.id.split("_")[0]
        toast.success("正在幫您下載～")
        console.log(QRcodeID)
        const canvas = $(`#${QRcodeID}`)[0].toDataURL("image/png").replace("image/png", "image/octet-stream");
        console.log(canvas)
        let downloadLink = document.createElement("a");
        downloadLink.href = canvas;
        downloadLink.download = `${QRcodeID}-QR.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        // window.location.reload();
        // window.location.href = downloadLink;
        // document.body.removeChild(downloadLink);
        // fileDownload(canvas, `);
        // this.downloadRef.href = canvas
        // this.downloadRef.download = this.state.values.deviceId + "-QR.png";
        // print(canvas)

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

                    <Row>
                        <Col className="text-center" >
                            <QRCode value={`${Customer_URL}/#/${this.state.StoreID}/TakeOut_Phone`}
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
                            ></QRCode>

                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Button variant="success" onClick={this.download} id="TakeOut-QRcode_btn" className="width_60"><GetAppIcon />  下載</Button>
                            <Button variant="success" onClick={this.CopyURL} id="TakeOut-QRcode_btn" className="width_60"><GetAppIcon />  複製</Button>
                        </Col>

                    </Row>

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
                        <Row id="Title">

                        {this.state.Intermal_QR}

                        </Row>


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

export default withRouter(StorePage);
